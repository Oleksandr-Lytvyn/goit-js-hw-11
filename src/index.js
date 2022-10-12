import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './scripts/refs';

const API_KEY = '30541781-d1cfd5170773e7eb644cb816c';

// axios.get(API_URL);

refs.form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const req = refs.input.value;
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${req}&image_type=photo&orientation=horizontal&safesearch=true`;
  axios.get(url);
}
