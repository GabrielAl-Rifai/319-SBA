// Imports
import express from "express";
import dotenv from "dotenv";
import mongoose, { Mongoose } from "mongoose";
import Climbs from "./models/climberSchema.mjs";
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
// await mongoose.connect(process.env.ATLAS_URI);

//Middlewares
app.use(express.json());
app.use(cors());

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

// Mongoose// Creating documents follows a syntax similar to classes.
// const newDoc = new Learner({
//   name: "Frodo",
//   enrolled: true,
//   year: 2024,
//   // Since we do not define a campus, it will resort to our set default.
// });

// // This saves (inserts) the document to the database.
// // We'll disable it here with an anonymous function wrapper
// // to prevent duplicates in our example database.
// async () => {
//   await newDoc.save();
// };

// app.get("/", async (req, res) => {
//   // You can retrieve documents using find methods
//   // on their associated models.
//   let frodo = await Learner.findOne({ name: "Frodo" });

//   // You can also add new fields to a document and save it.
//   frodo.avg = 85;
//   await frodo.save();

//   res.send(frodo);
// });

// app.get("/passing", async (req, res) => {
//   // Here, we use the static function defined on the schema
//   // to easily retrieve all learners with passing averages.
//   // This also allows us to put business logic in the data model,
//   // rather than scattering it about the application.
//   let result = await Learner.findPassing();
//   res.send(result);
// });

// app.get("/:id", async (req, res) => {
//   // Note that Mongoose automatically type-casts fields.
//   // We do not need to wrap the id parameter in ObjectId().
//   // That said, we should still catch errors produced by invalid ids.
//   try {
//     let result = await Learner.findById(req.params.id);
//     res.send(result);
//   } catch {
//     res.send("Invalid ID").status(400);
//   }
// });

// // Global error handling
// app.use((err, _req, res, next) => {
//   res.status(500).send("Seems like we messed up somewhere...");
// });

// // Start the Express server
// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}`);
// });
