import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();
//Body parser?

//Get all route
router.get("/", async (req, res) => {
  let collection = await db.collection("rating");
  let result = await collection.find({}).limit(10).toArray();
  res.json(result);
});

//Create POST new rating
router.post("/", async (req, res) => {
  let collection = await db.collection("rating");
  let newDocument = req.body;

  if (newDocument.climber_id) {
    newDocument.climbr_id = newDocument.climber_id;
    delete newDocument.climber_id;
  }

  let result = await collection.insertOne(newDocument);

  res.json(result).status(201);
});

// Get a single rating entry
router.get("/:id", async (req, res) => {
  let collection = await db.collection("climbs");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.status(404).send("Not found");
  else res.send(result).status(200);
});

//Get a climbr by ID
router.get("/climbr/:climbrID", async (req, res) => {
  let collection = await db.collection("rating");
  let query = { climbr_id: Number(req.params.climbrID) };
  let result = await collection.find(query).toArray();

  if (!result) res.status(404).send("Not found");
  else res.send(result).status(200);
});

//Delete a climbr by id
router.delete("/climbr/:climbrID", async (req, res) => {
  let collection = await db.collection("climbs");
  let query = { climbr_id: Number(req.params.climbrID) };
  let result = await collection.deleteMany(query);

  if (result.deletedCount === 0) res.status(404).send("Not found");
  else res.send(result).status(200);
});

//
//Get a climb by climb_id
router.get("/climb/:climbID", async (req, res) => {
  let collection = await db.collection("rating");
  let query = { climb_id: Number(req.params.climbID) };
  let result = await collection.find(query).toArray();

  if (!result) res.status(404).send("Not found");
  else res.json(result).status(200);
});

//Update a climb_id PATCH
router.patch("/climb/:climbID", async (req, res) => {
  let collection = await db.collection("rating");
  let query = { climb_id: Number(req.params.climbID) };

  let result = await collection.updateMany(query, {
    $set: { climb_id: req.body.climb_id },
  });

  console.log(result);
  if (result.upsertedCount === 0) res.status(404).send("Not found");
  else res.json(result).status(200);
});

export default router;
