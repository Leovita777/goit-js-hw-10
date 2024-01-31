import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      setTimeout(() => {
        resolve(delay);
      }, delay);
    } else if (state === 'rejected') {
      setTimeout(() => {
        reject(delay);
      }, delay);
    }
  });
}

document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();

  const delay = parseInt(document.querySelector("input[name='delay']").value);
  const state = document.querySelector("input[name='state']:checked").value;

  const promise = createPromise(delay, state);

  promise.then(
    result => {
      iziToast.success({
        title: 'Fulfilled',
        message: `✅ Fulfilled promise in ${result}ms`,
      });
    },
    error => {
      iziToast.error({
        title: 'Rejected',
        message: `❌ Rejected promise in ${error}ms`,
      });
    }
  );
});
