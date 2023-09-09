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
  module.exports = upload;