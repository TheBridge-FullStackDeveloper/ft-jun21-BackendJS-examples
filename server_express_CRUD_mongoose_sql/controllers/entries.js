const Entry = require("../models/entries");

/**
 * Rutas a utilizar 
 * @author Alejandro Reyes <alejandroreyespage.com> 
 * @exports entries 
 * @namespace entries 
 */


const entries = {
    /**
  * Función getEntries
  * @memberof entries 
  * @method getEntries 
  * @async 
  * @param {Object} req - Solicitud http 
  * @param {Object} res - Respuesta http 
  * @return {json} - Los datos de entrada la base de datos 
  * @throws {error} - Cuando no se obtienen datos o hubo algún problema de conexión 
  */
  getEntries: async (req, res) => {
    let entries;
    console.log(req.query.email)
    try {

    req.query.email
    ? (entries = await Entry.getEntriesByAuthor(req.query.email))
    : (entries = await Entry.getAllEntries()); 

      res.status(200).json({ entries });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  createEntry: async (req, res) => {
    let data = req.body; // entry a guardar --> data + email

    try {
      const num = await Entry.addEntry(data)
      res.status(201).json({message:"entradas añadidas:"+num});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = entries;
