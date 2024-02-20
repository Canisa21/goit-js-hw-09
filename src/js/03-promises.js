import Notiflix from 'notiflix'

const form = document.querySelector('.form');

const handleForm = event => {
  event.preventDefault();
  const firstDelay = parseInt(form.elements.delay.value, 10);
  const delayStep = parseInt(form.elements.step.value, 10);
  const amount = parseInt(form.elements.amount.value, 10);
  setTimeout(() => {
    for (let i = 1; i <= amount; i++) {
      const currentDelay = firstDelay + (i - 1) * delayStep;
      createPromise(i, currentDelay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        });
    }
  });
};

form.addEventListener('submit', handleForm);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay }); // Fulfill
      } else {
        reject({ position, delay }); // Reject
      }
    }, delay);
  });
}