const { verifyToken } = require('../utils/jwt');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'fail',
      statusCode: 401,
      message: 'Acceso no autorizado. Se requiere un token de sesión.',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      status: 'fail',
      statusCode: 403,
      message: 'Token de sesión inválido o expirado.',
    });
  }
};

module.exports = {
  authenticateToken,
};
