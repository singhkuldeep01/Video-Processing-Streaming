import jwt, { type SignOptions, type JwtPayload } from "jsonwebtoken";

export function generateToken(
  payload: object,
  secret: string,
  expiresIn: SignOptions["expiresIn"]
): string {
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyToken(
  token: string,
  secret: string
): JwtPayload | string {
  return jwt.verify(token, secret);
}