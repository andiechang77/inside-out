import { connectToDb } from "@utils/database";
import { NextResponse } from "next/server";
import { Stream } from "stream";

type Params = {
  params: { filename: string };
};

export async function GET(req: Request) {
  // 1. get GridFS bucket
  const { bucket } = await connectToDb();

  const files = await bucket.find().toArray();
  if (!files.length) {
    return new NextResponse(null, {
      status: 404,
      statusText: "No files found",
    });
  }
  const fileDataArray = await Promise.all(
    files.map(async (file) => {
      // 5. get each file data
      const stream = bucket.openDownloadStreamByName(file.filename);
      const fileData = await streamToBuffer(stream); // You need a function to convert stream to buffer

      return {
        filename: file.filename,
        contentType: file.contentType,
        data: fileData,
        category: file.metadata?.category,
      };
    })
  );

  // 5. return a streamed response
  return new NextResponse(JSON.stringify(fileDataArray), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function streamToBuffer(stream: Stream): Promise<Buffer> {
  const chunks: Uint8Array[] = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk: Uint8Array) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", (error) => reject(error));
  });
}
