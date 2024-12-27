"use server"
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const fetchUsers = async () => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      throw new Error("No Clerk user found. User must be signed in.");
    }

    let mongoUser = await prisma.user.findUnique({
      where: {
        clerkUserId: clerkUser.id,
      },
    });

    if (!mongoUser) {
      let username = clerkUser?.username || `${clerkUser?.firstName || ""} ${clerkUser?.lastName || ""}`.trim();
      if (!username) {
        username = "Unknown User";
      }

      const email = clerkUser?.emailAddresses?.[0]?.emailAddress;
      if (!email) {
        throw new Error("Email address is missing for the Clerk user.");
      }

      const newUser: any = {
        clerkUserId: clerkUser.id,
        username,
        email,
        profilePic: clerkUser?.imageUrl,
      };

      mongoUser = await prisma.user.create({
        data: newUser,
      });
    }

    if (!mongoUser.id) {
      throw new Error("MongoDB user creation failed.");
    }

    const quizResults = await prisma.quizResult.findMany({
      where: {
        userId: mongoUser.id,
      },
    });

    return {
      data: {
        user: mongoUser,
        quizResults,
      },
    };
  } catch (error: any) {
    console.error("Error in fetchUsers function:", error);
    return { error: error.message || "An unexpected error occurred." };
  }
};
