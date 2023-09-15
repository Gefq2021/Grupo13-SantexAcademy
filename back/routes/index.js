const Express = require('express');

// Middlewares:
const rootPath = require('../middleware/root_path.middleware');
const errors = require('../middleware/error_handler.middleware');
const rutasproducto = require("./routes.products");
const rutasAlquiler = require("./routes.alquileres");
const app = Express();

// Rutas

// use=
app.use('/ping', (req, res) => {
  res.json({
    response: 'pong!',
  });
});
app.use("/products", rutasproducto);
app.use("/alquiler", rutasAlquiler );




app.use('/', rootPath.handler);
app.use(rootPath.setHeaders);
app.use(errors.handler);

module.exports = app;
