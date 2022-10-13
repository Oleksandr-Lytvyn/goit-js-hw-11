import axios from 'axios';
import { refs } from './refs';

const API_KEY = '30541781-d1cfd5170773e7eb644cb816c';

export function fetchImages() {
  const req = refs.input.value;
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${req}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;
  return axios.get(url);
}
