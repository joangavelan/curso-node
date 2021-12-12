const fs = require("fs");

const crearArchivo = async (base, limite, listar) => {
  try {
    let tabla = "";

    for (let i = 1; i <= limite; i++) {
      tabla += `${base} x ${i} = ${base * i}\n`;
    }

    if (listar) {
      console.log("=====================");
      console.log(`    Tabla del ${base}   `);
      console.log("=====================");
      console.log(tabla);
    }

    fs.writeFileSync(`./tablas/tabla-${base}.txt`, tabla);

    return `tabla-${base}.txt`;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  crearArchivo,
};
