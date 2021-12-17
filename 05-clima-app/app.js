const {
  leerInput,
  inquirerMenu,
  pausa,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
require("colors");
require("dotenv").config();

const main = async () => {
  console.clear();

  const busquedas = new Busquedas();
  let opt = "";

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        //obtener el termino de busqueda
        const termino = await leerInput("Locación: ");
        //buscar lugares por termino
        const lugares = await busquedas.locacion(termino);
        //seleccionar el lugar especifico que busca
        const id = await listarLugares(lugares);
        if(id === 0) continue;
        //guardar en db
        const lugarSeleccionado = lugares.find((l) => l.id === id);
        busquedas.agregarHistorial(lugarSeleccionado.nombre)
        //clima
        const clima = await busquedas.climaLugar(lugarSeleccionado.latitud, lugarSeleccionado.longitud);
        //mostrar resultados
        console.log('\nInformación del lugar\n'.green);
        console.log('Ciudad:', lugarSeleccionado.nombre);
        console.log('Latitud:', lugarSeleccionado.latitud);
        console.log('Longitud:', lugarSeleccionado.longitud);
        console.log('Temperatura:', clima.temp);
        console.log('Mínima:', clima.min);
        console.log('Máxima:', clima.max);
        console.log('Descripción:', clima.desc);
        break;
      case 2:
        busquedas.historial.forEach((lugar, index) => {
          console.log(`${index + 1}. ${lugar}`);
        })
        break;
    }

    if (opt !== 0) await pausa();
    //////////////////
  } while (opt !== 0);
};

main();
