const fs = require("fs/promises");

// PUNTO 1 - Obtención de datos de la API
const getPersonajes = async () => {
  const url = "https://thronesapi.com/api/v2/Characters";
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener los personajes:", error);
  }
};

const pasarPersonajesToArchivo = async () => {
  try {
    const personajes = await getPersonajes();
    await fs.writeFile("personajes.json", JSON.stringify(personajes, null, 2));
    console.log('Punto 1: Archivo "personajes.json" creado.');
  } catch (error) {
    console.error("Error al guardar el archivo base:", error);
  }
};

// PUNTO 2.a y 2.b - Modificación de Arrays
const modificarArrays = async () => {
  try {
    const data = await fs.readFile("personajes.json", "utf-8");
    let personajes = JSON.parse(data);

    // 2.a) Agregar al final
    personajes.push({
      id: 100,
      fullName: "Personaje Final",
      title: "The Last One",
    });
    // 2.b) Agregar al inicio
    personajes.unshift({
      id: 101,
      fullName: "Personaje Inicial",
      title: "The First One",
    });

    await fs.writeFile("personajes.json", JSON.stringify(personajes, null, 2));
    console.log("Punto 2.a y 2.b: Array modificado con éxito.");
  } catch (error) {
    console.error("Error en modificaciones de array:", error);
  }
};

// PUNTO 2.c y 2.d - Eliminación y Simplificación
const eliminarYFiltrar = async () => {
  try {
    const data = await fs.readFile("personajes.json", "utf-8");
    let personajes = JSON.parse(data);

    // 2.c) Eliminar el primero
    const eliminado = personajes.shift();
    console.log("--- Punto 2.C: Personaje Eliminado ---");
    console.log(`Eliminado: ${eliminado.fullName} (ID: ${eliminado.id})`);

    await fs.writeFile("personajes.json", JSON.stringify(personajes, null, 2));

    // 2.d) Crear archivo con solo ID y Nombres
    const simplificados = personajes.map((p) => ({
      id: p.id,
      nombre: p.fullName,
    }));

    await fs.writeFile(
      "personajes_filtrados.json",
      JSON.stringify(simplificados, null, 2),
    );
    console.log("Punto 2.D: Archivo 'personajes_filtrados.json' creado.");
  } catch (error) {
    console.error("Error en eliminación/filtrado:", error);
  }
};

// PUNTO 2.e - Orden y Salida de Datos
const ordenarYMostrarPersonajes = async () => {
  try {
    const data = await fs.readFile("personajes_filtrados.json", "utf-8");
    let personajes = JSON.parse(data);

    // sort() con lógica decreciente (Z-A) como se pide en la consigna
    personajes.sort((a, b) => {
      if (a.nombre < b.nombre) return 1;
      if (a.nombre > b.nombre) return -1;
      return 0;
    });

    console.log("\n--- Punto 2.E: Listado Ordenado Decrecientemente (Z-A) ---");
    console.table(personajes);
  } catch (error) {
    console.error("Error al ejecutar el punto 2.E:", error);
  }
};

const ejecutarTodoElTP = async () => {
  console.log("Iniciando TP 1...\n");

  await pasarPersonajesToArchivo(); // Paso 1
  await modificarArrays(); // Paso 2.a y 2.b
  await eliminarYFiltrar(); // Paso 2.c y 2.d
  await ordenarYMostrarPersonajes(); // Tu Paso 2.e

  console.log("\nTP 1 Finalizado.");
};

ejecutarTodoElTP();