// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware para verificar JWT y roles
exports.authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No se proporcionó token' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token no válido' });
    req.user = user;
    next();
  });
};

// Middleware para verificar si el usuario es administrador
exports.verifyAdmin = (req, res, next) => {
  if (req.user.rol !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado' });
  }
  next();
};
