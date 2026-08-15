const fs = require('fs');

const formatUptime = (seconds) => {
  const pad = (s) => (s < 10 ? '0' : '') + s;
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hrs > 0 ? hrs + 'h ' : ''}${pad(mins)}m ${pad(secs)}s`;
};

const getMemoryUsage = () => {
  const mem = process.memoryUsage();
  return `${(mem.heapUsed / 1024 / 1024).toFixed(2)} MB / ${(mem.heapTotal / 1024 / 1024).toFixed(2)} MB`;
};

const requestLoggerMiddleware = (req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toLocaleString('es-ES', { timeZoneName: 'short' });

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`\n==================================================`);
    console.log(`📡 [LOG PETICIÓN] ${timestamp}`);
    console.log(`🔹 Método     : ${req.method}`);
    console.log(`🔹 Ruta       : ${req.originalUrl || req.url}`);
    console.log(`🔹 Estado HTTP: ${res.statusCode}`);
    console.log(`🔹 Duración   : ${duration} ms`);
    console.log(`🔹 Client IP  : ${req.ip || req.socket.remoteAddress}`);
    console.log(`🔹 Cabeceras  :`, JSON.stringify({
      'user-agent': req.headers['user-agent'],
      'host': req.headers['host'],
      'accept': req.headers['accept'],
      'authorization': req.headers['authorization'] ? '[PRESENTE]' : '[NINGUNA]',
    }, null, 2));
    console.log(`==================================================\n`);
  });

  next();
};

const getServerStats = () => {
  return {
    uptime: formatUptime(process.uptime()),
    uptimeSeconds: Math.floor(process.uptime()),
    serverTime: new Date().toLocaleString('es-ES'),
    memoryUsage: getMemoryUsage(),
    nodeEnv: process.env.NODE_ENV || 'development',
    nodeVersion: process.version,
    port: process.env.PORT || 4000,
  };
};

const renderStatsHtml = (filePath) => {
  let html = fs.readFileSync(filePath, 'utf8');
  const stats = getServerStats();

  html = html
    .replace(/{{UPTIME}}/g, stats.uptime)
    .replace(/{{SERVER_TIME}}/g, stats.serverTime)
    .replace(/{{MEMORY_USAGE}}/g, stats.memoryUsage)
    .replace(/{{NODE_ENV}}/g, stats.nodeEnv)
    .replace(/{{NODE_VERSION}}/g, stats.nodeVersion)
    .replace(/{{PORT}}/g, stats.port);

  return html;
};

module.exports = {
  requestLoggerMiddleware,
  getServerStats,
  renderStatsHtml,
};
