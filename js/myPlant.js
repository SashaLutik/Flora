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
