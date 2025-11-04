const plantList = document.querySelector(".plant__list");

Object.values(flowersData).forEach((flower) => {
  const listItem = document.createElement("li");
  listItem.className = "plant__item mb-xs";

  const link = document.createElement("a");
  link.href = `./flower.html?flower=${flower.id}`;
  link.className = "plant__item-link";

  const imgBox = document.createElement("div");
  imgBox.className = "plant__img-box";

  const image = document.createElement("img");
  image.src = flower.img;
  image.alt = flower.title;

  imgBox.appendChild(image);

  const content = document.createElement("div");
  content.className = "plant__content";

  const title = document.createElement("p");
  title.className = "plant__title pb-xs";
  title.textContent = flower.title;

  const text = document.createElement("h5");
  text.className = "plant__text";
  text.textContent = flower.name.common;

  content.appendChild(title);
  content.appendChild(text);

  link.appendChild(imgBox);
  link.appendChild(content);
  listItem.appendChild(link);

  plantList.appendChild(listItem);
});
const searchInput = document.querySelector(".search__input");
const searchBtn = document.querySelector(".search__btn");
const plantItems = document.querySelectorAll(".plant__item");

const emptyState = document.createElement("div");
emptyState.className = "plant__empty text-center hidden";
emptyState.innerHTML = "<p>Подходящих растений нет</p>";
plantList.parentNode.appendChild(emptyState);

function performSearch() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  let foundItems = 0;

  plantItems.forEach((item) => {
    const title = item.querySelector(".plant__title").textContent.toLowerCase();
    const text = item.querySelector(".plant__text").textContent.toLowerCase();

    if (title.includes(searchTerm) || text.includes(searchTerm)) {
      item.classList.remove("hidden");
      foundItems++;
    } else {
      item.classList.add("hidden");
    }
  });

  if (foundItems === 0 && searchTerm !== "") {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }
}

searchBtn.addEventListener("click", performSearch);

searchInput.addEventListener("input", function () {
  if (this.value.trim() === "") {
    plantItems.forEach((item) => item.classList.remove("hidden"));
    emptyState.classList.add("hidden");
  } else {
    performSearch();
  }
});