import { searchUserByUserName, searchUserByEmail, createUser, searchUserByUserId } from "@/repository/user.repository";
import { SigninRequestType, SignupRequestType } from "@/types/auth.type";
import crypto from "crypto";
import { hashPassword, verifyPassword } from "@/utils/password.util";
import { generateToken , verifyToken} from "@/utils/jwt.util";
import { createRefreshToken, getRefreshToken, deleteRefreshToken, deleteAllRefreshTokens } from "@/repository/refreshtoken.repository";
import { prisma } from "@/lib/prisma";
import type { CreateRefreshTokenPayloadType } from "@/types/auth.type";
import { Prisma } from "@prisma/client";

export async function signupService({ username, email, password }: SignupRequestType) {
    try {
        // Check if username exists
        const isUserNameExist = await searchUserByUserName(username);
        if (isUserNameExist) {
            throw new Error("Username already exists");
        }

        // Check if email exists
        const isEmailExist = await searchUserByEmail(email);
        if (isEmailExist) {
            throw new Error("Email already exists");
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create user
        const user = await createUser({
            username,
            email,
            hashedPassword
        });

        return { success: true, message: "User created successfully" };
    } catch (error: any) {
        throw new Error(error.message || "Error while signing up");
    }
}

export async function signinService({ email, password, deviceInfo, ipAddress }: SigninRequestType) {
    try {
        const user = await searchUserByEmail(email);
        if (!user) {
            return { success: false, message: "Invalid credentials" };
        }

        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            return { success: false, message: "Invalid credentials" };
        }

        const accessToken = generateToken(
            {
                userId: user.id,
                email: user.email,
            },
            process.env.JWT_ACCESS_SECRET!,
            "15m"
        );

        const jti = crypto.randomUUID();

        const refreshToken = generateToken(
            {
                userId: user.id,
                jti,
            },
            process.env.JWT_REFRESH_SECRET!,
            "7d"
        );

        const payload: CreateRefreshTokenPayloadType = {
            id: jti,
            userId: user.id,
            deviceInfo,
            ipAddress,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        };
        await createRefreshToken(payload);

        return {
            success: true,
            message: "Login successful",
            accessToken,    
            refreshToken,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        };
    } catch (error: any) {
        throw new Error(error.message || "Error while signing in");
    }
}

interface RefreshTokenPayload {
  userId: string;
  jti: string;
}

export async function refreshService({ refreshToken, deviceInfo , ipAddress}: { refreshToken: string; deviceInfo?: string; ipAddress?: string;}) {
  // 1. Verify JWT signature
  const payload = verifyToken(refreshToken,process.env.JWT_REFRESH_SECRET!) as RefreshTokenPayload;

  // 2. Check if session exists
  const session = await getRefreshToken(payload.jti);

  if (!session) {
    throw new Error("Invalid refresh token");
  }


  // 3. Check expiry
  if (session.expiresAt < new Date()) {
    throw new Error("Refresh token expired");
  }

  // 4. Get user
  const user = await searchUserByUserId(payload.userId);

  if (!user) {
    throw new Error("User not found");
  }

  // 5. Generate new access token
  const accessToken = generateToken(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_ACCESS_SECRET!,
    "15m"
  );

  // 6. Rotating Access Token (in a transaction)
  const jti = crypto.randomUUID();

  const newRefreshToken = generateToken(
      {
          userId: user.id,
          jti,
      },
      process.env.JWT_REFRESH_SECRET!,
      "7d"
  );

  const newRefreshTokenPayload: CreateRefreshTokenPayloadType = {
      id: jti,
      userId: user.id,
      deviceInfo,
      ipAddress,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };

  await prisma.$transaction(async (tx : Prisma.TransactionClient) => {
      await deleteRefreshToken(payload.jti, tx);
      await createRefreshToken(newRefreshTokenPayload, tx);
  });

  return {
    accessToken,
    newRefreshToken,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  };
}

export async function logoutService(refreshToken: string) {
  const payload = verifyToken(refreshToken,process.env.JWT_REFRESH_SECRET!) as RefreshTokenPayload;
    await deleteRefreshToken(payload.jti);
  
}

export async function logoutAllService(refreshToken: string) {
  const payload = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET!) as RefreshTokenPayload;
  await deleteAllRefreshTokens(payload.userId);
}
