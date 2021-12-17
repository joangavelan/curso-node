const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");
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
        //mostrar mensaje
        const lugar = await leerInput("Ciudad: ");
        await busquedas.locacion(lugar);
        //buscar el lugar

        //seleccionar el lugar

        //clima

        //mostrar resultados
        // console.log('\nInformación de la ciudad\n'.green);
        // console.log('Ciudad', );
        // console.log('Lat', );
        // console.log('Lng', );
        // console.log('Temperatura', '');
        // console.log('Mínima', '');
        // console.log('Máxima', '');
        break;
      case 2:
        break;
    }

    if (opt !== 0) await pausa();
    //////////////////
  } while (opt !== 0);
};

main();
