import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please fill mandatory feild"],
    },
    email: {
      type: String,
      required: [true, "please fill mandatory feild"],
    },
    password: {
      type: String,
      required: [true, "please fill mandatory feild"],
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
