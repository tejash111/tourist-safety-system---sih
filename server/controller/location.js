const Location = require('../models/location');
const mongoose = require('mongoose');

// Create a new location entry
exports.createLocation = async (req, res) => {
  try {
    const { touristID, latitude, longitude, riskScore, timestamp } = req.body;

    // Validate required fields
    if (!touristID || latitude === undefined || longitude === undefined || riskScore === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: touristID, latitude, longitude, riskScore'
      });
    }

    const locationData = {
      touristID,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      riskScore: parseFloat(riskScore),
      timestamp: timestamp ? new Date(timestamp) : new Date()
    };

    const location = new Location(locationData);
    const savedLocation = await location.save();

    res.status(201).json({
      success: true,
      message: 'Location created successfully',
      data: savedLocation
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating location',
      error: error.message
    });
  }
};

// Get all locations with optional filters
exports.getAllLocations = async (req, res) => {
  try {
    const { 
      touristID, 
      startDate, 
      endDate, 
      minRisk, 
      maxRisk, 
      page = 1, 
      limit = 50,
      sortBy = 'timestamp',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (touristID) filter.touristID = touristID;
    
    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate);
      if (endDate) filter.timestamp.$lte = new Date(endDate);
    }
    
    if (minRisk !== undefined || maxRisk !== undefined) {
      filter.riskScore = {};
      if (minRisk !== undefined) filter.riskScore.$gte = parseFloat(minRisk);
      if (maxRisk !== undefined) filter.riskScore.$lte = parseFloat(maxRisk);
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const locations = await Location.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Location.countDocuments(filter);

    res.json({
      success: true,
      data: locations,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching locations',
      error: error.message
    });
  }
};

// Get location by ID
exports.getLocationById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid location ID'
      });
    }

    const location = await Location.findById(id);
    
    if (!location) {
      return res.status(404).json({
        success: false,
        message: 'Location not found'
      });
    }

    res.json({
      success: true,
      data: location
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching location',
      error: error.message
    });
  }
};

// Get locations by tourist ID
exports.getLocationsByTourist = async (req, res) => {
  try {
    const { touristID } = req.params;
    const { startDate, endDate, limit = 100, sortOrder = 'desc' } = req.query;

    const filter = { touristID };
    
    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate);
      if (endDate) filter.timestamp.$lte = new Date(endDate);
    }

    const sort = { timestamp: sortOrder === 'desc' ? -1 : 1 };

    const locations = await Location.find(filter)
      .sort(sort)
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: locations,
      count: locations.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tourist locations',
      error: error.message
    });
  }
};

// Get nearby locations
exports.getNearbyLocations = async (req, res) => {
  try {
    const { latitude, longitude, maxDistance = 10, limit = 50 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const maxDist = parseFloat(maxDistance);

    const locations = await Location.findNearby(lat, lng, maxDist)
      .limit(parseInt(limit))
      .sort({ timestamp: -1 });

    res.json({
      success: true,
      data: locations,
      count: locations.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching nearby locations',
      error: error.message
    });
  }
};

// Get high risk locations
exports.getHighRiskLocations = async (req, res) => {
  try {
    const { minRiskScore = 70, limit = 50, hours = 24 } = req.query;

    const timeThreshold = new Date(Date.now() - parseInt(hours) * 60 * 60 * 1000);

    const locations = await Location.find({
      riskScore: { $gte: parseFloat(minRiskScore) },
      timestamp: { $gte: timeThreshold }
    })
    .sort({ riskScore: -1, timestamp: -1 })
    .limit(parseInt(limit));

    res.json({
      success: true,
      data: locations,
      count: locations.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching high risk locations',
      error: error.message
    });
  }
};

// Update location
exports.updateLocation = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid location ID'
      });
    }

    const updates = req.body;
    
    // Convert numeric fields
    if (updates.latitude !== undefined) updates.latitude = parseFloat(updates.latitude);
    if (updates.longitude !== undefined) updates.longitude = parseFloat(updates.longitude);
    if (updates.riskScore !== undefined) updates.riskScore = parseFloat(updates.riskScore);
    if (updates.timestamp !== undefined) updates.timestamp = new Date(updates.timestamp);

    const location = await Location.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!location) {
      return res.status(404).json({
        success: false,
        message: 'Location not found'
      });
    }

    res.json({
      success: true,
      message: 'Location updated successfully',
      data: location
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating location',
      error: error.message
    });
  }
};

// Delete location
exports.deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid location ID'
      });
    }

    const location = await Location.findByIdAndDelete(id);

    if (!location) {
      return res.status(404).json({
        success: false,
        message: 'Location not found'
      });
    }

    res.json({
      success: true,
      message: 'Location deleted successfully',
      data: location
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting location',
      error: error.message
    });
  }
};

// Get location statistics
exports.getLocationStats = async (req, res) => {
  try {
    const { touristID, days = 7 } = req.query;

    const timeThreshold = new Date(Date.now() - parseInt(days) * 24 * 60 * 60 * 1000);
    const filter = { timestamp: { $gte: timeThreshold } };
    
    if (touristID) filter.touristID = touristID;

    const stats = await Location.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalLocations: { $sum: 1 },
          averageRiskScore: { $avg: '$riskScore' },
          maxRiskScore: { $max: '$riskScore' },
          minRiskScore: { $min: '$riskScore' },
          uniqueTourists: { $addToSet: '$touristID' }
        }
      },
      {
        $project: {
          _id: 0,
          totalLocations: 1,
          averageRiskScore: { $round: ['$averageRiskScore', 2] },
          maxRiskScore: 1,
          minRiskScore: 1,
          uniqueTouristCount: { $size: '$uniqueTourists' }
        }
      }
    ]);

    res.json({
      success: true,
      data: stats[0] || {
        totalLocations: 0,
        averageRiskScore: 0,
        maxRiskScore: 0,
        minRiskScore: 0,
        uniqueTouristCount: 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching location statistics',
      error: error.message
    });
  }
};