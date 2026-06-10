import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateAccessToken } from '@/lib/auth/jwt';
import crypto from 'crypto';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get('harvestiq_refresh_token')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'No refresh token provided' },
        { status: 401 }
      );
    }

    const session = await prisma.session.findUnique({
      where: { refreshToken },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      // If expired, delete it
      if (session) {
        await prisma.session.delete({ where: { id: session.id } });
      }
      return NextResponse.json(
        { error: 'Invalid or expired refresh token' },
        { status: 401 }
      );
    }

    // Generate new Access Token
    const newAccessToken = await generateAccessToken({
      sub: session.user.id,
      email: session.user.email,
      name: session.user.name,
    });

    // Rotate Refresh Token
    const newRefreshToken = crypto.randomBytes(40).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.session.update({
      where: { id: session.id },
      data: {
        refreshToken: newRefreshToken,
        expiresAt,
        deviceInfo: request.headers.get('user-agent') || session.deviceInfo,
      },
    });

    const response = NextResponse.json({ message: 'Token refreshed' });

    response.cookies.set({
      name: 'harvestiq_access_token',
      value: newAccessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60,
    });

    response.cookies.set({
      name: 'harvestiq_refresh_token',
      value: newRefreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/api/auth/refresh',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Refresh error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
