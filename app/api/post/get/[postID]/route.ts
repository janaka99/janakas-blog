import Post from "@/models/post";
import { connectToDB } from "@/utils/dbconnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    connectToDB();
    const id = req.nextUrl.searchParams.get("id");
    const post = await Post.findOne({ _id: id })
      .populate({
        path: "author",
        select: "-password",
      })
      .select("--updatedAt");
    console.log(post);
    if (post) {
      return new Response(JSON.stringify(post), {
        status: 200,
      });
    } else {
      return new Response(
        JSON.stringify({ message: "Something went wrong " }),
        {
          status: 500,
        }
      );
    }
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 500,
    });
  }
}
