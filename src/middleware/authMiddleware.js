import jwt from 'jsonwebtoken';

const verificarToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  console.log("Token recibido:", token);

  if (!token) {
    return res.status(401).json({ error: "Acceso denegado. No se proporcionó un token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Token inválido o expirado." });
  }
};

export default verificarToken;
