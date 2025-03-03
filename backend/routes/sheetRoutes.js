const express = require('express');
const { createSheet, getSheets, updateSheet } = require('../controllers/sheetController');
const router = express.Router();

// Create a new sheet
router.post('/', createSheet);

// Get all sheets
router.get('/', getSheets);

// Update a sheet
router.put('/:id', updateSheet);

module.exports = router;