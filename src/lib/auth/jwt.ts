import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development_only';
const encodedSecret = new TextEncoder().encode(JWT_SECRET);

export interface TokenPayload {
  sub: string; // User ID
  email: string;
  name: string;
  [key: string]: any;
}

/**
 * Generates an Access Token with a short expiration.
 */
export async function generateAccessToken(payload: TokenPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m') // 15 minutes
    .sign(encodedSecret);
}

/**
 * Verifies and decodes a JWT token.
 * Throws an error if invalid or expired.
 */
export async function verifyToken(token: string): Promise<TokenPayload> {
  const { payload } = await jwtVerify(token, encodedSecret);
  return payload as unknown as TokenPayload;
}
