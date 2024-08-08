const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
  //link  notes with user so only that user can acces
  user: {
    type: mongoose.Schema.Types.ObjectId, //link with user object id
    //  module.exports = mongoose.model('user', UserSchema); this user
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("notes", NotesSchema);
