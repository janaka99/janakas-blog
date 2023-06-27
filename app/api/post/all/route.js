import Post from "@/models/post";
import { connectToDB } from "@/utils/dbconnect";

export async function GET(req, res) {
  try {
    connectToDB();
    //find all available products
    const rs = await Post.find().populate({
      path: "author",
    });

    //return all the products
    return new Response(JSON.stringify(rs), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 500,
    });
  }
}
