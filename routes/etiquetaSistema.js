import { Router } from "express";
import { check } from "express-validator";
import httpEtiquetaSistema from "../controllers/etiquetaSistema.js";
import helpersEtiquetaSistema from "../helpers/etiquetaSistema.js";
import { validarCampos } from "../middleware/validar-campos.js";

const router = Router();

// Obtener todas las etiquetas
router.get("/", httpEtiquetaSistema.getEtiquetas);

// Obtener una etiqueta por ID
router.get("/:id", [
  check("id", "ID de etiqueta inválido").isMongoId(),
  check("id").custom(helpersEtiquetaSistema.validarExistaIdEtiqueta),
  validarCampos,
], httpEtiquetaSistema.getEtiquetaById);

// Crear una nueva etiqueta
router.post("/agregar", [
  check("nombre", "El nombre es requerido").notEmpty(),
  check("nombre").custom(helpersEtiquetaSistema.validarNombreUnico),
  validarCampos,
], httpEtiquetaSistema.postEtiqueta);

// Actualizar una etiqueta
router.put("/actualizar/:id", [
  check("id", "ID de etiqueta inválido").isMongoId(),
  check("id").custom(helpersEtiquetaSistema.validarExistaIdEtiqueta),
  check("nombre", "El nombre debe tener al menos 3 caracteres").optional().isLength({ min: 3 }),
  validarCampos,
], httpEtiquetaSistema.putEtiqueta);

// Activar una etiqueta
router.put("/activar/:id", [
  check("id", "ID de etiqueta inválido").isMongoId(),
  check("id").custom(helpersEtiquetaSistema.validarExistaIdEtiqueta),
  validarCampos,
], httpEtiquetaSistema.activarEtiqueta);

// Desactivar una etiqueta
router.put("/desactivar/:id", [
  check("id", "ID de etiqueta inválido").isMongoId(),
  check("id").custom(helpersEtiquetaSistema.validarExistaIdEtiqueta),
  validarCampos,
], httpEtiquetaSistema.desactivarEtiqueta);

export default router;
