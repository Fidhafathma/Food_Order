const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('List all restaurants - to be implemented');
});

router.get('/:id', (req, res) => {
  res.send(`Details for restaurant ID: ${req.params.id}`);
});

module.exports = router;
