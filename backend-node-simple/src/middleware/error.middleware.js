const errorGlobal = (err, req, res, next) => {
	const statusCode = err.statusCode || err.status || 500;
	const message = err.message || 'Internal Server Error';

	if (err.code) {
		switch (err.code) {
			case '23505':
				statusCode = 409;
				message = 'El registro ya existe en el sistema.';
				break;
			case '23503':
				statusCode = 400;
				message = 'Referencia inválida a un recurso relacionado.';
				break;
			case '23502':
				statusCode = 400;
				message = 'Falta un campo obligatorio requerido por la base de datos.';
				break;
			case '22P02':
				statusCode = 400;
				message = 'Sintaxis o tipo de dato inválido en la consulta.';
				break;
		}
	}

	if (typeof statusCode !== 'number' || statusCode < 400 || statusCode > 599) {
		statusCode = 500;
	}

	const isServerError = statusCode >= 500;
	const status = isServerError ? 'error' : 'fail';

	const response = {
		status,
		statusCode,
		message,
	};

	if (process.env.NODE_ENV === 'development') {
		response.stack = err.stack;
		if (err.code) response.dbErrorCode = err.code;
	}


	if (isServerError) {
		console.error(`[ERROR 5XX] ${req.method} ${req.originalUrl}:`, err);
	}

	res.status(statusCode).json(response);
};

module.exports = { errorGlobal };