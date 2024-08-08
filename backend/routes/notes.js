const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route1:-  fetch data of loggedin user,GET because we want to get data
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("some error occured");
  }
});
//Route2:- Add notes using,POST "api/notes/addnotes"
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = await Note.create({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savenote = await note.save();
      res.json(savenote);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("some error occured");
    }
  }
);
// ROUTE 3: Update an existing Note using: POST "/api/notes/updatenote". Login required
//id of note not user    acces this id /updatenote/:id by req.params.id
router.post("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  // Create a newNote object
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  // Find the note to be updated and update it
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }

  note = await Note.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json({ note });
});
//Route4: Delete an existing note using : DELETE"/api/notes/deletenote".login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  // Find the note to be deleted and delete it
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }

  //allow deletion only if user own this note
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }

  note = await Note.findByIdAndDelete(req.params.id);
  res.json({ Success: " Note has been deleted", note: note });
});

module.exports = router;
