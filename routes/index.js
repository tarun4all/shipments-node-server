const express = require('express');
const router = express.Router();
const path = require('path');

router.group('/api', (app) => {
  app.get('/login', (req, res) => {
    res.send('oh');
  });
});


// router.get('*.*', express.static(path.join(__dirname, 'public/view/build')));

// router.get('/*', (req, res) => {
//   console.log('yeah');
//   res.sendFile(path.join(__dirname, 'public/view/build/index.html'));
// });

module.exports = router;
