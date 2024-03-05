import mongoose from "mongoose";

const climberSchema = new mongoose.Schema({

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
