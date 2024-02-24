import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    desc: { type: String, required: true },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    assignUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", TaskSchema);
