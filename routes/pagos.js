import { Router } from "express";
import { check } from "express-validator";
import httpPago from "../controllers/pagos.js";
import helpersPago from "../helpers/pagos.js";
import { validarCampos } from "../middleware/validar-campos.js";

const router = Router();

// Obtener todos los pagos
router.get("/", httpPago.getPagos);

// Obtener un pago por ID
router.get("/:id", [
  check("id", "ID de pago inválido").isMongoId(),
  check("id").custom(helpersPago.validarExistaIdPago),
  validarCampos,
], httpPago.getPagoById);

// Crear un pago
router.post("/agregar", [
  check("idCliente", "El ID del cliente es requerido").notEmpty(),
  check("fecha", "La fecha es requerida").notEmpty(),
  check("valor", "El valor debe ser un número").isNumeric(),
  check("periodo", "El periodo es requerido").notEmpty(),
  check("anio", "El año debe ser un número").isNumeric(),
  validarCampos,
], httpPago.postPago);

// Actualizar un pago
router.put("/actualizar/:id", [
  check("id", "ID de pago inválido").isMongoId(),
  validarCampos,
], httpPago.putPago);

// Activar un pago
router.put("/activar/:id", [
  check("id", "ID de pago inválido").isMongoId(),
  validarCampos,
], httpPago.activarPago);

// Desactivar un pago
router.put("/desactivar/:id", [
  check("id", "ID de pago inválido").isMongoId(),
  validarCampos,
], httpPago.desactivarPago);

export default router;
