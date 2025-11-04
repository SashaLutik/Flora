class Calendar {
  constructor() {
    this.currentDate = new Date();
    this.calendarTitle = document.querySelector(".calendar__title");
    this.calendarMain = document.querySelector(".calendar__list-main");
    this.calendarPanel = document.getElementById("calendarPanel");
    this.nextBtn = document.querySelector(".calendar__next");
    this.prevBtn = document.querySelector(".calendar__prev");

    this.notesPanel = document.querySelector(".notes__inner");
    this.notesOverlay = document.querySelector(".notes__overlay");
    this.notesTitle = document.querySelector(".notes__title h3");
    this.notesClose = document.querySelector(".notes__close");
    this.notesAddBtn = document.querySelector(".notes__btn");
    this.notesTextBox = document.querySelector(".notes__text-box");

    this.popup = document.querySelector(".popup");
    this.popupInput = document.querySelector(".popup__input");
    this.popupSaveBtn = document.querySelector(".popup__save-btn");
    this.popupPrev = document.querySelector(".popup__prev");

    this.selectedDate = null;
    this.notes = this.loadNotes();

    this.init();
  }
  init() {
    this.renderCalendar();
    this.bindEvents();
  }
  bindEvents() {
    this.nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.nextMonth();
    });
    this.prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.previousMonth();
    });
    this.notesClose.addEventListener("click", () => {
      this.closeNotesPanel();
    });
    this.notesOverlay.addEventListener("click", () => {
      this.closeNotesPanel();
    });
    this.notesAddBtn.addEventListener("click", () => {
      this.openAddNotePopup();
    });
    this.popupSaveBtn.addEventListener("click", () => {
      this.saveNote();
    });
    this.popupPrev.addEventListener("click", () => {
      this.closePopup();
    });
  }
  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.renderCalendar();
  }
  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.renderCalendar();
  }
  renderCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const shortYear = year.toString().slice(-2);
    this.calendarTitle.textContent = `${this.getMonthName(
      month
    )} ${shortYear}г.`;

    this.calendarMain.innerHTML = "";

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    let firstDayOfWeek = firstDay.getDay();
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    this.calendarMain.style.display = "grid";
    this.calendarMain.style.gridTemplateColumns = "repeat(7, 21px)";
    this.calendarMain.style.gap = "25px 0";
    this.calendarMain.style.justifyContent = "space-between";

    for (let i = 0; i < firstDayOfWeek; i++) {
      const emptyDay = this.createDayElement("", "calendar__day--empty");
      this.calendarMain.appendChild(emptyDay);
    }

    const today = new Date();
    const isCurrentMonth =
      today.getMonth() === month && today.getFullYear() === year;

    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = this.createDayElement(day, "calendar__day--active");
      if (isCurrentMonth && day === today.getDate()) {
        dayElement.classList.add("calendar__day--today");
      }
      const dateKey = this.getDateKey(day, month, year);
      if (this.notes[dateKey]) {
        dayElement.classList.add("calendar__day--has-note");
        const noteIndicator = document.createElement("div");
        noteIndicator.className = "calendar__note-indicator";
        dayElement.appendChild(noteIndicator);
      }

      this.calendarMain.appendChild(dayElement);
    }

    const totalCells = firstDayOfWeek + daysInMonth;
    const remainingCells = 42 - totalCells;

    for (let i = 0; i < remainingCells; i++) {
      const emptyDay = this.createDayElement("", "calendar__day--empty");
      this.calendarMain.appendChild(emptyDay);
    }
  }
  createDayElement(content, className) {
    const dayElement = document.createElement("div");
    dayElement.className = `calendar__day ${className}`;
    dayElement.textContent = content;

    if (content !== "") {
      dayElement.addEventListener("click", (e) => {
        e.stopPropagation();
        this.selectDay(dayElement, content);
      });
    }

    return dayElement;
  }
  selectDay(dayElement, day) {
    document.querySelectorAll(".calendar__day--selected").forEach((el) => {
      el.classList.remove("calendar__day--selected");
    });
    dayElement.classList.add("calendar__day--selected");

    const month = this.currentDate.getMonth();
    const year = this.currentDate.getFullYear();
    const shortYear = year.toString().slice(-2);
    this.calendarTitle.textContent = `${this.getMonthName(
      month
    )} ${day} ${shortYear}г.`;

    this.openNotesPanel(day, month, year);
  }
  openNotesPanel(day, month, year) {
    this.selectedDate = { day, month, year };

    const fullYear = year;
    const monthName = this.getMonthName(month);
    this.notesTitle.textContent = `${monthName} ${day} ${fullYear}г.`;

    const dateKey = this.getDateKey(day, month, year);
    if (this.notes[dateKey]) {
      this.notesTextBox.textContent = this.notes[dateKey];
      this.notesTextBox.classList.remove("hidden");
      this.setupNotesButtons(true);
    } else {
      this.notesTextBox.classList.add("hidden");
      this.setupNotesButtons(false);
    }

    this.notesPanel.classList.add("active");
    this.notesOverlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
  closeNotesPanel() {
    this.notesPanel.classList.remove("active");
    this.notesOverlay.classList.add("hidden");
    document.body.style.overflow = "";
    document.querySelectorAll(".calendar__day--selected").forEach((el) => {
      el.classList.remove("calendar__day--selected");
    });
    this.selectedDate = null;
  }
  setupNotesButtons(hasNote) {
    this.notesAddBtn.innerHTML = "";

    if (hasNote) {
      const editBtn = document.createElement("div");
      editBtn.className = "notes__edit-btn";
      editBtn.innerHTML = "<p>Редактировать</p>";
      editBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.openAddNotePopup();
      });

      const deleteBtn = document.createElement("div");
      deleteBtn.className = "notes__delete-btn";
      deleteBtn.innerHTML = "<p>Удалить</p>";
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.deleteNote();
      });

      this.notesAddBtn.appendChild(editBtn);
      this.notesAddBtn.appendChild(deleteBtn);
      this.notesAddBtn.classList.add("active");
    } else {
      this.notesAddBtn.classList.remove("active");
      const addBtn = document.createElement("div");
      addBtn.className = "notes__add-btn";
      addBtn.innerHTML = "<p>Добавить заметку</p>";
      addBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.openAddNotePopup();
      });

      this.notesAddBtn.appendChild(addBtn);
    }
  }
  openAddNotePopup() {
    if (!this.selectedDate) return;

    const dateKey = this.getDateKey(
      this.selectedDate.day,
      this.selectedDate.month,
      this.selectedDate.year
    );

    this.popupInput.value = this.notes[dateKey] || "";
    this.popup.classList.add("active");
  }
  deleteNote() {
    if (!this.selectedDate) return;

    const dateKey = this.getDateKey(
      this.selectedDate.day,
      this.selectedDate.month,
      this.selectedDate.year
    );

    delete this.notes[dateKey];
    this.saveNotes();

    this.notesTextBox.classList.add("hidden");
    this.setupNotesButtons(false);

    this.updateCalendarNoteIndicator(dateKey, false);
    this.closePopup();
  }
  saveNote() {
    if (!this.selectedDate) return;

    const noteText = this.popupInput.value.trim();
    const dateKey = this.getDateKey(
      this.selectedDate.day,
      this.selectedDate.month,
      this.selectedDate.year
    );

    if (noteText) {
      this.notes[dateKey] = noteText;
      this.saveNotes();
	  
      this.notesTextBox.textContent = noteText;
      this.notesTextBox.classList.remove("hidden");
      this.setupNotesButtons(true);
      this.updateCalendarNoteIndicator(dateKey, true);
    } else {
      this.deleteNote();
    }

    this.closePopup();
  }
  closePopup() {
    this.popup.classList.remove("active");
    this.popupInput.value = "";
  }
  updateCalendarNoteIndicator(dateKey, hasNote) {
    const [year, month, day] = dateKey.split("-");
    const currentYear = this.currentDate.getFullYear();
    const currentMonth = this.currentDate.getMonth();

    if (parseInt(year) === currentYear && parseInt(month) === currentMonth) {
      const dayElements = document.querySelectorAll(".calendar__day--active");
      dayElements.forEach((element) => {
        if (element.textContent === day) {
          if (hasNote) {
            element.classList.add("calendar__day--has-note");
            if (!element.querySelector(".calendar__note-indicator")) {
              const noteIndicator = document.createElement("div");
              noteIndicator.className = "calendar__note-indicator";
              element.appendChild(noteIndicator);
            }
          } else {
            element.classList.remove("calendar__day--has-note");
            const indicator = element.querySelector(
              ".calendar__note-indicator"
            );
            if (indicator) {
              indicator.remove();
            }
          }
        }
      });
    }
  }
  getDateKey(day, month, year) {
    return `${year}-${month}-${day}`;
  }
  getMonthName(month) {
    const months = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    return months[month];
  }
  saveNotes() {
    localStorage.setItem("calendarNotes", JSON.stringify(this.notes));
  }
  loadNotes() {
    const savedNotes = localStorage.getItem("calendarNotes");
    return savedNotes ? JSON.parse(savedNotes) : {};
  }
}
document.addEventListener("DOMContentLoaded", function () {
  new Calendar();
});
