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
      document.body.className = theme;
      localStorage.setItem("theme", theme);
    }
  },

  bindEvents() {
    // Обработчик выбора темы
    document.addEventListener("click", (e) => {
      const themeItem = e.target.closest(".theme__item");
      if (themeItem) {
        const theme = themeItem.id;
        if (this.themes.includes(theme)) {
          this.applyTheme(theme);
        }
      }
    });
  },

  // Публичные методы
  setTheme(theme) {
    if (this.themes.includes(theme)) {
      this.applyTheme(theme);
    }
  },

  getCurrentTheme() {
    return document.body.className;
  },
};

// Автоматическая инициализация
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => ThemeManager.init());
} else {
  ThemeManager.init();
}

window.ThemeManager = ThemeManager;
