const apiBase = 'https://rpg-creature-api.freecodecamp.rocks/api/creature';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

const creatureName = document.getElementById('creature-name');
const creatureId = document.getElementById('creature-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

async function fetchCreature(query) {
  try {
    const res = await fetch(`${apiBase}/${query.toLowerCase()}`);

    if (!res.ok) {
      throw new Error('Creature not found');
    }

    const data = await res.json();
    console.table(data);

    // Fill in values
    creatureName.textContent = data.name;
    creatureId.textContent = data.id;
    weight.textContent = data.weight;
    height.textContent = data.height;
    types.textContent = '';
    data.types.forEach(t => {
      const span = document.createElement('span');
      span.textContent = t.name.toUpperCase();
      span.style.marginRight = '8px';
      types.appendChild(span);
    });

    // Stats
    hp.textContent = data.stats.find(s => s.name === 'hp').base_stat;
    attack.textContent = data.stats.find(s => s.name === 'attack').base_stat;
    defense.textContent = data.stats.find(s => s.name === 'defense').base_stat;
    specialAttack.textContent = data.stats.find(
      s => s.name === 'special-attack'
    ).base_stat;
    specialDefense.textContent = data.stats.find(
      s => s.name === 'special-defense'
    ).base_stat;
    speed.textContent = data.stats.find(s => s.name === 'speed').base_stat;
  } catch (err) {
    alert(err.message);
    clearResults();
  }
}

function clearResults() {
  creatureName.textContent = '';
  creatureId.textContent = '';
  weight.textContent = '';
  height.textContent = '';
  types.textContent = '';
  hp.textContent = '';
  attack.textContent = '';
  defense.textContent = '';
  specialAttack.textContent = '';
  specialDefense.textContent = '';
  speed.textContent = '';
}

// Event listener
searchButton.addEventListener('click', () => {
  clearResults();
  const query = searchInput.value.trim();
  if (query) {
    fetchCreature(query);
  }
});
