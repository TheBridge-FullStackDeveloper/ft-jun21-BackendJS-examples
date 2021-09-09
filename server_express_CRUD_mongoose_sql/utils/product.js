const fetch = require('node-fetch')

const product = {
    getAllProducts: async () => {
        const res = await fetch('https://fakestoreapi.com/products')
        const data = await res.json()
        return data
    },
    getProductById: async (id) => {
        const res = await fetch('https://fakestoreapi.com/products/'+id)
        const data = await res.json()
        return [data]
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
        const res = await fetch('https://fakestoreapi.com/products',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'                
            },
            body:JSON.stringify(product)
        })

        const data = await res.json()
        return data
    }
}

module.exports = product

/* product
    .addProduct(        {
        title: 'test product',
        price: 13.5,
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic'
    })
    .then((data)=>console.log(data))
 */

/* product
    .getAllProducts()
    .then((data)=>console.log(data))
 */

/* product
    .getProductById(5)
    .then((data)=>console.log(data))
  */