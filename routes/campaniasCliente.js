import { Router } from "express";
import { check } from "express-validator";
import httpCampaniasCliente from "../controllers/campaniasCliente.js";
import helpersCampaniasCliente from "../helpers/campaniasCliente.js";
import { validarCampos } from "../middleware/validar-campos.js";

const router = Router();

// Obtener todas las campañas
router.get("/", httpCampaniasCliente.getCampanias);

// Obtener una campaña por ID
router.get("/:id", [
  check("id", "ID de campaña inválido").isMongoId(),
  check("id").custom(helpersCampaniasCliente.validarExistaIdCampaniaCliente),
  validarCampos,
], httpCampaniasCliente.getCampaniaById);

// Crear una campaña
router.post("/agregar", [
  check("nombre", "El nombre es requerido").notEmpty(),
  check("nombre").custom(helpersCampaniasCliente.validarNombreUnico),
  check("cliente", "El cliente es requerido").notEmpty(),
  check("pasos", "Debe contener al menos un paso").isArray({ min: 1 }),
  check("pasos.*.paso", "El campo 'paso' es requerido").notEmpty(),
  check("pasos.*.link", "El campo 'link' es requerido").notEmpty(),
  validarCampos,
], httpCampaniasCliente.postCampania);

// Actualizar una campaña
router.put("/actualizar/:id", [
  check("id", "ID de campaña inválido").isMongoId(),
  validarCampos,
], httpCampaniasCliente.putCampania);

// Activar una campaña
router.put("/activar/:id", [
  check("id", "ID de campaña inválido").isMongoId(),
  validarCampos,
], httpCampaniasCliente.activarCampania);

// Desactivar una campaña
router.put("/desactivar/:id", [
  check("id", "ID de campaña inválido").isMongoId(),
  validarCampos,
], httpCampaniasCliente.desactivarCampania);

// Eliminar una campaña
router.delete("/eliminar/:id", [
  check("id", "ID de campaña inválido").isMongoId(),
  validarCampos,
], httpCampaniasCliente.deleteCampania);

export default router;
