document.addEventListener("DOMContentLoaded", () => {
  setupSidebarToggle();
  setupCityCardsModal();
  setupNatureIcons();
  initializeMap();
});

function setupSidebarToggle() {
  const sidebar = document.getElementById("sidebar");
  const toggleButtons = document.querySelectorAll(".menu-toggle");

  toggleButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });
  });
}

function setupCityCardsModal() {
  const modal = document.getElementById("cityModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");
  const modalLink = document.getElementById("modalLink");
  const closeBtn = modal.querySelector(".close");

  const cityCards = document.querySelectorAll(".city-card");

  cityCards.forEach(card => {
    card.addEventListener("click", () => {
      const cityName = card.querySelector("h3").textContent;
      const cityDescription = card.querySelector("p").textContent;
      const cityUrl = "#"; 

      modalTitle.textContent = cityName;
      modalText.textContent = cityDescription;
      modalLink.href = cityUrl;

      modal.style.display = "block";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
}

function setupNatureIcons() {
  const natureCards = document.querySelectorAll(".nature-card");
  const natureInfo = document.getElementById("natureInfo");

  const infoData = {
    relevo: "O relevo da região é variado, com serras, vales e planícies que formam paisagens únicas.",
    clima: "O clima é tropical, com estações bem definidas e influências locais que afetam a flora e fauna.",
    fauna: "A fauna local é rica, incluindo aves, mamíferos e répteis típicos da caatinga e mata atlântica.",
    flora: "A flora apresenta espécies nativas, incluindo árvores frutíferas, arbustos e plantas medicinais."
  };

  natureCards.forEach(card => {
    card.addEventListener("click", () => {
      const key = card.dataset.info;
      natureInfo.innerHTML = `<p>${infoData[key]}</p>`;
    });
  });
}

function initializeMap() {
  const map = L.map("map").setView([-6.7, -35.7], 9); 

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const municipalities = [
    { name: "Cuité", coords: [-6.58, -35.48] },
    { name: "Jaçanã", coords: [-6.80, -35.60] },
    { name: "Nova Floresta", coords: [-6.80, -35.70] },
    { name: "Picuí", coords: [-6.90, -35.70] },
    { name: "Coronel Ezequiel", coords: [-6.78, -35.58] }
  ];

  municipalities.forEach(city => {
    L.marker(city.coords).addTo(map)
      .bindPopup(`<b>${city.name}</b>`);
  });
}
