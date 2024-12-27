export const validarRol = (rolesPermitidos) => {
  return (req, res, next) => {
    try {
      const { rol } = req.usuario; // `req.usuario` se establece en el middleware de validarJWT

      if (!rolesPermitidos.includes(rol)) {
        return res.status(403).json({ error: "No tienes permisos para acceder a esta ruta" });
      }

      next(); // Continúa si el rol es válido
    } catch (error) {
      return res.status(500).json({ error: "Error al verificar el rol" });
    }
  };
};
