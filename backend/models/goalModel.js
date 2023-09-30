import mongoose from "mongoose";

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
    },
    goal: {
      type: String,
      required: [true, "please input goal"],
    },
  },
  {
    timestamps: true,
  }
);

const goalModel = mongoose.model("goals", goalSchema);
export default goalModel;
