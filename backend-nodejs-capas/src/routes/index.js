const express = require('express');
const healthRoutes = require('../modules/health/health.routes');
const userRoutes = require('../modules/users/user.routes');

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/users', userRoutes);

module.exports = router;
