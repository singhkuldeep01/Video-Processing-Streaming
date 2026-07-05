import { prisma } from "@/lib/prisma";
import { CreateUser } from "@/types/user.type";

export async function createUser ({username , email , hashedPassword} : CreateUser){
    return prisma.user.create({
        data:{
            username,
            email,
            password: hashedPassword
        }
    })
}

export async function searchUserByUserId(userId : string){
    return prisma.user.findUnique({
    where: {
      id: userId
    },
  });
}
export async function searchUserByUserName(username : string){
    return prisma.user.findUnique({
    where: {
        username : username
    },
  });
}
export async function searchUserByEmail(email : string){
    return prisma.user.findUnique({
    where: {
        email : email
    },
  });
}