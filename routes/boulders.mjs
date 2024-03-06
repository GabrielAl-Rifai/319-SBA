import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

//Get all boulders
router.get("/", async (req, res) => {
  let collection = await db.collection("boulders");
  let result = await collection.find({}).limit(10).toArray();
  res.json(result);
});

//Create POST new boulders
router.post("/", async (req, res) => {
  let collection = await db.collection("boulders");
  let newDocument = req.body;

  if (newDocument.boulder_id) {
    newDocument.climbr_id = newDocument.boulder_id;
    delete newDocument.boulder_id;
  }

  let result = await collection.insertOne(newDocument);

  res.json(result).status(201);
});

// Get a single boulders entry
router.get("/:id", async (req, res) => {
  let collection = await db.collection("boulder");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.status(404).send("Not found");
  else res.send(result).status(200);
});

//Get a climber by ID
router.get("/climbr/:climbrID", async (req, res) => {
  let collection = await db.collection("boulders");
  let query = { climbr_id: Number(req.params.climbrID) };
  let result = await collection.find(query).toArray();

  if (!result) res.status(404).send("Not found");
  else res.send(result).status(200);
});

//Delete a climber by id
router.delete("/climbr/:climbrID", async (req, res) => {
  let collection = await db.collection("boulder");
  let query = { climbr_id: Number(req.params.climbrID) };
  let result = await collection.deleteMany(query);

  if (result.deletedCount === 0) res.status(404).send("Not found");
  else res.send(result).status(200);
});

//
//Get a climb by climb_id
router.get("/climb/:climbID", async (req, res) => {
  let collection = await db.collection("boulders");
  let query = { climb_id: Number(req.params.climbID) };
  let result = await collection.find(query).toArray();

  if (!result) res.status(404).send("Not found");
  else res.json(result).status(200);
});

//Update a climb_id PATCH
router.patch("/climb/:climbID", async (req, res) => {
  let collection = await db.collection("boulders");
  let query = { climb_id: Number(req.params.climbID) };

  let result = await collection.updateMany(query, {
    $set: { climb_id: req.body.climb_id },
  });

  console.log(result);
  if (result.upsertedCount === 0) res.status(404).send("Not found");
  else res.json(result).status(200);
});

export default router;
