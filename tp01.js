// Obtener todos los Personajes - No los muestra
const getPersonajes = async () => {

    const url = 'https://thronesapi.com/api/v2/Characters';

    try {
      const response = await fetch(url);

      // Verificamos si la respuesta fue correcta
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`); // Si es distinto a 200
      }

      // Pasamos la respuesta a formato json
      const data = await response.json();
      // Devolver los datos
      return data;

    } catch (error) { // Ocurrió un error, lo captura y lo muestra
      console.error('Error al obtener los personajes:', error);
    }
};

// Mostrar todos los Personajes
const mostrarPersonajes = async () => {

  // Esta función espera a que getPersonajes obtenga el listado

  const personajes = await getPersonajes();   
  console.log("Estos son los personajes obtenidos:", personajes);
};

// Crear un nuevo personaje
const nuevoPersonaje = async (miPersonaje) => {

    const url = 'https://thronesapi.com/api/v2/Characters';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(miPersonaje)
      });

      if (!response.ok) {
        throw new Error(`Error al crear un nuevo personaje (simulado): ${response.status}`);
      } 
      else {
        console.log('¡Personaje enviado con éxito al servidor!');  
      }
    } catch (error) {
      console.error('Error en al crear el personaje:', error);
    }
};

// Ejemplo de objeto para enviar
const miPersonaje = {
  firstName: "Juan",
  lastName: "Perez",
  fullName: "Juan Perez",
  title: "Usuario de pruebas",
  family: "Test House",
  image: "juan-perez.jpeg"
};

nuevoPersonaje(miPersonaje);

// Buscar un personaje por ID
const getPersonajeById = async (id) => {

  const url = `https://thronesapi.com/api/v2/Characters/${id}`;

  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error("El personaje no fue encontrado, verifique el ID ingresado");

    const data = await response.json();
    console.log(`Personaje ${id}:`, data.fullName);
    return data;

  } catch (error) {

    console.error('Error en al buscar el personaje por ID:', error);
  }
};

// Ejemplo: Buscar un personaje por el ID
// getPersonajeById(5);

// Guardar el resultado en un json
const fs = require('fs/promises'); // Importamos el módulo de sistema de archivos

const pasarPersonajesToArchivo = async () => {

    const url = 'https://thronesapi.com/api/v2/Characters';

    try {
      // Pedir los datos a la ur
      const response = await fetch(url);
      const data = await response.json();

      // Pasaro a Json
      const dataString = JSON.stringify(data, null, 2);

      // Escribirlo en disco con writeFie
      await fs.writeFile('personajes.json', dataString);
      
      console.log('Archivo "personajes.json" creado con éxito.');
    } catch (error) {
      console.error('Error al guardar los personajes en el archivo:', error);
    }
};
// 2.c) Eliminar el primer personaje, mostrar en consola el elemento eliminado.
const eliminarPrimerPersonaje = async () => {
    try {
        const data = await fs.readFile('personajes.json', 'utf-8');
        let personajes = JSON.parse(data);

        const personajeEliminado = personajes.shift();

        console.log("--- Punto 2.C: Personaje Eliminado ---");
        console.log(personajeEliminado);

        await fs.writeFile('personajes.json', JSON.stringify(personajes, null, 2));
    } catch (error) {
        console.error("Error al ejecutar el punto 2.C:", error);
    }
};

// 2.d) Crear un nuevo archivo que solo contenga los: id y nombres de los personajes.
const crearArchivoNombresIds = async () => {
    try {
        const data = await fs.readFile('personajes.json', 'utf-8');
        const personajes = JSON.parse(data);

        const personajesSimplificados = personajes.map(personaje => {
            return {
                id: personaje.id,
                nombre: personaje.fullName
            };
        });

        await fs.writeFile('personajes_filtrados.json', JSON.stringify(personajesSimplificados, null, 2));
        
        console.log("--- Punto 2.D: Archivo Creado ---");
        console.log("Se generó correctamente 'personajes_filtrados.json'.");
    } catch (error) {
        console.error("Error al ejecutar el punto 2.D:", error);
    }
};

const ejecutarMisPuntos = async () => {
    await pasarPersonajesToArchivo();
    
    await eliminarPrimerPersonaje();
    await crearArchivoNombresIds();
};

ejecutarMisPuntos();
// Test pasar personajes a Archivo
// pasarPersonajesToArchivo();