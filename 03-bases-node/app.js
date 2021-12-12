const { crearArchivo } = require("./helpers/multiplicar");
const argv = require("./config/yargs");
const colors = require("colors");

console.clear();

// EXEC
crearArchivo(argv.b, argv.h, argv.l)
  .then((nombre) => console.log(colors.green(nombre, "creada")))
  .catch((err) => console.log(colors.red(err)));
