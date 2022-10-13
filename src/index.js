import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './scripts/refs';
import { fetchImages } from './scripts/fetchImages';
import { createMarkup } from './scripts/createMarkup';

const API_KEY = '30541781-d1cfd5170773e7eb644cb816c';

// axios.get(API_URL);

refs.form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  fetchImages()
    .then(response => {
      return response.data.hits;
    })
    .then(data => {
      if (data.length === 0) {
        Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      createMarkup(data);
    });
}
