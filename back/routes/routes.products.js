const express = require('express');
const router = express.Router();
const db = require('../models');
const controller = require('../controllers/products.controller');
const upload = require('../middleware/multer.middleware');

// Create
//local.../products/
router.post('/',upload.single('image'),controller.create);
router.get("/",controller.getAll);
router.get("/:id",controller.getByID);
router.put("/:id",controller.editByID);
router.delete("/:id",controller.delete);
module.exports = router;
