import { connectToDb } from "@utils/database";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { client } = await connectToDb();

  const files = await client.db().collection("images.files").find().toArray();
  if (!files.length) {
    return new NextResponse(null, {
      status: 404,
      statusText: "No files found",
    });
  }

  return new NextResponse(JSON.stringify(files), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
