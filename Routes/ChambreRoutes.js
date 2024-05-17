const express = require('express');
const router = express.Router();
const ExamenController =require('../Controllers/ExamenController');




router.post('/add/:id', ExamenController.AddChambreHotel);
router.put('/Reserverd/:id/:nom_client', ExamenController.Reserver);

module.exports = router;
