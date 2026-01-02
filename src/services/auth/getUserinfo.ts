/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getCookie } from "@/lib/tokenHandler";
import { UserInfo } from "@/types";
import { JwtPayload, verify } from "jsonwebtoken";

export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const accessToken = await getCookie("accessToken");

    if (!accessToken) {
      return null;
    }

    const verifiedToken = verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET as string
    ) as JwtPayload;

    if (!verifiedToken) {
      return null;
    }

    const userInfo: UserInfo = {
      id: verifiedToken.id,
      name: verifiedToken.name || "Unknown User",
      email: verifiedToken.email,
      role: verifiedToken.role,
    };

    return userInfo;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};
