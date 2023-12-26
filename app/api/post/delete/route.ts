import Post from "@/models/post";
import { IsLoggedIn } from "@/middlewares";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  //check the if the user is logged and has authority to add new product
  const loggedUser = await IsLoggedIn(req);

  if (loggedUser !== false) {
    try {
      //get all the data from request body
      const { postId } = await req.json();

      await Post.findByIdAndDelete({ _id: postId });

      return new Response(
        JSON.stringify({ message: "Succesfully deleted your Post" }),
        { status: 200 }
      );
    } catch (err) {
      return new Response(
        JSON.stringify({ message: "Something went wrong try again later" }),
        {
          status: 405,
        }
      );
    }
  } else {
    //if logged user has no authority to add new product return error response
    return new Response(
      JSON.stringify({ message: "Something went wrong try again later" }),
      {
        status: 405,
      }
    );
  }
}
