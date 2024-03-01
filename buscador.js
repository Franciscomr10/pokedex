const listaPokemon = document.querySelector("#listaPokemon");
const inputBuscar = document.querySelector("#buscador");
let URL = "https://pokeapi.co/api/v2/pokemon/";

// Crear un array para almacenar las cartas de Pokemon
let cartas = [];

// Recorrer la API para coger los 151 Pokemon
for (let i = 1; i < 152; i++) {
  // Agregar la promesa a la lista de cartas de Pokemon
  cartas.push(fetch(URL + i));
}

// Utilizar Promise.all() para esperar a que todas las cartas de Pokemon se completen
Promise.all(cartas)
  .then((responses) => {
    // Convertir todas las respuestas a json
    return Promise.all(responses.map((response) => response.json()));
  })
  .then((pokes) => {
    // Mostrar los Pokémon
    pokes.forEach((poke) => {
      mostrarPokemon(poke);
    });
  });

// Función para mostrar los Pokémon
function mostrarPokemon(poke) {
  // Método para traducir los tipos
  function traducirTipo(tipo) {
    switch (tipo) {
      case "normal":
        return "normal";
      case "fighting":
        return "lucha";
      case "flying":
        return "volador";
      case "poison":
        return "veneno";
      case "ground":
        return "tierra";
      case "rock":
        return "roca";
      case "bug":
        return "bicho";
      case "ghost":
        return "fantasma";
      case "steel":
        return "acero";
      case "fire":
        return "fuego";
      case "water":
        return "agua";
      case "grass":
        return "planta";
      case "electric":
        return "eléctrico";
      case "psychic":
        return "psíquico";
      case "ice":
        return "hielo";
      case "dragon":
        return "dragón";
      case "dark":
        return "siniestro";
      case "fairy":
        return "hada";
      default:
        return "tipo desconocido";
    }
  }

  // Método para poner los tipos (si hay 1 solo pone 1 y si hay 2 solo pone 2)
  let tipos = poke.types.map((type) => `<p class="${traducirTipo(type.type.name)} tipo">${traducirTipo(type.type.name)}</p>`);
  tipos = tipos.join("");

  let pokeId = poke.id.toString();
  if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  }

  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
      <div class="pokemon-imagen">
          <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
      </div>
      <div class="pokemon-info">
          <div class="nombre-contenedor">
              <p class="pokemon-id">#${pokeId}</p>
              <h2 class="pokemon-nombre">${poke.name}</h2>
          </div>
          <div class="pokemon-tipos">
              ${tipos}
          </div>`;
  listaPokemon.append(div);

  // Agregar el evento de clic a la imagen del Pokémon
  div.querySelector('.pokemon-imagen img').addEventListener('click', () => {
    // Guarda el ID del Pokémon en localStorage
    localStorage.setItem('pokemonId', poke.id);
    // Redirige al usuario a la segunda vista
    window.location.href = 'descripcion/descripcion.html';
  });
}

// Evento click para buscar Pokémon
inputBuscar.addEventListener("keyup", () => {
  const busqueda = inputBuscar.value.toLowerCase();
  const pokemones = document.querySelectorAll(".pokemon");
  let contador = 0;

  pokemones.forEach((pokemon) => {
    const nombrePokemon = pokemon.querySelector(".pokemon-nombre").textContent.toLowerCase();

    if (nombrePokemon.includes(busqueda)) {
      pokemon.style.display = "block";
    } else {
      pokemon.style.display = "none";
      contador++;
    }
  });

  const mensaje = document.getElementById('mensaje');
  if (contador === pokemones.length) {
    mensaje.textContent = "No coincide el nombre con ningún Pokemon";
  } else {
    mensaje.textContent = "";
  }
});


document.getElementById('cambiar-tema').addEventListener('click', function() {
  var body = document.body;
  if (body.classList.contains('light-theme')) {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
  } else {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
  }
});
