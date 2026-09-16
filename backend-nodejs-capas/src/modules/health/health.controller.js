const getHealth = (request, response) => {
  response.json({
    status: 'ok',
    time: new Date().toISOString(),
    second: new Date().toLocaleTimeString(),
    uptimeSeconds: Math.floor(process.uptime()),
  });
};

module.exports = { getHealth };
