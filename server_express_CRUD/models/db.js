const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";

// Conexión
async function conn() {
  const client = await new MongoClient(url, { useUnifiedTopology: true });

  client
    .connect() //Conectar a la BBDD
    .then(() => console.log("Ha funcionado! estamos conectados"))
    .catch((e) => console.log(e));

  return client; // Objeto de conexion a la BBDD
}

const product = {
  getAllProducts: async () => {
    //db.products.find() ---> MONGO
    const client = await conn(); // Espera a abrir conexion
    const result = await client
                            .db("demo")
                            .collection("products")
                            .find()
                            .toArray();
    return result
  },
  getProductById: async (id) => {
    //db.products.find({id}) ---> MONGO
    const client = await conn(); // Espera a abrir conexion
    const result = await client
                            .db("demo")
                            .collection("products")
                            .findOne({id})
                            
    console.log(result);         
    return result
  },

  // Enviar un objeto
  /* 
        {
            title: 'test product',
            price: 13.5,
            description: 'lorem ipsum set',
            image: 'https://i.pravatar.cc',
            category: 'electronic'
        }
    */
  addProduct: async (product) => {
    // db.products.insertOne(product) --> MONGO
    const client = await conn(); // Espera a abrir conexion
    const result = await client
                            .db("demo")
                            .collection("products")
                            .insertOne(product)         
    return result
  },
};

module.exports = product;

/* product
    .addProduct(        {
        title: 'test product',
        price: 13.5,
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic',
        id:100
    })
    .then((data)=>console.log(data))
 */

/* product
    .getAllProducts()
    .then((data)=>console.log(data))
 */

/* product
    .getProductById(2)
    .then((data)=>console.log(data))
  */
