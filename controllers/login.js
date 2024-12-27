import Usuario from "../models/usuarios.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authController = {
  login: async (req, res) => {
    try {
      const { correo, contrasena } = req.body;

      // Verificar si el usuario existe
      const usuario = await Usuario.findOne({ correo });
      if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      // Verificar la contraseña
      const validPassword = await bcrypt.compare(contrasena, usuario.contrasena);
      if (!validPassword) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }

      // Generar token
      const token = jwt.sign(
        { id: usuario._id, rol: usuario.rol }, 
        process.env.JWT_SECRET, // Clave secreta
        { expiresIn: "1h" } // Duración del token
      );

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error en el proceso de login" });
    }
  },
};

export default authController;
