import Post from "@/models/post";
import { storage } from "@/utils/firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { getDownloadURL, deleteObject } from "firebase/storage";
import { IsLoggedIn } from "@/middlewares";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  //check the if the user is logged and has authority to add new product
  const loggedUser = await IsLoggedIn(req);

  if (loggedUser !== false) {
    try {
      //get all the data from request body
      const data = await req.formData();

      //extract product details
      const [detailskey, detailsValue] = Array.from(data.entries())[0];

      //extract product image file
      const [fileskey, filesValue] = Array.from(data.entries())[1];

      //check the uploded image file is in valid format
      const isFile = typeof filesValue === "object";

      //check if there is a product image
      if (isFile) {
        //buffer the product image
        const buffer = Buffer.from(await filesValue.arrayBuffer());

        //generate unique name for product image
        var crypto = require("crypto");
        var vcode = crypto.randomBytes(20).toString("hex");

        //set firebase storage reference to save the product image
        const storageRef = ref(storage, `files/${vcode}.png`);

        //save product image to firebase storage
        const snapshot = await uploadBytesResumable(storageRef, buffer);

        //check wether product image was successfully uploaded
        if (snapshot.state === "success") {
          //if yes get the image url to save in database
          const imageURL = await getDownloadURL(snapshot.ref);

          //get the image path to save in database
          const imagePath = snapshot.ref.fullPath;

          //get product details to readable format
          const postDetails = JSON.parse(detailsValue);

          //validate product details
          const post = validateUserDetails(postDetails);

          //check if validation fails
          if (post === false) {
            //if validation fails, then delete the uploaded product image
            await deleteObject(storageRef);
            //return error response
            return new Response("Something went wrong try again later", {
              status: 400,
            });
          }
          //if validation succeeds, then create new product object
          const newPost = new Post({
            title: postDetails.title,
            body: postDetails.body,
            src: imageURL,
            imageId: imagePath,
            author: loggedUser._id,
          });

          //save new product
          const pp = await newPost.save();

          if (pp) {
            //return success response
            return new Response(JSON.stringify(pp), {
              status: 200,
            });
          }
          //if catch any errors  while saving product, then delete the uploaded image
          await deleteObject(storageRef);
          //return error response
          return new Response(
            JSON.stringify({
              message: "Something went wrong try again later",
            }),
            {
              status: 401,
            }
          );
        } else {
          // return error response if catch any errors
          console.log("error");
          return new Response(
            JSON.stringify({ status: "Image upload failed " }),
            { status: 402 }
          );
        }
      }
      console.log(" asdasd");
      // return error response if catch any errors
      return new Response("Something went wrong try again later", {
        status: 403,
      });
    } catch (error) {
      console.log(error);
      // return error response if catch any errors
      return new Response("Something went wrong try again later", {
        status: 404,
      });
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

const validateUserDetails = (post: any) => {
  let error = false;
  console.log(post);
  if (post.title === "") {
    error = true;
  }

  if (error) {
    return false;
  }
  return post;
};
