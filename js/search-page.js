const searchInput = document.querySelector(".search__input");
const searchBtn = document.querySelector(".search__btn");
const plantItems = document.querySelectorAll(".plant__item");
const plantList = document.querySelector(".plant__list");

// Создаем элемент для пустого состояния
const emptyState = document.createElement("div");
emptyState.className = "search-empty";
emptyState.innerHTML = "<p>Подходящих растений нет</p>";
plantList.parentNode.appendChild(emptyState);

function performSearch() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  let foundItems = 0;

  plantItems.forEach((item) => {
    const title = item.querySelector(".plant__title").textContent.toLowerCase();
    const text = item.querySelector(".plant__text").textContent.toLowerCase();

    // Ищем в названии и описании
    if (title.includes(searchTerm) || text.includes(searchTerm)) {
      item.classList.remove("hidden");
      foundItems++;
    } else {
      item.classList.add("hidden");
    }
  });

  // Показываем/скрываем сообщение о пустом результате
  if (foundItems === 0 && searchTerm !== "") {
    emptyState.classList.add("visible");
  } else {
    emptyState.classList.remove("visible");
  }
}

// Обработчики событий
searchBtn.addEventListener("click", performSearch);

searchInput.addEventListener("input", function () {
  if (this.value.trim() === "") {
    // Показываем все элементы при очистке поиска
    plantItems.forEach((item) => item.classList.remove("hidden"));
    emptyState.classList.remove("visible");
  } else {
    performSearch();
  }
});
