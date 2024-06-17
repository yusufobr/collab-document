const express = require('express');
const router = express.Router();
const Document = require('../models/document.model.js');

// Get document by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const document = await Document.findById(id);
        res.json(document);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Get all documents
router.get('/', async (req, res) => {
    try {
        const documents = await Document.find().sort({ createdAt: -1 });
        res.json(documents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create document
router.post('/', async (req, res) => {
    console.log(req.body);
    const { id, data } = req.body;

    try {
        const document = await Document.create({ _id: id, data });
        res.json(document);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update document
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Document.findByIdAndDelete(id);
        res.json({ message: 'Document deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;