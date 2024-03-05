import mongoose from "mongoose";

const climberSchema = new mongoose.Schema({
  // Each property can have a type field that describdes
  // the valid data types for that field, and a
  // required field to specify whether it is required.
  name: {
    type: String,
    required: true,
  },
  boulder_attempts: {
    type: Number,
    min: 0,
    required: true,
  },
  leadRoute_attempts: {
    type: Number,
    min: 0,
    required: true,
  },
  accessibilty: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model(`Climbers`, climberSchema);
