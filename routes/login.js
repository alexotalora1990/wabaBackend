import { Router } from "express";
import { check } from "express-validator";
import authController from "../controllers/login.js";
import { validarCampos } from "../middleware/validar-campos.js";
import { validarJWT } from "../middleware/validar-jwt.js";
import { validarRol } from "../middleware/validar-rol.js";

const router = Router();

// Ruta de Login
router.post("/", [
  check("correo", "El correo es obligatorio").isEmail(),
  check("contrasena", "La contraseña es obligatoria").notEmpty(),
  validarCampos,
], authController.login);

// Ruta protegida solo para admin
router.get("/admin", [
  validarJWT,
  validarRol(["admin"]),
], (req, res) => {
  res.json({ mensaje: "Bienvenido Admin" });
});

// Ruta protegida solo para ayudante
router.get("/ayudante", [
  validarJWT,
  validarRol(["admin", "ayudante"]),
], (req, res) => {
  res.json({ mensaje: "Bienvenido Ayudante" });
});

// Ruta protegida para usuario básico
router.get("/usuario", [
  validarJWT,
  validarRol(["admin", "ayudante", "usuario"]),
], (req, res) => {
  res.json({ mensaje: "Bienvenido Usuario" });
});

export default router;
