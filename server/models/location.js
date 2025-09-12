const mongoose = require('mongoose');
const User = require("../models/user")

const locationSchema = new mongoose.Schema({
  touristID: String,
  timestamp: {
    type: Date,
    required: [true, 'Timestamp is required'],
    default: Date.now,
    index: true
  },
  latitude: {
    type: Number,
    required: [true, 'Latitude is required'],
    min: [-90, 'Latitude must be between -90 and 90'],
    max: [90, 'Latitude must be between -90 and 90'],
    validate: {
      validator: function(v) {
        return !isNaN(v) && isFinite(v);
      },
      message: 'Latitude must be a valid number'
    }
  },
  longitude: {
    type: Number,
    required: [true, 'Longitude is required'],
    min: [-180, 'Longitude must be between -180 and 180'],
    max: [180, 'Longitude must be between -180 and 180'],
    validate: {
      validator: function(v) {
        return !isNaN(v) && isFinite(v);
      },
      message: 'Longitude must be a valid number'
    }
  },
  riskScore: {
    type: Number,
    required: [true, 'Risk score is required'],
    min: [0, 'Risk score must be between 0 and 100'],
    max: [100, 'Risk score must be between 0 and 100'],
    validate: {
      validator: function(v) {
        return !isNaN(v) && isFinite(v);
      },
      message: 'Risk score must be a valid number'
    }
  }
}, {
  timestamps: true, 
  versionKey: false
});