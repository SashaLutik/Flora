class FontSizeManager {
  constructor() {
    this.sizeMap = {
      small: {
        small: "0.75rem", // 12px
        base: "0.875rem", // 14px
        medium: "1rem", // 16px
        large: "1.125rem", // 18px
        xl: "1.375rem", // 22px
        xxl: "1.875rem", // 30px
      },
      normal: {
        small: "0.875rem", // 14px
        base: "1rem", // 16px
        medium: "1.125rem", // 18px
        large: "1.25rem", // 20px
        xl: "1.5rem", // 24px
        xxl: "2rem", // 32px
      },
      large: {
        small: "1rem", // 16px
        base: "1.125rem", // 18px
        medium: "1.25rem", // 20px
        large: "1.375rem", // 22px
        xl: "1.625rem", // 26px
        xxl: "2.125rem", // 34px
      },
    };

    this.sizeButtons = document.querySelectorAll(".settings__size-btn");
    this.currentSize = this.getSavedSize() || "normal";
    this.init();
  }

  init() {
    this.setActiveButton();
    this.attachEvents();
    this.applySize(this.currentSize);
  }

  attachEvents() {
    this.sizeButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const size = e.target.id.replace("text-", "");
        this.changeSize(size);
      });
    });
  }

  changeSize(size) {
    this.currentSize = size;
    this.applySize(size);
    this.setActiveButton();
    this.saveSize(size);

    document.dispatchEvent(
      new CustomEvent("fontSizeChanged", {
        detail: { size: size },
      })
    );
  }

  applySize(size) {
    const sizes = this.sizeMap[size];
    const root = document.documentElement;

    Object.keys(sizes).forEach((key) => {
      root.style.setProperty(`--font-size-${key}`, sizes[key]);
    });

    root.style.setProperty("--current-font-size", size);
    root.classList.add(`font-${size}`);
  }

  setActiveButton() {
    this.sizeButtons.forEach((btn) => {
      btn.classList.remove("active");
      if (btn.id === `text-${this.currentSize}`) {
        btn.classList.add("active");
      }
    });
  }

  saveSize(size) {
    localStorage.setItem("font-size", size);
  }

  getSavedSize() {
    return localStorage.getItem("font-size");
  }

  getCurrentSize() {
    return this.currentSize;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.fontSizeManager = new FontSizeManager();
});
