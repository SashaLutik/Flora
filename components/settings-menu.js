class MainMenu extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
		<div class="settings__btn-close" id="closeSettings">
       <span class="close__left"></span><span class="close__right"></span>
      </div>
      <div class="container">
        <div class="settings__title">
          <h4>Настройки</h4>
        </div>
        <ul class="settings__list">
          <li class="settings__item">
            <div class="settings__item-content">
              <p>Размер шрифта</p>
            </div>
          </li>
          <li class="settings__item">
            <div class="settings__item-content" id="theme">
              <p>Тема</p>
            </div>
            <ul class="theme__container">
              <li class="theme__item" id="light_theme">
                <p>Светлая</p>
              </li>
              <li class="theme__item" id="peach_theme">
                <p>Персиковая</p>
              </li>
              <li class="theme__item" id="spring_theme">
                <p>Весенняя</p>
              </li>
              <li class="theme__item" id="dark_theme">
                <p>Темная</p>
              </li>
            </ul>
            <div class="overlay hidden"></div>
          </li>
          <li class="settings__item">
            <a href="#" class="settings__item-link">Помощь</a>
          </li>
          <li class="settings__item">
            <a href="#" class="settings__item-link">Поделиться с друзьями</a>
          </li>
        </ul>
      </div>
      <style>
		.settings__btn-close{
			margin: 20px 20px 25px 20px;
			display: flex;
			width: 26px;
			height: 26px;
			flex-direction: column;
			justify-content: center;
		}
		.settings__btn-close span{
			background-color: var(--green);
			width: 26px;
			height: 2px;
			border-radius: 3px;
			display: block;
		}
		.close__left{
			transform: rotate(46deg);
			margin-bottom: -1px;
		}
		.close__right{
			transform: rotate(-46deg);
			margin-bottom: 1px;
		}
		.settings__title{
			color: var(--pink);
			margin-bottom: 30px;
		}
		.settings__item{
			font-size: 20px;
			margin-bottom: 20px;
		}
		.settings__item:last-child{
			margin-bottom: 0;
		}

		.theme__container {
			background-color: var(--pink);
			color: var(--white_text);
			border-radius: 20px 20px 0 0;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			padding: 40px 20px 60px;
			z-index: 2;
			transform: translateY(100%);
			transition: .3s;
		}
		.theme__item{
			margin-bottom: 20px;
		}
		.theme__item:last-child{
			margin-bottom: 0;
		}
		.overlay{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,0.5);
			z-index: 1;
		}
      </style>
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