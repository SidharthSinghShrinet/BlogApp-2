import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Title should be atleast of 3 characters"],
      maxlength: [30, "Title should be atmost of 30 charcaters"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Title should be atleast of 3 characters"],
      maxlength: [100, "Title should be atmost of 100 charcaters"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
