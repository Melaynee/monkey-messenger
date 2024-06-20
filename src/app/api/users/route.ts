import { NextResponse } from "next/server";
import getUsers from "@/actions/getUsers";

export async function GET() {
  const users = await getUsers();

  return NextResponse.json(users);
}
