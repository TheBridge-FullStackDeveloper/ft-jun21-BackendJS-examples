const product = require('../utils/product')

const pages = {
  home: (req, res) => {
    let msj = "Esta es la Home desde PUG!!!"
    let title= "Home"
    res.status(200).render("template",{msj,title});
  },
  about: (req, res) => {
    let msj = "Esto es About desde PUG!!!"
    let title= "About"
    res.status(200).render("template",{msj,title});
  },
  contact: (req, res) => {
    res.status(200).send("Esto es contact");
  },
  location: (req, res) => {
    res.status(200).send("Esto ess location");
  },
  pictures: (req, res) => {
    console.log(req.params);
    let msj = "Esto es pictures"
    msj += req.params.id ? ". ID:" + req.params.id : "";
    let id = req.params.id
    res.status(200).render("pictures",{msj,id});
  }, 
  products: async (req, res) => {
    
    // Fetch de productos
    let products;
    req.params.id?
        products = await product.getProductById(req.params.id): 
        products = await product.getAllProducts() // array objetos

    res.status(200).render("products",{products});
  },
  createProduct: async (req,res) => {

    console.log("*******************");
    let prod = req.body // producto a guardar
    const response = await product.addProduct(prod)
    console.log(response);

    res.status(201).json(response)
  }
};

module.exports = pages;
