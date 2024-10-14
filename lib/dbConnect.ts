import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env.local"
  );
}

const dbConnect = async () => {
  // return await mongoose.connect(MONGO_URI as string);
  if (mongoose.connection.readyState >= 1) {
    return;
  } else {
    console.log("connecting to mongo");
    return await mongoose.connect(MONGO_URI as string);
  }
};

export default dbConnect;
