const router = require('express').Router();
const pages = require('../controllers/pages')

//Endpoints
router.get('/', pages.home)
router.get('/about', pages.about)
router.get('/contact',pages.contact)
router.get('/location', pages.location)
router.get('/pictures/:id?', pages.pictures)
router.get('/products', pages.products)
module.exports = router