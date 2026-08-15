const { Router } = require('express');
const { InyectDb }  = require('../middleware/inyectDb.middleware');
const { getAll, getById, createAcademia, updateAcademia, deleteAcademia } = require('../controllers/academia.controller'); 

const router = Router();
router.use(InyectDb);

router 
    .route('/academia')
    .get(getAll)
    .post(createAcademia);

router
    .route('/academia/:id')
    .get(getById)
    .put(updateAcademia)
    .delete(deleteAcademia);


module.exports = router;