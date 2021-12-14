const Tarea = require("./tarea");
require("colors");

class Tablero {
  _tareas = {};

  constructor() {
    this._tareas = {};
  }

  get tareas() {
    const tareas = [];

    Object.keys(this._tareas).forEach((key) => {
      const tarea = this._tareas[key];
      tareas.push(tarea);
    });

    return tareas;
  }

  cargarTareasDesdeDB(tareas) {
    tareas.forEach((tarea) => {
      this._tareas[tarea.id] = tarea;
    });
  }

  crearTarea(desc) {
    const tarea = new Tarea(desc);
    this._tareas[tarea.id] = tarea;
  }

  mostrarListaDeTareas(filtro) {
    let index = 1;
    this.tareas.forEach((tarea) => {
      if (
        !filtro ||
        (filtro === "Completadas" && tarea.completadoEn) ||
        (filtro === "Pendientes" && !tarea.completadoEn)
      ) {
        console.log(
          `${index}. ${tarea.desc} :: ${
            tarea.completadoEn ? "Completada".green : "Pendiente".red
          }`
        );
        index++;
      }
    });
  }
}

module.exports = Tablero;
