const mongoose = require("mongoose");

const diarySchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  date: {type: Date, default: Date.now},
});

module.export = mongoose.model("Diary", diarySchema);
