const alquilercontroller = {};
const { Products } = require("../models");
const { Alquiler } = require("../models/");
const { User } = require("../models/");
const { Op, DATE } = require("sequelize");

/**
 * @method POST
 * @name verificarAlquiler
 * @param {id} id del alquiler a verificar
 * @description metodo para verificar si un alquiler puede ser realizado,
 * buscara un alquiler aprobado con las fechas y productos dle alquiler a confirmar,
 *  si encunetra el alquiler debe ser rechazado
 */
alquilercontroller.verificarAlquiler = async (req, res) => {
  try {
    const alq = await Alquiler.findByPk(req.params.id,{
      include: [{
        model: Products,
      }]
    });
    if(!alq){
      return res.status(404).json({msg:'Alquiler no encontrado'});
    }
    fechaFinal= new Date(alq.fechaFin)
    fechaInicial=new Date(alq.fechaInicio)
    let productos = alq.Products;
    //transformamos productos en un array que solo tenga los id de los productos 
      productos = productos.map((producto) => producto.id);
      console.log(productos)
      // Verificar si existe un alquiler en las fechas dadas
      let alquilerExistente = await Alquiler.findOne({
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                //si las fechas de fin  o de inicio solicitadas estan entre fechas de inicio y fin ya guardadas, no se puede alquilar
                {
                  fechaInicio: {
                    [Op.between]: [fechaInicial, fechaFinal],
                  },
                },
                {
                  fechaFin: {
                    [Op.between]: [fechaInicial, fechaFinal],
                  },
                },
              ],
            },
            {
              estado: "aprobado",
            },
          ],
        },
        include: [
          {
            model: Products,
            where: {
              id:{[Op.in]:productos} 
            },
            required: true,
          },
        ],
      });
      if (alquilerExistente) {
        console.log(alquilerExistente)
        return res.status(200).json({
          message:
            "El producto con id " +
            alquilerExistente.Products[0].id +
            " ya esta alquilado entre esas fechas, el alquiler debe ser rechazado",
          estado: 0,
        });
      }
    
    return res
      .status(201)
      .json({ message: "El alquiler puede ser aprobado", estado: 1 });
  } catch (error) {
    console.log(error);

    return res.status(400).json({ error: error.message });
  }
};

/**
 * @method POST
 * @name crearAlquiler
 * @body {fechaInicio, fechaFin, [productos](ids de productos a alquilar)}
 * @description metodo para pedir alquiler (se crea atuomaticamente con esado en revision)
 */
alquilercontroller.crearAlquiler = async (req, res) => {
  try {
    const productos = req.body.productos;
    const alq = await Alquiler.create(req.body);
    for (let i = 0; i < productos.length; i++) {
      let p = await Products.findByPk(productos[i].id);
      if (!p) {
        return res.status(404).json({
          message: "Producto con id " + productos[i] + " no encontrado",
        });
      }
      await alq.addProducts(p);
      console.log("producto agregado",p)
    }
    return res.status(201).json({ msg: "Alquiler enviado a revision", alquiler: alq });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @method GET
 * @name alquileres
 * @body
 * @description metodo para obtener todos los alquileres acutales
 */

alquilercontroller.alquileres = async (req, res) => {
  try {
    const alquileres = await Alquiler.findAll({
      include: [
        {
          model: Products,
        },
      ],
    });
    return res.status(200).json(alquileres);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * @method GET
 * @name alquileresById
 * @param {id} id del producto que queremos saber los alquileres
 * @description metodo para obtener futuros los alquileres de un producto
 */

alquilercontroller.alquileresById = async (req, res) => {
  try {
    const alquileres = await Alquiler.findAll({
      include: [
        {
          model: Products,
          where: {
            id: req.params.id,
          },
        },
      ],
    });
    return res.status(200).json(alquileres);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * @method GET
 * @name alquilerespedidos
 * @param {id} id del usuario que pidio los alquileres
 * @description metodo para obtenr los alquileres que fueron solicitado por un usario
 */

alquilercontroller.alquilerespedidos = async (req, res) => {
  try {
    const alquileres = await Alquiler.findAll({
      include: [
        {
          model: Products,
        },
      ],
      where: {
        solicitadoPor: req.params.id,
      },
    });
    return res.status(200).json(alquileres);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * @method GET
 * @name alquileresgestionados
 * @param {id} id del usuario que gestiono los alquileres
 * @description metodo para obtener alquileres que fueron gestionado por un usario (tipo 1 o 2)
 */

alquilercontroller.alquileresgestionados = async (req, res) => {
  try {
    const alquileres = await Alquiler.findAll({
      include: [
        {
          model: Products,
        },
      ],
      where: {
        verificadoPor: req.params.id,
      },
    });
    return res.status(200).json(alquileres);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * @method GET
 * @name alquileresRevision
 * @body
 * @description metodo para obtener todos los alquileres en revision
 */

alquilercontroller.alquileresRevision = async (req, res) => {
  try {
    const alquileres = await Alquiler.findAll({
      include: [
        {
          model: User,
          as: "solicitante",
        },
        {
          model: Products,
        },
      ],
      where: {
        estado: "revision",
      },
    });
    res.status(200).json(alquileres);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
/**
 * @method PUT
 * @name EDIT
 * @body { cuerpo del alquiler}
 * @param {id} id del alquiler a editar
 * @description metodo para editar un alquiler
 */
 alquilercontroller.EDIT = async (req, res) => {
  try {
    const alquiler = await Alquiler.findByPk(req.params.id);
    if (!alquiler) {
      return res.status(404).json({ msg: "Alquiler no encontrado" });
    }
    const alq = await alquiler.update(req.body);
    return res.status(200).json({ msg: "Alquiler actualizado correcamente", alquiler: alq});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}




module.exports = alquilercontroller;
