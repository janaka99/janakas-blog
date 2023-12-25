import mongoose from "mongoose";

let isConnected = false;
let MONGODB_URI = process.env.MONGODB_URI || "";

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Connected to database");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "janaksblog",
    });

    isConnected = true;
    console.log("mongodb connected");
  } catch (error) {
    console.log(error);
  }
};
