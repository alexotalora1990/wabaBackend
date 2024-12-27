import { Router } from "express";
import { check } from "express-validator";
import httpUsuario from "../controllers/usuarios.js";
import helpersUsuario from "../helpers/usuarios.js";
import { validarCampos } from "../middleware/validar-campos.js";
import { validarJWT } from "../middleware/validar-jwt.js";
import { validarRol } from "../middleware/validar-rol.js";

const router = Router();

// Obtener todos los usuarios
router.get("/", [
    validarJWT,
    validarRol(["admin","ayudante"]),
], httpUsuario.getUsuarios);

// Obtener un usuario por ID
router.get("/:id", [
    validarJWT,
    validarRol(["admin","ayudante"]),
    check("id", "ID de usuario inválido").isMongoId(),
    check("id").custom(helpersUsuario.validarExistaIdUsuario),
    validarCampos,
], httpUsuario.getUsuarioById);

// Crear un usuario
router.post("/agregar", [
    validarJWT,
    // validarRol(["admin","ayudante"]),
    check("nombre", "El nombre es requerido").notEmpty(),
    check("correo", "El correo es requerido").notEmpty(),
    check("correo", "Formato de correo inválido").isEmail(),
    check("correo").custom(helpersUsuario.validarCorreoUnico),
    check("contrasena", "La contraseña es requerida").notEmpty(),
    check("telefono", "El teléfono es requerido").notEmpty(),
    check("telefono").custom(helpersUsuario.validarTelefonoUnico),
    check("rol", "El rol es requerido").notEmpty(),
    validarCampos,
], httpUsuario.postUsuario);

// Activar usuario
router.put("/activar/:id", [
    validarJWT,
    validarRol(["admin","ayudante"]),
    check("id", "ID de usuario inválido").isMongoId(),
    check("id").custom(helpersUsuario.validarExistaIdUsuario),
    validarCampos,
], httpUsuario.activarUsuario);

// Desactivar usuario
router.put("/desactivar/:id", [
    validarJWT,
    validarRol(["admin","ayudante"]),
    check("id", "ID de usuario inválido").isMongoId(),
    check("id").custom(helpersUsuario.validarExistaIdUsuario),
    validarCampos,
], httpUsuario.desactivarUsuario);

// Actualizar usuario
router.put("/actualizar/:id", [
    validarJWT,
    validarRol(["admin","ayudante"]),
    check("id", "ID de usuario inválido").isMongoId(),
    check("id").custom(helpersUsuario.validarExistaIdUsuario),
    check("nombre", "El nombre debe tener al menos 3 caracteres").optional().isLength({ min: 3 }),
    check("correo", "El correo debe ser válido").optional().isEmail(),
    check("telefono", "El teléfono es inválido").optional().isLength({ min: 7 }),
    validarCampos,
], httpUsuario.putUsuario);

export default router;
