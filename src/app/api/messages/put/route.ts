import { NextResponse } from "next/server";

export async function PUT(request: Request, params: any) {
  try {
    console.log(request.body);
    return NextResponse.json("dada");
  } catch (error) {
    console.log("UPDATE_MESSAGE_ERR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
