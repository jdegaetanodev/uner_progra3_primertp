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

// Test pasar personajes a Archivo
// pasarPersonajesToArchivo();


// PUNTO 2 - Metodos sobre el archivo JSON


// leer el archivo y devolver el array
const leerPersonajes = async () => {
  try {
    const contenido = await fs.readFile('personajes.json', 'utf-8');
    return JSON.parse(contenido);
  } catch (error) {
    console.error('Error al leer el archivo:', error);
  }
};

// guardar el array en el archivo
const guardarPersonajes = async (personajes) => {
  try {
    await fs.writeFile('personajes.json', JSON.stringify(personajes, null, 2));
  } catch (error) {
    console.error('Error al guardar el archivo:', error);
  }
};

// 2.a) Agregar un personaje al final del archivo
const agregarPersonajeAlFinal = async (nuevoPersonaje) => {
  try {
    const personajes = await leerPersonajes();
    personajes.push(nuevoPersonaje); // push agrega al final
    await guardarPersonajes(personajes);
    console.log('Personaje agregado al final:', nuevoPersonaje);
  } catch (error) {
    console.error('Error en agregarPersonajeAlFinal:', error);
  }
};

// 2.b) Agregar 2 personajes al inicio del archivo
const agregarPersonajesAlInicio = async (personaje1, personaje2) => {
  try {
    const personajes = await leerPersonajes();
    personajes.unshift(personaje1, personaje2); // unshift agrega al inicio
    await guardarPersonajes(personajes);
    console.log('Personajes agregados al inicio:', personaje1, personaje2);
  } catch (error) {
    console.error('Error en agregarPersonajesAlInicio:', error);
  }
};

 
// ejemplos


const personajeNuevo = {
  firstName: "Alice",
  lastName: "Hardyng",
  fullName: "Alice Hardyng",
  title: "Reina del Valle",
  family: "House Hardyng",
  image: "alice-hardyng.jpeg"
};

const personajeInicio1 = {
  firstName: "Duncan",
  lastName: "Gryz",
  fullName: "Duncan Gryz",
  title: "Sir Duncan",
  family: "House gryz",
  image: "duncan-gryz.jpeg"
};

const personajeInicio2 = {
  firstName: "Aegon",
  lastName: "Targaryen",
  fullName: "Aegon Targaryen ",
  title: "Aegon el Improbable",
  family: "House Targaryen",
  image: "eron-targaryen.jpeg"
};

agregarPersonajeAlFinal(personajeNuevo);
agregarPersonajesAlInicio(personajeInicio1, personajeInicio2);