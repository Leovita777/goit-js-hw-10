import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('button[data-start]');
const datetimePicker = document.getElementById('datetime-picker');
const timerFields = document.querySelectorAll('.timer .field');

startButton.disabled = true;

flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      iziToast.warning({
        title: 'Warning',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

startButton.addEventListener('click', () => {
  if (!isTimerRunning) {
    isTimerRunning = true;
    startButton.disabled = true;
    datetimePicker.disabled = true;

    const remainingTime = convertMs(userSelectedDate - new Date());

    const timerInterval = setInterval(() => {
      const updatedRemainingTime = convertMs(userSelectedDate - new Date());

      const days = updatedRemainingTime.days;
      const hours = updatedRemainingTime.hours;
      const minutes = updatedRemainingTime.minutes;
      const seconds = updatedRemainingTime.seconds;

      for (const field of timerFields) {
        const valueElement = field.querySelector('.value');
        const dataAttribute = valueElement.dataset.days
          ? `data-${valueElement.dataset.days}`
          : `data-${valueElement.dataset.hours}`
          ? `data-${valueElement.dataset.hours}`
          : `data-${valueElement.dataset.minutes}`
          ? `data-${valueElement.dataset.minutes}`
          : `data-${valueElement.dataset.seconds}`;
        valueElement.textContent = addLeadingZero(
          updatedRemainingTime[dataAttribute]
        );
      }

      if (
        updatedRemainingTime.days === 0 &&
        updatedRemainingTime.hours === 0 &&
        updatedRemainingTime.minutes === 0 &&
        updatedRemainingTime.seconds === 0
      ) {
        clearInterval(timerInterval);
        isTimerRunning = false;
        iziToast.success({
          title: 'Success',
          message: 'Time is up!',
        });
        datetimePicker.disabled = false;
      }
    }, 1000);
  }
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return `0${value}`.slice(-2);
}
