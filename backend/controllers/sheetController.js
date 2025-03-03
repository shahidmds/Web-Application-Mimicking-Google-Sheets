const Sheet = require('../models/Sheet');

// Create a new sheet
exports.createSheet = async (req, res) => {
  try {
    const sheet = new Sheet({ name: req.body.name, data: req.body.data });
    await sheet.save();
    res.status(201).json(sheet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all sheets
exports.getSheets = async (req, res) => {
  try {
    const sheets = await Sheet.find();
    res.status(200).json(sheets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a sheet
exports.updateSheet = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    const updatedSheet = await Sheet.findByIdAndUpdate(id, { data }, { new: true });
    res.status(200).json(updatedSheet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};