// Imports
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Climbs from "./models/ratingsSchema.mjs";
import climbs from "./utilities/data.js";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import posts from "./routes/posts.mjs";

//Configurations
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
await mongoose.connect(process.env.MONGO_URI);

//Middlewares
app.use(express.json());
app.use(cors());

// Load the /posts routes
app.use("/posts", posts);

//Routes
app.use("/ratings", ratingsRouter);

//Seed Routes
app.get("/seed", async (req, res) => {
  await Climbs.deleteMany({});
  await Climbs.create(climbs);

  res.send(`Database Seeded`);
});

//Create
app.post("/", async (req, res) => {
  try {
    let newClimb = new Climbs(req.body);
    await newClimb.save();

    res.json(newClimb);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//Read
app.get("/", async (req, res) => {
  try {
    const allClimbs = await Climbs.find({});
    res.json(allClimbs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//Update
app.put("/:id", async (req, res) => {
  try {
    const updatedClimbs = await Climbs.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedClimbs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//Delete
app.delete("/:id", async (req, res) => {
  try {
    await Climbs.findByIdAndDelete(req.params.id);

    res.status(200).json({ msg: "Item Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//Error checking middleware
app.use((err, _req, res, next) => {
  res.status(500).send("Seems like we messed up somewhere...");
});

//Listen/ Start the Express server
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
