// theme-manager.js
class ThemeManager {
  constructor() {
    this.themes = [
      { id: "light", name: "Светлая" },
      { id: "peach", name: "Персиковая" },
      { id: "spring", name: "Весенняя" },
      { id: "dark", name: "Темная" },
    ];
    this.currentTheme = this.getSavedTheme() || "light";
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.bindEvents();
    this.updateCurrentThemeDisplay();
  }
  applyTheme(themeId) {
    const root = document.documentElement;
    this.themes.forEach((theme) => {
      root.classList.remove(`${theme.id}-theme`);
    });
    root.classList.add(`${themeId}-theme`);
    this.updateMetaThemeColor(themeId);
  }

  bindEvents() {
    document
      .getElementById("light_theme")
      .addEventListener("click", () => this.setTheme("light"));
    document
      .getElementById("peach_theme")
      .addEventListener("click", () => this.setTheme("peach"));
    document
      .getElementById("spring_theme")
      .addEventListener("click", () => this.setTheme("spring"));
    document
      .getElementById("dark_theme")
      .addEventListener("click", () => this.setTheme("dark"));
  }

  setTheme(themeId) {
    if (this.themes.some((theme) => theme.id === themeId)) {
      this.currentTheme = themeId;
      this.applyTheme(themeId);
      this.saveTheme(themeId);
      this.updateCurrentThemeDisplay();
    }
  }

  updateMetaThemeColor(themeId) {
    const theme = this.themes.find((t) => t.id === themeId);
    if (!theme) return;

    const bgColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--col_bg")
      .trim();

    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.name = "theme-color";
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.content = bgColor;
  }

  updateCurrentThemeDisplay() {
    const currentThemeElement = document.getElementById("currentTheme");
    if (currentThemeElement) {
      const theme = this.themes.find((t) => t.id === this.currentTheme);
      currentThemeElement.textContent = theme ? theme.name : "Светлая";
    }
  }

  getSavedTheme() {
    return localStorage.getItem("selectedTheme");
  }

  saveTheme(themeId) {
    localStorage.setItem("selectedTheme", themeId);
  }
}

// Инициализация
document.addEventListener("DOMContentLoaded", function () {
  new ThemeManager().init();
});