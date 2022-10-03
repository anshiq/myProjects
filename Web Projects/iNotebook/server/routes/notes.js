const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secret = "mysupersaiyansecret";
const { StoreNotes } = require("../models/schema");
// const { body, validationResult } = require("express-validator");
/*----------------------------------------------*/
const tokenValidator = (req, res, next) => {
  // console.log(req.body);
  const userToken = req.header("auth-token"); // receiving token in headers (more secure).
  if (!userToken) {
    res
      .status(401)
      .send({ error: "access denied please authenticate the token" });
  }
  try {
    //    console.log("called2")

    const data = jwt.verify(userToken, secret);
    req.user = data.id; // modidied the req in all the req,res functions in which fetchUsr function is used

    next();
  } catch (error) {
    res.status(401);
  }
};
/*-----------------------------
using wxpress validator to validate the users all data sent from browser.
---------------------------*/
router.get("/allnotes", tokenValidator, async (req, res) => {
  try {
    const allnotes = await StoreNotes.find({ user: `${req.user}` }).select("-user").select("-__v");;
    if (!allnotes) {
      return res.status(404).send("no task found");
    }
    // console.log(req.user,allnotes);
    res
      .status(200)
      .json(allnotes);
  } catch (error) {
    res.send("error occured");
  }
});
router.post("/addnote", tokenValidator, async (req, res) => {
try
{  console.log(req.body,req.user)
  const note = {
    user: req.user,
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
  };
  const savedNote = await StoreNotes.create(note);
  res.json(savedNote)
  // console.log(savedNote);
  }catch(error){
    res.json({success: false})
  }
});

router.patch("/update/:ID", tokenValidator, async (req, res) => {
  const { ID: taskID } = req.params;
  const note = {
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
  };
  const updatedNote = await StoreNotes.findByIdAndUpdate(taskID, note);
  console.log(updatedNote);
  res.json({ updated: true });
});
router.delete("/delete/:ID", tokenValidator, async (req, res) => {
  const { ID: taskID } = req.params;
  const deleteNote = await StoreNotes.findByIdAndDelete(taskID);
  if (!deleteNote) {
    return res.json({ deleted: false });
  }
  console.log(deleteNote);
  res.json({ deleted: true });
});
module.exports = router;
