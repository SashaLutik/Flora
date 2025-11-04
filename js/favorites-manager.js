class FavoritesManager {
  constructor() {
    this.favoritesKey = "flowerFavorites";
    this.favorites = this.getFavorites();
  }

  getFavorites() {
    try {
      const stored = localStorage.getItem(this.favoritesKey);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Error reading favorites:", e);
      return [];
    }
  }

  saveFavorites() {
    try {
      localStorage.setItem(this.favoritesKey, JSON.stringify(this.favorites));
    } catch (e) {
      console.error("Error saving favorites:", e);
    }
  }

  toggleFavorite(flowerId, flowerData) {
    if (this.isInFavorites(flowerId)) {
      this.removeFromFavorites(flowerId);
    } else {
      this.addToFavorites(flowerId, flowerData);
    }
    this.updateButtonState(flowerId);
  }

  addToFavorites(flowerId, flowerData) {
    if (!flowerId || !flowerData) {
      return;
    }

    if (!this.isInFavorites(flowerId)) {
      this.favorites.push({
        id: flowerId,
        title: flowerData.title || "Unknown",
        img: flowerData.img || "",
        addedAt: new Date().toISOString(),
      });
      this.saveFavorites();
    }
  }

  removeFromFavorites(flowerId) {
    this.favorites = this.favorites.filter((item) => item.id !== flowerId);
    this.saveFavorites();

    this.renderFavoritesList();
  }

  isInFavorites(flowerId) {
    return this.favorites.some((item) => item.id === flowerId);
  }

  updateButtonState(flowerId) {
    const isFavorite = this.isInFavorites(flowerId);

    const heartBtn = document.getElementById("favoriteBtnHeart");
    if (heartBtn) {
      if (isFavorite) {
        heartBtn.classList.add("active");
      } else {
        heartBtn.classList.remove("active");
      }
    }

    const textBtn = document.getElementById("favoriteBtnText");
    if (textBtn) {
      if (isFavorite) {
        textBtn.textContent = "Добавлено в мои растения";
        textBtn.classList.add("active");
      } else {
        textBtn.textContent = "Добавить в мои растения";
        textBtn.classList.remove("active");
      }
    }
  }

  renderFavoritesList() {
    const favoritesList = document.getElementById("favoritesList");
    const emptyState = document.getElementById("emptyState");
    const bottomBtn = document.getElementById("faveBottomBtn");
    if (!favoritesList) {
      return;
    }

    if (this.favorites.length === 0) {
      favoritesList.innerHTML = "";
      if (emptyState) emptyState.style.display = "block";
      bottomBtn.classList.remove("active");
      return;
    }

    if (emptyState) emptyState.style.display = "none";
    bottomBtn.classList.add("active");
    favoritesList.innerHTML = this.favorites
      .map(
        (flower) => `
            <div class="content__list-item mb-md" data-flower-id="${flower.id}">
                <a href="./flower.html?flower=${flower.id}" class="content__list-link">
					<div class="content__list-image">
						<img src="${flower.img}" alt="${flower.title}" loading="lazy">
					
					</div>
					<div class="content__list-info">
						<h4 class="content__list-title">${flower.title}</h4>
					</div>
				</a>
				<div class="content__item-btn">
					<span class="block"></span>
					<span class="block"></span>
					<span class="block"></span>
				</div>
				<div class="content__container-btn hidden">
					<button class="content__list-notif mb-md" data-flower-id="${flower.id}">
						<p>Задать напоминание</p>
					</button>
					<button class="content__list-remove" data-flower-id="${flower.id}">
						<p>Удалить</p>
					</button>
				</div>
            </div>`
      )
      .join("");

    this.attachMenuHandlers();
    this.attachRemoveHandlers();
    this.attachNotificationHandlers();
  }
  attachMenuHandlers() {
    const burgerBtns = document.querySelectorAll(".content__item-btn");
    const menuBtns = document.querySelectorAll(".content__container-btn");
    if (burgerBtns.length === 0) return;
    burgerBtns.forEach((burgerBtn) => {
      burgerBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        const menuBtn = burgerBtn.nextElementSibling;
        const isCurrentlyHidden = menuBtn.classList.contains("hidden");

        menuBtns.forEach((menu) => {
          menu.classList.add("hidden");
        });

        if (isCurrentlyHidden) {
          menuBtn.classList.remove("hidden");
        } else {
          menuBtn.classList.add("hidden");
        }
      });
    });
    document.addEventListener("click", (e) => {
      if (
        !e.target.closest(".content__item-btn") &&
        !e.target.closest(".content__container-btn")
      ) {
        menuBtns.forEach((menu) => {
          menu.classList.add("hidden");
        });
      }
    });
  }
  attachRemoveHandlers() {
    const removeButtons = document.querySelectorAll(".content__list-remove");
    removeButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        const flowerId = button.getAttribute("data-flower-id");

        const menu = button.closest(".content__container-btn");
        if (menu) {
          menu.classList.add("hidden");
        }

        this.removeFromFavorites(flowerId);
      });
    });
  }

  attachNotificationHandlers() {
    const notifButtons = document.querySelectorAll(".content__list-notif");
    if (notifButtons.length === 0) return;
    notifButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        const flowerId = button.getAttribute("data-flower-id");

        const menu = button.closest(".content__container-btn");
        if (menu) {
          menu.classList.add("hidden");
        }

        this.setReminder(flowerId);
      });
    });
  }

  getFavoritesList() {
    return this.favorites;
  }
}

window.favoritesManager = new FavoritesManager();
