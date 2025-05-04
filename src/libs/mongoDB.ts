import mongoose from "mongoose";

const connectToMongoDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error(
        "MONGODB_URL is not defined in the environment variables"
      );
    }
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectToMongoDB;
