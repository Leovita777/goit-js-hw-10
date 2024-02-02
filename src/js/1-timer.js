import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return `0${value}`.slice(-2);
}

let userSelectedDate = null;
let isTimerRunning = false;

const startButton = document.querySelector('button[data-start]');
const datetimePicker = document.getElementById('datetime-picker');

startButton.disabled = true;

flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
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

      document.querySelector('.timer .field .value[data-days]').textContent =
        addLeadingZero(days);
      document.querySelector('.timer .field .value[data-hours]').textContent =
        addLeadingZero(hours);
      document.querySelector('.timer .field .value[data-minutes]').textContent =
        addLeadingZero(minutes);
      document.querySelector('.timer .field .value[data-seconds]').textContent =
        addLeadingZero(seconds);

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
      }
    }, 1000);
  }
});
