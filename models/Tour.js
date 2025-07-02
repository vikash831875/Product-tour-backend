import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: String,
  description: String,
  imageUrl: String, // Will use local path or cloud later
  steps: [
    {
      text: String,
    },
  ],
  isPublic: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model("Tour", tourSchema);
