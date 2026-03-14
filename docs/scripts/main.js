document.addEventListener("DOMContentLoaded", () => {
  // Установите конечную дату
  const deadline = new Date("2026-08-08T15:00:00");

  // Найдите элементы DOM
  const elDays = document.querySelector(".timer__days");
  const elHours = document.querySelector(".timer__hours");
  const elMinutes = document.querySelector(".timer__minutes");
  const elSeconds = document.querySelector(".timer__seconds");

  const elDaysText = document.querySelector(".timer__days--text");
  const elHoursText = document.querySelector(".timer__hours--text");
  const elMinutesText = document.querySelector(".timer__minutes--text");
  const elSecondsText = document.querySelector(".timer__seconds--text");

  // Функция склонения числительных
  const declensionNum = (num, words) => {
    return words[
      num % 100 > 4 && num % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
    ];
  };

  // Функция обновления таймера
  const updateTimer = () => {
    const now = new Date();
    const diff = Math.max(0, deadline - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    elDays.textContent = String(days).padStart(2, "0");
    elHours.textContent = String(hours).padStart(2, "0");
    elMinutes.textContent = String(minutes).padStart(2, "0");
    elSeconds.textContent = String(seconds).padStart(2, "0");

    elDaysText.textContent = String(declensionNum(days, ["день", "дня", "дней"]));
    elHoursText.textContent = String(declensionNum(hours, ["час", "часа", "часов"]));
    elMinutesText.textContent = declensionNum(minutes, [
      "минута",
      "минуты",
      "минут",
    ]);
    elSecondsText.textContent = declensionNum(seconds, [
      "секунда",
      "секунды",
      "секунд",
    ]);

    if (diff === 0) {
      clearInterval(timerId);
    }
  };

  // Запустите таймер
  updateTimer();
  const timerId = setInterval(updateTimer, 1000);
});

