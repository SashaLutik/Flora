class MainMenu extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
		<div class="settings">
      		<div class="settings__btn-close" id="closeSettings">
        		<span class="block"></span>
      		</div>
			<div class="container">
				<div class="settings__title mb-xxl"><h2>Настройки</h2></div>
				<ul class="settings__list">
					<li class="settings__item mb-lg">
						<div class="settings__item-content size">
							<h3>Размер шрифта</h3>
							<div class="settings__size" id="size">
								<span class="settings__size-btn block" id="text-small"></span>
								<span class="settings__size-btn block active" id="text-normal"></span>
								<span class="settings__size-btn block" id="text-large"></span>
							</div>
						</div>
					</li>
					<li class="settings__item mb-lg">
						<div class="settings__item-content" id="theme">
							<h3>Тема</h3>
							<h3 class="theme__current" id="currentTheme">Светлая</h3>
						</div>
						<ul class="theme__container">
							<li class="theme__item mb-lg" id="light_theme"><h3>Светлая</h3></li>
							<li class="theme__item mb-lg" id="peach_theme"><h3>Персиковая</h3></li>
							<li class="theme__item mb-lg" id="spring_theme"><h3>Весенняя</h3></li>
							<li class="theme__item" id="dark_theme"><h3>Темная</h3></li>
						</ul>
						<div class="overlay hidden"></div>
					</li>
					<li class="settings__item mb-lg">
						<a href="#" class="settings__item-link"><h3>Помощь</h3></a>
					</li>
					<li class="settings__item">
						<h3 class="settings__item-link" id="shareButton">Поделиться с друзьями</h3>
					</li>
        		</ul>
			</div>
		</div>
    `;
  }
}

customElements.define("settings-menu", MainMenu);

const settingsBtn = document.getElementById("settingsBtn");
const settings = document.querySelector(".settings__wrapper");
const closeSettings = document.getElementById("closeSettings");
const theme = document.getElementById("theme");
const themeList = document.querySelector(".theme__container");
const body = document.body;
const overlay = document.querySelector(".overlay");

settingsBtn.addEventListener("click", () => {
  settings.style.transform = "translateX(0)";
  settings.style.position = "fixed";
  body.classList.add("no-scroll");
});
closeSettings.addEventListener("click", () => {
  settings.style.transform = "translateX(-100%)";
  body.classList.remove("no-scroll");
});

function openTheme() {
  themeList.style.transform = "translateY(0)";
  overlay.classList.remove("hidden");
}
function closeTheme() {
  themeList.style.transform = "translateY(100%)";
  overlay.classList.add("hidden");
}

theme.addEventListener("click", openTheme);
overlay.addEventListener("click", closeTheme);

const shareButton = document.getElementById("shareButton");

function shareApp() {
  const shareData = {
    title: "Flora",
    text: "Загляните в удивительный мир цветов",
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

shareButton.addEventListener("click", shareApp);
