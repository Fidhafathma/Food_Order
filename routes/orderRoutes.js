const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('User orders - to be implemented');
});

module.exports = router;
