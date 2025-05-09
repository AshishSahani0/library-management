import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;
  mongoose
    .connect(mongoURI, {
      dbName: "MERN_STACK_LIBRARY_MANAGEMENT_SYSTEM",
    })
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB", err);
    });
};

export default connectDB;
