const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  user:{
type: String
  },
  title: {
    type: String,
    required: [true],
  },
  description: {
    type: String,
    required: [true],
  },
  tags: {
    type: String,
  },
  date: {
    type: Date,
  },
});
const AuthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true]
  },
email: {
    type: String,
    required: [true],
    unique: [true]
  },
  password: {
    type: String,
    required: [true]
  }

})

const StoreAuth = mongoose.model("creds",AuthSchema)
const StoreNotes = mongoose.model("storedNotes",NotesSchema)
module.exports = {StoreNotes,StoreAuth};