const express = require('express');
const router = express.Router();
const db = require('../models');
const controller = require('../controllers/products.controller');
const multer  = require('multer')
const upload = multer({
    limits: {
      fileSize: 1024 * 1024 * 5, // 5 MB
    },
    fileFilter(req, file, cb) {
      // Solo permite archivos de tipo imagen
      if (file.mimetype.match(/^image\/*/)) {
        cb(null, true);
      } else {
        cb(new Error('Solo se permiten archivos de tipo imagen'));
      }
    },
  });

// Create
//local.../products/
router.post('/',upload.single('image'),controller.create);
router.get("/",controller.getAll);
router.get("/:id",controller.getByID);
router.put("/:id",controller.editByID);
router.delete("/:id",controller.delete);
module.exports = router;
