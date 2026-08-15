const getAll = async (req, res, next) => {
  const page = parseInt(req.query.page, 10);
  const limit = parseInt(req.query.limit, 10);

  const safePage = isNaN(page) || page < 1 ? 1 : page;
  let safeLimit = isNaN(limit) || limit < 1 ? 10 : limit;
  if (safeLimit > 100) safeLimit = 100;

  const offset = (safePage - 1) * safeLimit;

  try {
    const countRes = await req.db.query(
      "SELECT COUNT(*)::int AS count FROM academia",
    );
    const total = Number(countRes.rows[0]?.count || 0);

    if (total === 0) {
      return res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "Consulta realizada pero no se encontraron coincidencias",
        data: [],
        meta: { total: 0, page: safePage, limit: safeLimit, totalPages: 0 },
      });
    }

    const response = await req.db.query(
      "SELECT * FROM academia ORDER BY id DESC LIMIT $1 OFFSET $2",
      [safeLimit, offset],
    );

    return res.status(200).json({
      status: "success",
      statusCode: 200,
      data: response.rows,
      meta: {
        total,
        page: safePage,
        limit: safeLimit,
        totalPages: Math.ceil(total / safeLimit),
      },
    });
  } catch (error) {
    console.error("No se pudieron obtener los datos solicitados", error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const idNum = parseInt(id, 10);

  if (!id || isNaN(idNum) || idNum < 1) {
    return res.status(400).json({
      status: "fail",
      statusCode: 400,
      message: "ID inválido",
    });
  }

  try {
    const response = await req.db.query(
      "SELECT * FROM academia WHERE id = $1",
      [idNum],
    );

    if (response.rows.length === 0) {
      return res.status(404).json({
        status: "fail",
        statusCode: 404,
        message: "No se encontraron coincidencias para el ID solicitado",
      });
    }

    return res.status(200).json({
      status: "success",
      statusCode: 200,
      data: response.rows[0],
    });
  } catch (error) {
    console.error(`Error al encontrar el ID solicitado: ${idNum}`, error);
    next(error);
  }
};

const createAcademia = async (req, res, next) => {
  const { nombre, lema } = req.body;

  try {
    if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
      return res.status(400).json({
        status: "fail",
        statusCode: 400,
        message: 'El campo "nombre" es obligatorio y no puede estar vacío.',
      });
    }

    const nombreLimpio = nombre.trim();
    const lemaLimpio = lema && typeof lema === "string" && lema.trim() !== "" ? lema.trim() : null;

    const existingName = await req.db.query(
      "SELECT id FROM academia WHERE LOWER(nombre) = LOWER($1)",
      [nombreLimpio],
    );

    if (existingName.rows.length > 0) {
      return res.status(409).json({
        status: "fail",
        statusCode: 409,
        message: `Ya existe una academia con el nombre "${nombreLimpio}".`,
      });
    }

    const response = await req.db.query(
      "INSERT INTO academia (nombre, lema) VALUES($1, $2) RETURNING *",
      [nombreLimpio, lemaLimpio],
    );

    return res.status(201).json({
      status: "success",
      statusCode: 201,
      message: "Academia creada exitosamente",
      data: response.rows[0],
    });
  } catch (error) {
    console.error("Error al crear una academia", error);
    next(error);
  }
};

const updateAcademia = async (req, res, next) => {
  const { id } = req.params;
  const idNum = parseInt(id, 10);

  if (!id || isNaN(idNum) || idNum < 1) {
    return res.status(400).json({
      status: "fail",
      statusCode: 400,
      message: "ID inválido",
    });
  }

  const { nombre, lema } = req.body;

  try {
    const checkExists = await req.db.query(
      "SELECT * FROM academia WHERE id = $1",
      [idNum],
    );

    if (checkExists.rows.length === 0) {
      return res.status(404).json({
        status: "fail",
        statusCode: 404,
        message: "No existe la academia a actualizar",
      });
    }

    if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
      return res.status(400).json({
        status: "fail",
        statusCode: 400,
        message: 'El campo "nombre" es obligatorio y no puede estar vacío.',
      });
    }

    const nombreLimpio = nombre.trim();
    const lemaLimpio = lema && typeof lema === "string" && lema.trim() !== "" ? lema.trim() : null;

    const existingName = await req.db.query(
      "SELECT id FROM academia WHERE LOWER(nombre) = LOWER($1) AND id != $2",
      [nombreLimpio, idNum],
    );

    if (existingName.rows.length > 0) {
      return res.status(409).json({
        status: "fail",
        statusCode: 409,
        message: `Ya existe otra academia con el nombre "${nombreLimpio}".`,
      });
    }

    const response = await req.db.query(
      "UPDATE academia SET nombre = $1, lema = $2 WHERE id = $3 RETURNING *",
      [nombreLimpio, lemaLimpio, idNum],
    );

    return res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Academia actualizada exitosamente",
      data: response.rows[0],
    });
  } catch (error) {
    console.error(`Error al editar la academia con el ID: ${idNum}`, error);
    next(error);
  }
};

const deleteAcademia = async (req, res, next) => {
  const { id } = req.params;
  const idNum = parseInt(id, 10);

  if (!id || isNaN(idNum) || idNum < 1) {
    return res.status(400).json({
      status: "fail",
      statusCode: 400,
      message: "ID inválido",
    });
  }

  try {
    const response = await req.db.query(
      "DELETE FROM academia WHERE id = $1 RETURNING *",
      [idNum],
    );

    if (response.rows.length === 0) {
      return res.status(404).json({
        status: "fail",
        statusCode: 404,
        message: "No existe la academia a eliminar",
      });
    }

    return res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Academia eliminada exitosamente",
      data: response.rows[0],
    });
  } catch (error) {
    console.error(`Error al eliminar la academia con el ID: ${idNum}`, error);
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  createAcademia,
  updateAcademia,
  deleteAcademia,
};


