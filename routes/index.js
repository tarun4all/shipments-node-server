const express = require('express');
const router = express.Router();
const path = require('path');

//controllers
const clientController = require("../controller/clientController");

//middlewares
const {validateUser, loginValidate} = require("../middleware/auth");

router.group('/api', (app) => {
  app.post('/signup', clientController.signup);
  app.post('/login', [loginValidate]);
  app.post('/forgetPassword', clientController.forgetPassword);
  app.post('/emp/create', [validateUser], clientController.createEmployee);
  app.get('/user/read', [validateUser], clientController.showEmployee);
});

// router.get('*.*', express.static(path.join(__dirname, 'public/view/build')));

// router.get('/*', (req, res) => {
//   console.log('yeah');
//   res.sendFile(path.join(__dirname, 'public/view/build/index.html'));
// });

module.exports = router;
