const mongoose = require('mongoose');

const SheetSchema = new mongoose.Schema({
  name: String,
  data: [[String]], // 2D Array to store sheet data
});

module.exports = mongoose.model('Sheet', SheetSchema);
