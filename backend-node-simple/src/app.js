const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { corsOptions } = require('./utils/cors');
const { setupSwagger } = require('./config/swagger');
const { requestLoggerMiddleware, getServerStats, renderStatsHtml } = require('./middleware/serverInfo.middleware');
const academiaRoute = require('./routes/academia.route');
const authRoute = require('./routes/auth.route');
const { errorGlobal } = require('./middleware/error.middleware');

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan('dev'));

app.use(requestLoggerMiddleware);

app.get('/api/server-info', (req, res) => {
  res.json({
    status: 'success',
    statusCode: 200,
    data: getServerStats(),
  });
});


app.use(express.static(path.join(__dirname, '../public'), { index: false }));


setupSwagger(app);

app.use('/api', academiaRoute);
app.use('/api', authRoute);

app.get('/', (req, res) => {
  if (req.accepts('html')) {
    const htmlWithStats = renderStatsHtml(path.join(__dirname, '../public/index.html'));
    return res.send(htmlWithStats);
  }

  res.json({
    message: 'API funcionando correctamente',
    docs: '/docs',
    serverStats: getServerStats(),
  });
});


app.use((req, res, next) => {
  if (req.accepts('html')) {
    return res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
  }

  const err = new Error('Ruta no encontrada');
  err.status = 404;
  next(err);
});

app.use(errorGlobal);

module.exports = app;