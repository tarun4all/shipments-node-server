const express = require('express');
const router = express.Router();
const path = require('path');

//controllers
const clientController = require("../controller/clientController");

//middlewares
const {validateUser, loginValidate} = require("../middleware/auth");

//HBS view routes
router.get('/signup', (req, res) => {
  res.render('signup', {layout : 'main', title: 'Tracsys - Signup'});
});
router.get('/login', (req, res) => {
  res.render('login', {layout : 'main', title: 'Tracsys - Login'});
});
router.get('/acceptInvite', (req, res) => {
  res.render('invite', {layout : 'main', title: 'Tracsys - Invitaion'});
});
router.get('/forgetPassword', (req, res) => {
  if(req.query.id) {
    res.render('reset', {layout : 'main', title: 'Tracsys - Invitaion'});
  } else {
    res.render('forget', {layout : 'main', title: 'Tracsys - Invitaion'});
  }
});

//api routes
router.group('/api', (app) => {
  app.post('/signup', clientController.signup);
  app.post('/login', [loginValidate]);
  app.post('/forgetPassword', clientController.forgetPassword);
  app.post('/emp/create', [validateUser], clientController.createEmployee);
  app.get('/emp/show', [validateUser], clientController.showEmployee);
});

//React dashboard view route
// router.get('*.*', express.static(path.join(__dirname, 'public/view/build')));

// router.get('/*', (req, res) => {
//   console.log('yeah');
//   res.sendFile(path.join(__dirname, 'public/view/build/index.html'));
// });

module.exports = router;
