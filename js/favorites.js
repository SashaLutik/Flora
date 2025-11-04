const panelBtn = document.querySelectorAll(".panel__btn");
const contentPage = document.querySelectorAll(".content");

panelBtn.forEach((buttons) => {
  buttons.addEventListener("click", function () {
    const targetPage = this.dataset.targetId;
    panelBtn.forEach((btn) => {
      btn.classList.toggle("active", btn === this);
      contentPage.forEach((pages) => {
        pages.classList.toggle("hidden", btn == this);
      });
    });
    contentPage.forEach((page) => {
      page.classList.toggle("hidden", page.id !== targetPage);
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {

  if (window.favoritesManager) {
    window.favoritesManager.renderFavoritesList();

    const panelButtons = document.querySelectorAll(".panel__btn");
    panelButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const targetId = this.getAttribute("data-target-id");

        panelButtons.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        document.querySelectorAll(".content").forEach((content) => {
          content.style.display = "none";
        });

        const targetContent = document.getElementById(targetId);
        if (targetContent) {
          targetContent.style.display = "block";
        }
        if (targetId === "contentPage1") {
          window.favoritesManager.renderFavoritesList();
        }
      });
    });
  }
});