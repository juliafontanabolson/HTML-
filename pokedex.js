
const pokemonList = [
  'bulbasaur', 'charmander', 'squirtle', 'pikachu', 'eevee',
  'jigglypuff', 'meowth', 'psyduck', 'snorlax', 'gengar'
];

function createPokemonButtons() {
  const container = document.createElement("div");
  container.id = "pokemonButtons";
  container.style.margin = "20px";
  pokemonList.forEach(pokemon => {
    const button = document.createElement("button");
    button.textContent = pokemon;
    button.onclick = () => loadPokemon(pokemon);
    button.style.margin = "5px";
    container.appendChild(button);
  });
  document.body.appendChild(container);
}

async function loadPokemon(name) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();

    document.getElementById("pokemonName").textContent = data.name;
    document.getElementById("pokemonTypes").textContent = data.types.map(t => t.type.name).join(", ");
    document.getElementById("pokemonHeight").textContent = (data.height / 10).toFixed(1);
    document.getElementById("pokemonWeight").textContent = (data.weight / 10).toFixed(1);
    document.getElementById("pokemonSkills").textContent = data.abilities.map(a => a.ability.name).join(", ");
    document.getElementById("pokemonImage").src = data.sprites.front_default;
  } catch (err) {
    alert("Pokémon não encontrado!");
  }
}

function setupSearchBox() {
  const searchContainer = document.createElement("div");
  searchContainer.id = "searchContainer";
  searchContainer.style.margin = "20px";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Buscar Pokémon";
  input.id = "searchInput";

  const button = document.createElement("button");
  button.textContent = "Buscar";
  button.onclick = () => {
    const value = document.getElementById("searchInput").value.toLowerCase();
    if (value) loadPokemon(value);
  };

  searchContainer.appendChild(input);
  searchContainer.appendChild(button);
  document.body.appendChild(searchContainer);
}

document.addEventListener("DOMContentLoaded", () => {
  createPokemonButtons();
  setupSearchBox();
});
