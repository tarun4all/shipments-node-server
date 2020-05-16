const express = require('express');
const router = express.Router();
const path = require('path');

//controllers
const clientController = require("../controller/clientController");

router.group('/api', (app) => {
  app.post('/signup', clientController.signup);
});

// router.get('*.*', express.static(path.join(__dirname, 'public/view/build')));

// router.get('/*', (req, res) => {
//   console.log('yeah');
//   res.sendFile(path.join(__dirname, 'public/view/build/index.html'));
// });

module.exports = router;
