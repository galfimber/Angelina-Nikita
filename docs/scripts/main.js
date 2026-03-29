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

    elDaysText.textContent = String(
      declensionNum(days, ["день", "дня", "дней"]),
    );
    elHoursText.textContent = String(
      declensionNum(hours, ["час", "часа", "часов"]),
    );
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

const musicControls = document.querySelector(".music__controls");
const musicControlsBtn = document.querySelector(".music__controls--btn");
const music = document.querySelector(".music__player");
music.volume = 0;

musicControls.addEventListener("click", () => {
  musicControlsBtn.classList.toggle("pause");
  if (!musicControlsBtn.classList.contains("pause")) {
    music.play();
  } else {
    music.pause();
  }
});

window.onload = function () {
  music.volume = 1;
};

const form = document.querySelector(".form");
const popup = document.getElementById("popup");

function closePopup() {
  popup.classList.remove("active");
  document.body.classList.remove("lock");
}
popup.addEventListener("click", function (e) {
  if (e.target === popup) {
    closePopup();
  }
});

const validate = (person, personStatus, checked) => {
  const nameInput = document.querySelector(".form__name--error");
  const radioInput = document.querySelector(".form__radio--error");
  const checkInput = document.querySelector(".form__check--error");

  if (!person) {
    nameInput.classList.add("error__active");
  } else {
    nameInput.classList.remove("error__active");
  }
  if (!personStatus) {
    radioInput.classList.add("error__active");
  } else {
    radioInput.classList.remove("error__active");
  }
  if (checked.length < 1) {
    checkInput.classList.add("error__active");
  } else {
    checkInput.classList.remove("error__active");
  }
  if (person && personStatus && checked.length > 1) {
    console.log(1);
    return true;
  }
};

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const checkbox = document.querySelectorAll('input[type="checkbox"]:checked');

  const formData = new FormData(form);
  const checked = [];
  checkbox.forEach((i) => {
    checked.push(i.parentElement.textContent);
  });
  const person = formData.get("name");
  const personStatus = formData.get("status");

  const isValid = validate(person, personStatus, checked);
  if (isValid) {
    console.log("Имя:", person);
    console.log("Статус:", personStatus);
    console.log("Алкоголь:", checked);

    // emailjs.init("i4Bis3O3WkD58LKFx");

    // emailjs
    //   .send("default_service", "template_89j125n", {
    //     to_name: "Имя",
    //     message: `Имя: ${person}
    //   Статус: ${personStatus}
    //   Алкоголь: ${checked.join(", ")}`,
    //   })
    //   .then((response) => console.log("Письмо успешно отправлено!", response))
    //   .catch((error) => console.log("Возникла ошибка...", error));
    popup.classList.add("active");
    document.body.classList.add("lock");
  }
});

function openEnvelope() {
  const envelope = document.getElementById("envelope");
  const overlay = document.getElementById("overlay");

  envelope.classList.add("fly");
  envelope.classList.add("fade-out");
  document.body.classList.remove("lock");

  music.play();

  setTimeout(() => {
    overlay.classList.add("fade-out");
  }, 800);

  setTimeout(() => {
    overlay.style.display = "none";
  }, 2000);
}
