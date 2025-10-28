const container = document.getElementById("champions-container");
const searchInput = document.getElementById("search");

async function loadChampions() {
  try {
    const versionRes = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
    const versions = await versionRes.json();
    const latest = versions[0];

    const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${latest}/data/en_US/champion.json`);
    const data = await res.json();
    const champions = Object.values(data.data);
    displayChampions(champions);

    searchInput.addEventListener("input", () => {
      const term = searchInput.value.toLowerCase();
      const filtered = champions.filter(ch => ch.name.toLowerCase().includes(term));
      displayChampions(filtered);
    });
  } catch (error) {
    container.innerHTML = "<p>⚠️ Erro ao carregar campeões. Tenta de novo 😭</p>";
  }
}

function displayChampions(champions) {
  container.innerHTML = champions.map(ch => `
    <div class="champion-card">
      <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${ch.id}_0.jpg" alt="${ch.name}">
      <h3>${ch.name}</h3>
      <p>${ch.title}</p>
    </div>
  `).join('');
}

loadChampions();