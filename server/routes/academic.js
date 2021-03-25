const express = require('express');
const passport = require('passport');
const router = express.Router();
const position_Controller = require('../controllers/academic.js');
router.post('/createtable',passport.checkAuthentication, position_Controller.create);
router.post('/updatetable',passport.checkAuthentication, position_Controller.update);
router.post('/showtables',passport.checkAuthentication, position_Controller.show);
router.post('/results',passport.checkAuthentication, position_Controller.result);
router.post('/update',passport.checkAuthentication, position_Controller.resupdate);
router.get('/delete',passport.checkAuthentication, position_Controller.delete);
module.exports = router;