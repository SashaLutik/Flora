function DateTime() {
  const now = new Date();
  const dateElement = document.querySelector(".button__top-date");
  const dayElement = document.querySelector(".button__top-title");

  if (dateElement && dayElement) {
    const formattedDate =
      now
        .toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        })
        .replace(/\//g, ".") + "г.";

    dateElement.textContent = formattedDate;

    const dayOfWeek = now.toLocaleDateString("ru-RU", { weekday: "long" });
    dayElement.textContent =
      dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
  }
}

DateTime();
setInterval(DateTime, 30000);
