import mongoose from "mongoose";
import colors from "colors";

const mdbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("mongo db is connected".bgYellow.black);
  } catch (err) {
    console.log("db is not connected, check internet or server".bgRed.white);
    console.log(err);
    process.exit(1);
  }
};

export default mdbConnection;
