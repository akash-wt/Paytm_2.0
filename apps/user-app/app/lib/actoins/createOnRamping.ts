"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRamTrnx(amount: number, provider: string) {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;
  const token = Math.random().toString();
  if (!userId) {
    return {
      msg: " user not logged in!",
    };
  } else {
    await prisma.onRampTransaction.create({
      data: {
        amount: amount,
        provider,
        userId: Number(userId),
        status: "Processing",
        token: token,
        startTime: new Date(), 
      },
    });
    return {
        msg: " no ramp trnx done."
    }
  }
}
