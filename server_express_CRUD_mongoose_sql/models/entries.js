const {Pool} = require('pg');

const pool = require('../utils/dbpg');

const entries = {
  // READ
  getAllEntries: async () => {
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const query = `
                        SELECT entries.title, entries.content,entries.category,entries.date,authors.email,authors.name,authors.image 
                        FROM entries 
                        INNER JOIN authors 
                        ON entries.id_author = authors.id_author`;
        result = await client.query(query)
    }
    catch(e){
        console.log(e);
        throw e;
    }
    finally{
        client.release();
    }
    return result.rows
  },
  // READ
  getEntriesByAuthor: async (email) => {
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const sql_query = ` SELECT e.title, e.content,e.category,e.date,a.email,a.name,a.image
                        FROM entries AS e
                        INNER JOIN authors AS a 
                        ON e.id_author = a.id_author 
                        WHERE a.id_author = (SELECT id_author FROM authors WHERE email=$1)
                        ORDER BY e.date ASC `
        result = await client.query(sql_query,[email])
    }
    catch(e){
        console.log(e);
        throw e;
    }
    finally{
        client.release();
    }
    return result.rows
  },
  // CREATE
  addEntry: async (entry) => {
    let client,result;
    const {title,content,category,email} = entry;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const sql_query = ` INSERT INTO entries(title,content,id_author,category) 
        VALUES ($1,$2,(SELECT id_author FROM authors WHERE email=$4),$3) `
        result = await client.query(sql_query,[title,content,category,email])
    }
    catch(e){
        console.log(e);
        throw e;
    }
    finally{
        client.release();
    }
    return result.rowCount
  },

  //UPDATE
  //....

  //DELETE
  //....
};

module.exports = entries;

// Llamar a las funciones
//entries.getAllEntries().then((data)=>console.log(data))
//entries.getEntriesByAuthor("alejandro@thebridgeschool.es").then((data)=>console.log(data))
/*
let objeto =   {
    "title":"Un maravilloso día en The Bridge 2 - el regreso",
    "content":"Intentando arracar la API con postgreSQL",
    "category":"ficción",
    "email":"alejandro@thebridgeschool.es"
}
entries.addEntry(objeto).then((data)=>console.log(data))

*/