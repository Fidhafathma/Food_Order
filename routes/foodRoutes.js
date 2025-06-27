const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('List all food items - to be implemented');
});

module.exports = router;