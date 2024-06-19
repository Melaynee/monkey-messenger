import { NextResponse } from "next/server";
import getUsers from "@/actions/getUsers";

export async function GET() {
  try {
    const users = await getUsers();

    return NextResponse.json(users);
  } catch (error) {
    console.log("ERR_GET_USERS", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
