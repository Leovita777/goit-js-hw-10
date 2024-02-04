import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let isTimerRunning = false;
let userSelectedDate = null;

const startButton = document.querySelector('button[data-start]');
const datetimePicker = document.getElementById('datetime-picker');
const timerFields = document.querySelectorAll('.timer .field');
const fieldDays = document.querySelector('data-days');
const fieldHours = document.querySelector('data-hours');
const fieldMinutes = document.querySelector('data-minutes');
const fieldSeconds = document.querySelector('data-seconds');

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

    const { days, hours, minutes, seconds } = setInterval(() => {
      const updatedRemainingTime = convertMs(userSelectedDate - new Date());

      fieldDays.textContent = addLeadingZero(days);
      fieldHours.textContent = addLeadingZero(hours);
      fieldMinutes.textContent = addLeadingZero(minutes);
      fieldSeconds.textContent = addLeadingZero(seconds);

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
