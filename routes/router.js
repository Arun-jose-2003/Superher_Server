const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');

const grievanceController = require('../controllers/grievanceController');


// Register
router.post('/register', userController.register);

// Login
router.post('/login', userController.login);

//adminlogin
//login- http://localhost:3000/login
router.post('/adminlogin',adminController.loginController)

// grievance
router.post('/grievance', grievanceController.grievance);

router.get('/viewgrievance',adminController.viewAllGrievance)
//update grievance status

router.put('/updategrievancestatus/:complaintId/status',adminController.updateStatus)


router.post('/chat', grievanceController.chat);


module.exports = router;