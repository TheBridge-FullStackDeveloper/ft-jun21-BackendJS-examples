const product = require('../models/db')

const products = {
  getProducts: async (req, res) => {
    // Fetch de productos
    let products;
    req.params.id?
        products = await product.getProductById(Number(req.params.id)): 
        products = await product.getAllProducts() // array objetos

    console.log(products);
    
    res.status(200).json({products});
  },
  createProduct: async (req,res) => {
    let prod = req.body // producto a guardar

    const new_product = await product.addProduct(prod)
    console.log(new_product); // {}

    let products = await product.getAllProducts() // []
    let data = [new_product,{"products_before":products}] // [{new},{products_before}]

    res.status(201).json(data);
  }
};

module.exports = products;
