import mongoose from "mongoose";

const leadRoutesSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  difficulty: {
    type: Number,
    min: 0,
    required: true,
  },
  accessibilty: {
    type: Boolean,
    required: true,
  },
});
leadRouteSchema.index({ name: 1 });
leadRouteSchema.index({ difficulty: 1 });
leadRouteSchema.index({ accesibility: 1 });

  difficulty: { 
    type: Number,
    min: 1,
    message: "The difficulty must be greater than 1",
    required: true,
  };

export default mongoose.model(`LeadRoutes`, leadRouteSchema);
