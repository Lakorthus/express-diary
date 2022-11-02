import { mongoose } from "mongoose";

const diarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
});

export default mongoose.model("Diary", diarySchema);
