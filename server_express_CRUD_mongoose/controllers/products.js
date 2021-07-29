const Product = require("../models/product");

const products = {
  getProducts: async (req, res) => {
    // Fetch de productos
    let products;

    try {
      req.params.id
        ? (products = await Product.find({ id: Number(req.params.id) }))
        : (products = await Product.find()); // array objetos

      console.log(products);

      res.status(200).json({ products });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  createProduct: async (req, res) => {
    let prod = new Product(req.body); // producto a guardar

    try {
      const new_product = await prod.save(); // guardar en BBDD
      console.log(new_product); // {}

      let products = await Product.find(); // []
      let data = [new_product, { products_before: products }]; // [{new},{products_before}]

      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = products;
