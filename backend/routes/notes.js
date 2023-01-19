const exprees = require("express");
const router = exprees.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/notes");
const { body, validationResult } = require("express-validator");
const notes = require("../models/notes");

// Route:1 Get all notes using Get:"api/notes/fwtchallnotes", Login is required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user._id });
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: error });
  }
});

// Route 2: create a new note using POST :/api/notes/newnote :login required

router.post(
  "/newnote",
  fetchuser,
  [
    body("title", "Title must be 1 character").isLength({ min: 1 }),
    body("description", "description must be atleast 3 characters").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    // If there are error, send Bad request(400) and error message
    try {
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const newNote = new Notes({
        title,
        description,
        tag,
        user: req.user._id,
      });
      const savednote = await newNote.save();
      res.json(savednote);
    } catch (error) {
      console.log(error);
      res.status(400).json({ errors: error });
    }
  }
);

// Route 3: Update a new note using PUT :/api/notes/updateNote/:_id :login required
router.put("/updatenote/:_id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
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
    let note = await Notes.findById(req.params._id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user._id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params._id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
// Route 4: Delete a note using DELETE :/api/notes/deleteNote/:_id :login required

router.delete("/deletenote/:_id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // Find the note to be updated and update it
    let note = await Notes.findById(req.params._id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user._id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndDelete(req.params._id);
    res.send("Success :Note deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
