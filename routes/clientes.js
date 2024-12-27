import { Router } from "express";
import { check } from "express-validator";
import httpCliente from "../controllers/clientes.js";
import helpersCliente from "../helpers/clientes.js";
import { validarCampos } from "../middleware/validar-campos.js";
import { validarJWT } from "../middleware/validar-jwt.js";
// import { validarRol } from "../middleware/rolesPermisos.js";

const router = Router();

// Obtener todos los clientes
router.get("/", [
    validarJWT,
    
], httpCliente.getClientes);

// Obtener un cliente por ID
router.get("/:id", [
    // validarJWT,
    check("id", "ID de cliente inválido").isMongoId(),
    check("id").custom(helpersCliente.validarExistaIdCliente),
    validarCampos,
], httpCliente.getClienteById);

// Crear un cliente
router.post("/agregar", [
    check("nombre", "El nombre es requerido").notEmpty(),
    check("correo", "El correo es requerido").notEmpty(),
    check("correo", "Formato de correo inválido").isEmail(),
    check("correo").custom(helpersCliente.validarCorreoUnico),
    check("wp", "El número de WhatsApp es requerido").notEmpty(),
    check("wp").custom(helpersCliente.validarWpUnico),
    check("documento", "El documento es requerido").notEmpty(),
    check("documento").custom(helpersCliente.validarDocumentoUnico),
    validarCampos,
], httpCliente.postCliente);

// Activar cliente
router.put("/activar/:id", [
    // validarJWT,
    check("id", "ID de cliente inválido").isMongoId(),
    check("id").custom(helpersCliente.validarExistaIdCliente),
    validarCampos,
], httpCliente.activarCliente);

// Desactivar cliente
router.put("/desactivar/:id", [
    // validarJWT,
    check("id", "ID de cliente inválido").isMongoId(),
    check("id").custom(helpersCliente.validarExistaIdCliente),
    validarCampos,
], httpCliente.desactivarCliente);

// Actualizar cliente
router.put("/actualizar/:id", [
    // validarJWT,
    check("id", "ID de cliente inválido").isMongoId(),
    check("id").custom(helpersCliente.validarExistaIdCliente),
    check("nombre", "El nombre debe tener al menos 3 caracteres").optional().isLength({ min: 3 }),
    check("correo", "El correo debe ser válido").optional().isEmail(),
    check("wp", "El número de WhatsApp es inválido").optional().isLength({ min: 7 }),
    validarCampos,
], httpCliente.putCliente);

export default router;
