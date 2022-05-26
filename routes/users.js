const express = require("express");
const router = express.Router();
const postModel = require("../models/postmodel");

//Post Method
router.post("/addpost", async (req, res) => {
  const data = new postModel({
    title: req.body.title,
    desc: req.body.desc,
    price: req.body.price,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get post
router.get("/getpost/:id", async (req, res) => {
  try {
    const data = await postModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.put("/updatePost/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await postModel.findByIdAndUpdate(
      id,
      updatedData,
      this.true
    );

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await postModel.findByIdAndDelete(id);
    res.send(`Document with "${data.title}" has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
