const express = require('express');
const router = express.Router();
const controller = require('../controllers/alquiler.controller')

// Create
router.get('/revision',controller.alquileresRevision)
router.get('/verify/:id',controller.verificarAlquiler);
router.get('/:id',controller.alquileresById)
router.get('/gestionados/:id',controller.alquileresgestionados)
router.get('/pedidos/:id',controller.alquilerespedidos)
router.get('/',controller.alquileres)
router.post('/',controller.crearAlquiler);

module.exports = router;