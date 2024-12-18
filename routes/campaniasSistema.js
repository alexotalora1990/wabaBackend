import { Router } from "express";
import { check } from "express-validator";
import httpCampaniasSistema from "../controllers/campaniasSistema.js";
import helpersCampaniasSistema from "../helpers/campaniasSistema.js";
import { validarCampos } from "../middleware/validar-campos.js";

const router = Router();

// Obtener todas las campañas
router.get("/", httpCampaniasSistema.getCampañas);

// Obtener una campaña por ID
router.get("/:id", [
  check("id", "ID de campaña inválido").isMongoId(),
  check("id").custom(helpersCampaniasSistema.validarExistaIdCampania),
  validarCampos,
], httpCampaniasSistema.getCampaniaById);

// Crear una campaña
router.post("/agregar", [
  check("nombre", "El nombre es requerido").notEmpty(),
  check("nombre").custom(helpersCampaniasSistema.validarNombreUnico),
  check("pasos", "Debe contener al menos un paso").isArray({ min: 1 }),
  check("pasos.*.paso", "El campo 'paso' es requerido").notEmpty(),
  check("pasos.*.link", "El campo 'link' es requerido").notEmpty(),
  validarCampos,
], httpCampaniasSistema.postCampania);

// Actualizar una campaña
router.put("/actualizar/:id", [
  check("id", "ID de campaña inválido").isMongoId(),
  check("id").custom(helpersCampaniasSistema.validarExistaIdCampania),
  validarCampos,
], httpCampaniasSistema.putCampania);

// Activar una campaña
router.put("/activar/:id", [
  check("id", "ID de campaña inválido").isMongoId(),
  validarCampos,
], httpCampaniasSistema.activarCampania);

// Desactivar una campaña
router.put("/desactivar/:id", [
  check("id", "ID de campaña inválido").isMongoId(),
  validarCampos,
], httpCampaniasSistema.desactivarCampania);

export default router;
