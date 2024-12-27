import jwt from "jsonwebtoken";

export const validarJWT = (req, res, next) => {
  const token = req.header("Token");

  if (!token) {
    return res.status(401).json({ error: "No hay token en la petición" });
  }

  try {
    const { id, rol } = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = { id, rol }; // Guardar información del usuario en la petición
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido o expirado" }); 
  }
};
