const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  jobRole: {
    type: String,
    required: true
  },
  location: String,
  appliedDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: "Applied"
  },
  notes: String
});

module.exports = mongoose.model("Job", jobSchema);