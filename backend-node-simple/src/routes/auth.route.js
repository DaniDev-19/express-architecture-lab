const { Router } = require('express');
const { InyectDb } = require('../middleware/inyectDb.middleware');
const { authenticateToken } = require('../middleware/auth.middleware');
const { login, logout, getMe } = require('../controllers/auth.controller');

const router = Router();
router.use(InyectDb);

router.post('/auth/login', login);
router.post('/auth/logout', logout);
router.get('/auth/me', authenticateToken, getMe);

module.exports = router;
