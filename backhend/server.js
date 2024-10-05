require('dotenv').config();
const express = require('express');
const path = require('path');
const { monitorDomain } = require('./monitor.js');

const app = express();
const port = 5500;

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/api/scan', async (req, res) => {
    const domain = req.query.domain;
    try {
        const result = await monitorDomain(domain);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
