//Modulos a utilizar
const http = require("http");
const cowsay = require("cowsay");
// Modulo propio
const calc = require("./modules/calculator");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  const url = req.url;
  console.log("La URL es: " + url);
  
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  if (url === "/") {
        let msj = cowsay.say({
        text: `Cuanto son 2+2????: ${calc.add(2, 2)}`,
        e: "^^",
        T: "w ",
        });
        res.write(msj);
        res.write("hola, otra cosa");
        res.end(); // A lfinal tiene que haber un END

  } else if (url === "/about") {
        res.write(cowsay.say({
            text: `Esto es ABOUT!`,
            e: "^^",
            T: "w ",
            }));
        res.end();
  } else if (url === "/contact") {
        res.write(cowsay.say({
            text: `Esto es CONTACT`,
            e: "^^",
            T: "w ",
            }));
        res.end();
  } else {
        res.write(cowsay.say({
            text: `Oops. Esta ruta no existe`,
            e: "^^",
            T: "w ",
            }));
        res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(
    cowsay.say({
      text: `Servidor de Vaca escuchando en http://${hostname}:${port}/`,
      e: "oO",
      T: "U ",
    })
  );
});
