import { prisma } from "@/lib/prisma";
import type { CreateRefreshTokenPayloadType } from "@/types/auth.type";



export async function getRefreshToken(id: string) {
  return prisma.refreshToken.findUnique({
    where: {
      id,
    },
  });
}


export async function deleteRefreshToken(id: string) {
    return await prisma.refreshToken.deleteMany({ where: { id } });
}

export async function createRefreshToken(payload: CreateRefreshTokenPayloadType) {
    return await prisma.refreshToken.create({
        data: payload,
    });
}

export async function getAllRefreshTokens(userId: string) {
    return await prisma.refreshToken.findMany({ where: { userId } });
}

export async function deleteAllRefreshTokens( userId: string) {
    return await prisma.refreshToken.deleteMany({ where: { userId } });
}