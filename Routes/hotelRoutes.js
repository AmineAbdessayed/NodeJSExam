const express = require('express');
const router = express.Router();
const ExamenController =require('../Controllers/ExamenController');
const validate=require('../Middleware/validate');




router.post('/add',validate, ExamenController.addHotel);
router.get('/list', ExamenController.getAllHotel);
router.get('/getById/:id', ExamenController.getHotelById);
router.delete('/delete/:id', ExamenController.deleteHotel);


module.exports = router;
