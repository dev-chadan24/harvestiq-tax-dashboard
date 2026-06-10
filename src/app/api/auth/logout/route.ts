import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get('harvestiq_refresh_token')?.value;

    if (refreshToken) {
      // Invalidate session in DB
      await prisma.session.deleteMany({
        where: { refreshToken },
      });
    }

    const response = NextResponse.json({ message: 'Logged out successfully' });

    // Clear cookies
    response.cookies.delete('harvestiq_access_token');
    response.cookies.delete({
      name: 'harvestiq_refresh_token',
      path: '/api/auth/refresh',
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
