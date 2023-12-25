import Post from "@/models/post";
import { connectToDB } from "@/utils/dbconnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    connectToDB();
    //find latest article
    const lastInsertedRecord = await Post.find()
      .select("title body createdAt src _id")
      .populate({ path: "author", select: "-password" })
      .sort({ createdAt: -1 }) // Sort by creation date in descending order
      .limit(1);

    if (!lastInsertedRecord) {
      return new Response(
        JSON.stringify({ message: "Something went wrong " }),
        {
          status: 400,
        }
      );
    }

    //return latest article
    return new Response(JSON.stringify(lastInsertedRecord), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 500,
    });
  }
}
