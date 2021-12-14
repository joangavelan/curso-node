require("colors");

const { guardarDb, leerDB } = require("./helpers/guardarArchivo");
const { inquirerMenu, pausa, leerInput } = require("./helpers/inquirer");
const Tablero = require("./models/tablero");

console.clear();

const main = async () => {
  let opt = "";
  const TABLERO = new Tablero();

  const tareasDB = leerDB();

  if (tareasDB.length > 0) {
    // establecer tareas
    TABLERO.cargarTareasDesdeDB(tareasDB);
  }

  do {
    opt = await inquirerMenu();

    console.log('\n');

    switch (opt) {
      case "1":
        //crear nueva tarea
        const desc = await leerInput("Descripción: ");
        TABLERO.crearTarea(desc);
        break;
      case "2":
        TABLERO.mostrarListaDeTareas();
        break;
      case "3":
        TABLERO.mostrarListaDeTareas('Completadas');
        break;
      case "4":
        TABLERO.mostrarListaDeTareas('Pendientes')
        break;
      case "5":
        break;
      case "6":
        break;
      case "0":
        break;
      default:
        return opt;
    }

    guardarDb(TABLERO.tareas);

    if (opt !== "0") await pausa();
  } while (opt !== "0");
};

main();