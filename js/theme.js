const ThemeManager = {
  themes: ["light_theme", "peach_theme", "spring_theme", "dark_theme"],

  init() {
    this.applySavedTheme();
    this.bindEvents();
  },

  applySavedTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && this.themes.includes(savedTheme)) {
      this.applyTheme(savedTheme);
    }
  },

  applyTheme(theme) {
    if (this.themes.includes(theme)) {
      const currentSize = SizeManager.getCurrentSize();
      document.body.className = `${theme} ${currentSize}`;
      localStorage.setItem("theme", theme);
    }
  },

  bindEvents() {
    document.addEventListener("click", (event) => {
      const themeItem = event.target.closest(".theme__item");
      if (themeItem) {
        const theme = themeItem.id;
        if (this.themes.includes(theme)) {
          this.applyTheme(theme);
        }
      }
    });
  },

  getCurrentTheme() {
    return document.body.className.split(" ")[0];
  },
};

const SizeManager = {
  sizes: ["text-small", "text-normal", "text-large"],

  init() {
    this.applySavedSize();
    this.bindEvents();
  },

  applySavedSize() {
    const savedSize = localStorage.getItem("size");
    if (savedSize && this.sizes.includes(savedSize)) {
      this.applySize(savedSize);
    } else {
      this.applySize("text-normal"); // Размер по умолчанию
    }
  },

  applySize(size) {
    if (this.sizes.includes(size)) {
      // Сохраняем текущую тему при смене размера
      const currentTheme = ThemeManager.getCurrentTheme();
      document.body.className = `${currentTheme} ${size}`;
      localStorage.setItem("size", size);
    }
    this.updateActiveButtons(size);
  },

  updateActiveButtons(activeSize) {
    const buttons = document.querySelectorAll(".settings__size-btn");
    const activeIndex = this.sizes.indexOf(activeSize);

    buttons.forEach((button, index) => {
      if (index === activeIndex) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  },

  bindEvents() {
    document.addEventListener("click", (event) => {
      const sizeItem = event.target.closest(".settings__size-btn");
      if (sizeItem) {
        const buttons = Array.from(
          document.querySelectorAll(".settings__size-btn")
        );
        const index = buttons.indexOf(sizeItem);
        const sizes = ["text-small", "text-normal", "text-large"];

        if (index !== -1 && sizes[index]) {
          this.applySize(sizes[index]);
        }
      }
    });
  },
  getCurrentSize() {
    const classes = document.body.className.split(" ");
    return classes.find((cls) => this.sizes.includes(cls)) || "text-normal";
  },
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    SizeManager.init();
    ThemeManager.init();
  });
} else {
  SizeManager.init();
  ThemeManager.init();
}

window.ThemeManager = ThemeManager;
window.SizeManager = SizeManager;
