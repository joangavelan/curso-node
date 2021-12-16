require("colors");

const { guardarDb, leerDB } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
} = require("./helpers/inquirer");
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

    console.log("\n");

    switch (opt) {
      case "1":
        //crear nueva tarea
        const desc = await leerInput("Descripción: ");
        TABLERO.crearTarea(desc);
        break;
      case "2":
        //mostrar lista de tareas
        TABLERO.mostrarListaDeTareas();
        break;
      case "3":
        //mostrar tareas completadas
        TABLERO.mostrarListaDeTareas("Completadas");
        break;
      case "4":
        //mostrar tareas pendientes
        TABLERO.mostrarListaDeTareas("Pendientes");
        break;
      case "5":
        //completado | pendiente
        const ids = await mostrarListadoChecklist(TABLERO.tareas);
        TABLERO.toggleCompletadas(ids)
        break;
      case "6":
        //borrar tarea
        const id = await listadoTareasBorrar(TABLERO.tareas);
        // confirmación para borrar
        if (id !== "0") {
          const confirm = await confirmar(
            "¿Está seguro que desea borrar esta tarea?"
          );
          //si el usuario confirma la acción eliminamos la tarea
          if (confirm) {
            TABLERO.borrarTarea(id);
            console.log("Tarea borrada exitosamente");
          }
        }
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
