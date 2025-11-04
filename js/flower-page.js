const introPage = document.querySelector(".flower");
const contentPage = document.querySelector(".page");
const prevBtn = document.getElementById("prewBtn");
const nextBtn = document.getElementById("nextBtn");

prevBtn.addEventListener("click", () => {
  contentPage.classList.add("hidden");
  introPage.classList.remove("hidden");
});
nextBtn.addEventListener("click", () => {
  introPage.classList.add("hidden");
  contentPage.classList.remove("hidden");
});

function getUrl(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function loadData() {
  const flowerId = getUrl("flower");
  if (!flowerId) {
    return null;
  }
  const flowerData = flowersData[flowerId];
  if (!flowerData) {
    return null;
  }
  return flowerData;
}

function populatePage(flowersData) {
  if (!flowersData) return;
  document.title = `${flowersData.title}`;

  const introTitle = document.querySelector(".flower__intro-name");
  const introDescription = document.querySelector(".flower__intro-desc");
  const introVideo = document.querySelector(".flower-video");
  if (introTitle) {
    introTitle.textContent = flowersData.title;
  }
  if (introDescription) {
    introDescription.textContent = flowersData.description;
  }
  if (introVideo && flowersData.video) {
    introVideo.src = flowersData.video;
  }
  const bgImage = document.querySelector(".page__header");
  const nameTitle = document.querySelector(".names__title");
  const nameScientific = document.getElementById("scientific");
  const nameCommon = document.getElementById("common");
  if (bgImage) {
    bgImage.style.backgroundImage = `url('${flowersData.backgroundImage}')`;
  }
  if (nameTitle) {
    nameTitle.textContent = flowersData.title;
  }
  if (nameScientific) {
    nameScientific.textContent = flowersData.name.scientific;
  }
  if (nameCommon) {
    nameCommon.textContent = flowersData.name.common;
  }
  const careCultiv = document.querySelector(".care-cultiv");
  const careWatering = document.querySelector(".care-watering");
  const careLight = document.querySelector(".care-light");
  if (careCultiv) {
    careCultiv.textContent = flowersData.care.cultiv;
  }
  if (careWatering) {
    careWatering.textContent = flowersData.care.watering;
  }
  if (careLight) {
    careLight.textContent = flowersData.care.light;
  }
  const infoCommon = document.querySelector(".info-common");
  const infoType = document.querySelector(".info-type");
  const infoSize = document.querySelector(".info-size");
  const infoPeriod = document.querySelector(".info-period");
  const infoColors = document.querySelector(".info-colors");
  const infoArea = document.querySelector(".info-area");
  if (infoCommon) {
    infoCommon.textContent = flowersData.name.common;
  }
  if (infoType) {
    infoType.textContent = flowersData.info.type;
  }
  if (infoSize) {
    infoSize.textContent = flowersData.info.size;
  }
  if (infoPeriod) {
    infoPeriod.textContent = flowersData.info.period;
  }
  if (infoColors) {
    infoColors.textContent = flowersData.info.colors;
  }
  if (infoArea) {
    infoArea.textContent = flowersData.info.area;
  }
  const accImage = document.querySelector(".accordion-image");
  const accLight = document.querySelector(".accordion-light");
  const accWatering = document.querySelector(".accordion-watering");
  const accSoil = document.querySelector(".accordion-soil");
  const accCultiv = document.querySelector(".accordion-cultiv");
  const accFertilizer = document.querySelector(".accordion-fertilizer");
  const accPest = document.querySelector(".accordion-pest");
  const accVarietes = document.querySelector(".accordion-varieties");
  if (accImage && flowersData.accordion.image) {
    accImage.src = flowersData.accordion.image;
  }
  if (accLight) {
    accLight.textContent = flowersData.accordion.light;
  }
  if (accWatering) {
    accWatering.textContent = flowersData.accordion.watering;
  }
  if (accSoil) {
    accSoil.textContent = flowersData.accordion.soil;
  }
  if (accCultiv) {
    accCultiv.textContent = flowersData.accordion.cultiv;
  }
  if (accFertilizer) {
    accFertilizer.textContent = flowersData.accordion.fertilizer;
  }
  if (accPest) {
    accPest.textContent = flowersData.accordion.pest;
  }
  if (accVarietes) {
    accVarietes.textContent = flowersData.accordion.varieties;
  }
}

// ФУНКЦИИ ДЛЯ ИЗБРАННОГО
function initializeFavorites(flowerData) {
  if (!flowerData) return;
  
  const flowerId = getUrl("flower");
  
  // Инициализируем состояние кнопок
  if (window.favoritesManager) {
    window.favoritesManager.updateButtonState(flowerId);
    
    // Добавляем обработчики для кнопок избранного
    const heartBtn = document.getElementById('favoriteBtnHeart');
    const textBtn = document.getElementById('favoriteBtnText');
    
    if (heartBtn) {
      heartBtn.addEventListener('click', function() {
        window.favoritesManager.toggleFavorite(flowerId, flowerData);
      });
    }
    
    if (textBtn) {
      textBtn.addEventListener('click', function() {
        window.favoritesManager.toggleFavorite(flowerId, flowerData);
      });
    }
  }
}

const shereBtn = document.getElementById("shareFlower");

function shareFlower(flowersData) {
  if (!flowersData) return;
  const shareData = {
    title: `${flowersData.title}`,
    text: "Загляните в удивительный мир цветов",
    url: window.location.href,
  };

  if (navigator.share) {
    navigator.share(shareData);
  } else {
    fallbackShare();
  }
}

function fallbackShare() {
  navigator.clipboard.writeText(window.location.href);
}

// ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ
document.addEventListener("DOMContentLoaded", function () {
  const flowerData = loadData();
  populatePage(flowerData);
  
  // Инициализируем избранное
  initializeFavorites(flowerData);
  
  shereBtn.addEventListener("click", function () {
    shareFlower(flowerData);
  });
});

const accordionItems = document.querySelectorAll(".accordion__item");
accordionItems.forEach((item) => {
  const panel = item.querySelector(".accordion__item-panel");
  const accordionContent = item.querySelector(".accordion__list");
  const accordionBtn = item.querySelector(".accordion__item-btn");

  panel.addEventListener("click", function () {
    accordionContent.classList.toggle("active");
    accordionBtn.classList.toggle("active");
  });
});