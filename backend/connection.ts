import mongoose from "mongoose";

const connectMongoDb = async (url: string) => {
    return await mongoose.connect(url);
}


export { connectMongoDb };
