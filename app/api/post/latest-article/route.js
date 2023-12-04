import Post from "@/models/post";
import { connectToDB } from "@/utils/dbconnect";

export async function GET(req, res) {
  try {
    connectToDB();
    //find all available products
    const lastInsertedRecord = await Post.find()
      .select("title body createdAt src _id")
      .populate({ path: "author", select: "-password" })
      .sort({ createdAt: -1 }) // Sort by creation date in descending order
      .limit(1);
    //return all the products
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
