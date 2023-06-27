import Post from "@/models/post";
import { storage } from "@/utils/firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { getDownloadURL, deleteObject } from "firebase/storage";
import { IsLoggedIn } from "@/middlewares";

export async function POST(req, next) {
  //check the if the user is logged and has authority to add new product
  const loggedUser = await IsLoggedIn(req);

  if (loggedUser !== false) {
    try {
      //get all the data from request body
      const data = await req.formData();

      //extract product details
      const [detailskey, detailsValue] = Array.from(data.entries())[0];

      //get product details to readable format
      const postDetails = JSON.parse(detailsValue);

      //validate product details
      const post = validatePost(postDetails);

      //check if validation fails
      if (post === false) {
        //return error response
        return new Response("Something went wrong try again later", {
          status: 400,
        });
      }
      let imageURL = null;
      let imagePath = null;
      let toDeleteImageIdStorageRef = null;
      let toUploadStorageRef = null;
      let updatedPost;

      if (Array.from(data.entries())[1]) {
        //extract product image file
        const [fileskey, filesValue] = Array.from(data.entries())[1];

        //fetch data from that saved Product to delete the image from firebase storage
        const savedPost = await Post.findById(postDetails.id);

        //create storage reference to current image details
        toDeleteImageIdStorageRef = ref(storage, savedPost.imageId);

        //buffer the product image
        const buffer = Buffer.from(await filesValue.arrayBuffer());

        //generate unique name for product image
        var crypto = require("crypto");
        var vcode = crypto.randomBytes(20).toString("hex");

        //set firebase storage reference to save the product image
        toUploadStorageRef = ref(storage, `files/${vcode}.png`);

        //save product image to firebase storage
        const snapshot = await uploadBytesResumable(toUploadStorageRef, buffer);

        //check wether product image was successfully uploaded
        if (snapshot.state === "success") {
          //if yes get the image url to save in database
          imageURL = await getDownloadURL(snapshot.ref);
          4;

          //get the image path to save in database
          imagePath = snapshot.ref.fullPath;
        } else {
          return new Response(
            JSON.stringify({
              message: "Something went wrong try again later",
            }),
            {
              status: 401,
            }
          );
        }
      }
      if (imageURL !== null || imagePath !== null) {
        const item = await Post.findByIdAndUpdate(postDetails.id, {
          title: postDetails.title,
          body: postDetails.body,
          src: imageURL,
          imageId: imagePath,
        });
        if (item) {
          await deleteObject(toDeleteImageIdStorageRef);
          //return success response
          return new Response(JSON.stringify(item), {
            status: 200,
          });
        } else {
          await deleteObject(toUploadStorageRef);

          //return error response
          return new Response(
            JSON.stringify({
              message: "Something went wrong try again later",
            }),
            {
              status: 401,
            }
          );
        }
      } else {
        const item = await Post.findOneAndUpdate(
          { _id: postDetails.id },
          {
            title: postDetails.title,
            body: postDetails.body,
          },
          { new: true }
        );
        console.log(item);
        if (item) {
          //return success response
          return new Response(JSON.stringify(item), {
            status: 200,
          });
        } else {
          //return error response
          return new Response(
            JSON.stringify({
              message: "Something went wrong try again later",
            }),
            {
              status: 401,
            }
          );
        }
      }
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

const validatePost = (post) => {
  let error = false;
  if (post.title === "") {
    error = true;
  }
  if (post.body === "") {
    error = true;
  }
  if (error) {
    return false;
  }
  return post;
};
