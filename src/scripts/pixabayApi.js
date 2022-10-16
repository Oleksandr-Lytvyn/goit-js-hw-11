import axios from 'axios';

export class PixabayAPI {
  #page = 1;
  #query = '';
  #totalPages = 0;

  async getPhotos() {
    const urlAXIOS = `https://pixabay.com/api/?key=30541781-d1cfd5170773e7eb644cb816c&q=${
      this.#query
    }&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${
      this.#page
    }`;
    const { data } = await axios.get(urlAXIOS);
    return data;
  }
  incrementPage() {
    this.#page += 1;
  }
  calculateTotalPages(total) {
    this.#totalPages = Math.ceil(total / 40);
  }
  resetPage() {
    this.#page = 1;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }
  get query() {
    return this.#query;
  }
  get isNotLastPage() {
    return this.#page < this.#totalPages;
  }
}
