const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opt",
    message: "¿Qué desea hacer?",
    choices: [
      { value: "1", name: "1. Crear tarea" },
      { value: "2", name: "2. Listar tareas" },
      { value: "3", name: "3. Listar tareas completadas" },
      { value: "4", name: "4. Listar tareas pendientes" },
      { value: "5", name: "5. Completar tarea(s)" },
      { value: "6", name: "6. Borrar tarea" },
      { value: "0", name: "0. Salir" },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("=========================".green);
  console.log("  Seleccione una opción".green);
  console.log("=========================\n".green);

  const { opt } = await inquirer.prompt(preguntas);

  return opt;
};

const pausa = async () => {
  console.log("\n");
  await inquirer.prompt({
    type: "input",
    name: "enter",
    message: `Presione ${"ENTER".green} para continuar`,
  });
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Porfavor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listadoTareasBorrar = async (tareas) => {
  const choices = tareas.map((tarea, index) => {
    return {
      value: tarea.id,
      name: `${index + 1}. ${tarea.desc}`,
    };
  });

  choices.push({
    value: "0",
    name: "0. Salir",
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);

  return id;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);

  return ok;
};

const mostrarListadoChecklist = async (tareas) => {
  const choices = tareas.map((tarea, index) => {
    return {
      value: tarea.id,
      name: `${index + 1}. ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false
    };
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    }, 
  ];

  const { ids } = await inquirer.prompt(pregunta);

  return ids;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist
};
