import axios from 'axios';
import { refs } from './refs';

const API_KEY = '30541781-d1cfd5170773e7eb644cb816c';

axios.defaults.baseURL = 'https://pixabay.com/api';

export async function fetchImages() {
  const req = refs.input.value;
  const url = `/?key=${API_KEY}&q=${req}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;
  const {
    data: { hits },
  } = await axios.get(url);
  return hits;
}
