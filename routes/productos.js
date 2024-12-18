import { Router } from "express";
import { check } from "express-validator";
import httpProducto from "../controllers/productos.js";
import helpersProducto from "../helpers/productos.js";
import { validarCampos } from "../middleware/validar-campos.js";

const router = Router();

// Obtener todos los productos
router.get("/", httpProducto.getProductos);

// Obtener un producto por ID
router.get("/:id", [
  check("id", "ID de producto inválido").isMongoId(),
  check("id").custom(helpersProducto.validarExistaIdProducto),
  validarCampos,
], httpProducto.getProductoById);

// Crear un producto
router.post("/agregar", [
  check("codigo", "El código es requerido").notEmpty(),
  check("codigo").custom(helpersProducto.validarCodigoUnico),
  check("nombre", "El nombre es requerido").notEmpty(),
  validarCampos,
], httpProducto.postProducto);

// Actualizar un producto
router.put("/actualizar/:id", [
  check("id", "ID de producto inválido").isMongoId(),
  validarCampos,
], httpProducto.putProducto);

// Activar un producto
router.put("/activar/:id", [
  check("id", "ID de producto inválido").isMongoId(),
  validarCampos,
], httpProducto.activarProducto);

// Desactivar un producto
router.put("/desactivar/:id", [
  check("id", "ID de producto inválido").isMongoId(),
  validarCampos,
], httpProducto.desactivarProducto);

export default router;
