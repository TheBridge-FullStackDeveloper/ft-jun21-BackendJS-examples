const router = require('express').Router();
const products = require('../controllers/products')

//Endpoints
//GET
router.get('/products/:id?', products.getProducts)
// POST
router.post('/products',products.createProduct)
// PUT

// DELETE
// para el alumno...

module.exports = router