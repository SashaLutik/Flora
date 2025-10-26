const nextBtn = document.querySelector(".flower__btn-more");
const prewBtn = document.getElementById("prewBtn");
const pageFlower = document.querySelector(".flower__page");
const introFlower = document.querySelector(".flower__intro");
const accordionItems = document.querySelectorAll(".accordion__item");
const shareButton = document.getElementById("shareFlower");

nextBtn.addEventListener("click", () => {
  pageFlower.classList.remove("hidden");
  introFlower.classList.add("hidden");
});

prewBtn.addEventListener("click", () => {
  pageFlower.classList.add("hidden");
  introFlower.classList.remove("hidden");
});

accordionItems.forEach((item) => {
  const panel = item.querySelector(".accordion__item-panel");
  const accordionContent = item.querySelector(".accordion__list");
  const accordionBtn = item.querySelector(".accordion__btn");

  panel.addEventListener("click", function () {
    accordionContent.classList.toggle("active");
    accordionBtn.classList.toggle("active");
  });
});

function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function loadFlowerData() {
  const flowerId = getUrlParameter("flower");

  if (!flowerId) {
    console.error("ID цветка не указан в URL");
    return null;
  }

  const flowerData = flowersData[flowerId];

  if (!flowerData) {
    console.error(`Цветок с ID "${flowerId}" не найден`);
    return null;
  }
  return flowerData;
}
// Данные
function populateFlowerPage(flowerData) {
  if (!flowerData) return;

  document.title = `${flowerData.title}`;
  /* ===================================== */
  const videoElement = document.querySelector(".flower-video");
  if (videoElement && flowerData.video) {
    videoElement.src = flowerData.video;
  }
  const titleVideo = document.querySelector(".flower__intro-name");
  if (titleVideo) {
    titleVideo.textContent = flowerData.title;
  }
  const descriptionElement = document.querySelector(".flower__intro-desc");
  if (descriptionElement) {
    descriptionElement.textContent = flowerData.description;
  }
  /* ===================================== */
  const header = document.querySelector(".header");
  if (header) {
    header.style.backgroundImage = `url('${flowerData.backgroundImage}')`;
  }
  const titleElement = document.querySelector(".flower__name");
  if (titleElement) {
    titleElement.textContent = flowerData.title;
  }
  const scientificElement = document.getElementById("scientific");
  if (scientificElement) {
    scientificElement.textContent = flowerData.name.scientific;
  }
  const commonElement = document.getElementById("common");
  if (commonElement) {
    commonElement.textContent = flowerData.name.common;
  }
  /* ===================================== */
  const cultivElement = document.querySelector(".care-cultiv");
  if (cultivElement) {
    cultivElement.textContent = flowerData.care.cultiv;
  }
  const wateringElement = document.querySelector(".care-watering");
  if (wateringElement) {
    wateringElement.textContent = flowerData.care.watering;
  }
  const lightElement = document.querySelector(".care-light");
  if (lightElement) {
    lightElement.textContent = flowerData.care.light;
  }
  /* ===================================== */
  const commonEl = document.querySelector(".info-common");
  if (commonEl) {
    commonEl.textContent = flowerData.name.common;
  }
  const typeElement = document.querySelector(".info-type");
  if (typeElement) {
    typeElement.textContent = flowerData.info.type;
  }

  const sizeElement = document.querySelector(".info-size");
  if (sizeElement) {
    sizeElement.textContent = flowerData.info.size;
  }

  const periodElement = document.querySelector(".info-period");
  if (periodElement) {
    periodElement.textContent = flowerData.info.period;
  }

  const colorsElement = document.querySelector(".info-colors");
  if (colorsElement) {
    colorsElement.textContent = flowerData.info.colors;
  }

  const areaElement = document.querySelector(".info-area");
  if (areaElement) {
    areaElement.textContent = flowerData.info.area;
  }
  /* ===================================== */
  const detailImageElement = document.querySelector(".accordion-image");
  if (detailImageElement && flowerData.accordion.image) {
    detailImageElement.src = flowerData.accordion.image;
  }
  const lightDetailElement = document.querySelector(".accordion-light");
  if (lightDetailElement) {
    lightDetailElement.textContent = flowerData.accordion.light;
  }

  const wateringDetailElement = document.querySelector(".accordion-watering");
  if (wateringDetailElement) {
    wateringDetailElement.textContent = flowerData.accordion.watering;
  }

  const soilElement = document.querySelector(".accordion-soil");
  if (soilElement) {
    soilElement.textContent = flowerData.accordion.soil;
  }

  const cultivDetailElement = document.querySelector(".accordion-cultiv");
  if (cultivDetailElement) {
    cultivDetailElement.textContent = flowerData.accordion.cultiv;
  }

  const fertilizerElement = document.querySelector(".accordion-fertilizer");
  if (fertilizerElement) {
    fertilizerElement.textContent = flowerData.accordion.fertilizer;
  }

  const pestElement = document.querySelector(".accordion-pest");
  if (pestElement) {
    pestElement.textContent = flowerData.accordion.pest;
  }

  const varietiesElement = document.querySelector(".accordion-varieties");
  if (varietiesElement) {
    varietiesElement.textContent = flowerData.accordion.varieties;
  }
}

function shareApp(flowerData) {
  const shareData = {
    title: `${flowerData.title}`,
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

document.addEventListener("DOMContentLoaded", function () {
  const flowerData = loadFlowerData();
  populateFlowerPage(flowerData);

  if (shareButton) {
    shareButton.addEventListener("click", function () {
      shareApp(flowerData);
    });
  }
});