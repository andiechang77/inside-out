// app/api/upload
import { connectToDb, fileExists } from "@utils/database";
import { NextResponse } from "next/server";
import { Readable } from "stream";

export async function POST(req: Request) {
  const data = await req.formData();
  const { client } = await connectToDb();
  let category;
  const docs: object[] = [];
  for (const entry of Array.from(data.entries())) {
    const [key, value] = entry;
    if (key === "tags") {
      category = value;
      continue;
    }
    const existing = await fileExists(key);
    if (!existing) {
      // If file does not exist, create the object and push it to 'docs'
      const docObject = {
        title: key,
        url: value,
        tags: category,
      };
      docs.push(docObject);
    }
  }

  const result = await client.db().collection("images.files").insertMany(docs);

  return NextResponse.json({ success: true });
}
