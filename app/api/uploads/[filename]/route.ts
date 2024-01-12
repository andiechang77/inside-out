import { connectToDb } from "@utils/database";
import { NextResponse } from "next/server";
import { Stream } from "stream";
import { streamToBuffer } from "../route";

type Params = {
  params: { filename: string };
};

const cache = new Map<string, Buffer>();

export async function GET(req: Request, { params }: Params) {
  // 1. get GridFS bucket
  const { bucket } = await connectToDb();

  const filename = params.filename as string;
  // 2. validate the filename
  if (!filename) {
    return new NextResponse(null, { status: 400, statusText: "Bad Request" });
  }

  const cachedData = cache.get(filename);
  if (cachedData) {
    return new NextResponse(cachedData, {
      headers: {
        "Content-Type": "application/octet-stream", // Adjust the content type accordingly
      },
    });
  }

  try {
    const files = await bucket.find({ filename }).toArray();

    if (files.length === 0) {
      return new NextResponse(null, { status: 404, statusText: "Not found" });
    }

    const file = files[0];
    const stream = bucket.openDownloadStreamByName(filename);

    // Convert stream to buffer and store in the cache
    const fileData = await streamToBuffer(stream);
    cache.set(filename, fileData);

    return new NextResponse(fileData, {
      headers: {
        "Content-Type": file.contentType!,
      },
    });
  } catch (error) {
    console.error("Error fetching file:", error);
    return new NextResponse(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
