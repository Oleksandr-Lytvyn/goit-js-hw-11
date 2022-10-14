export class UnsplashAPI {
  #page = 1;
  #query = '';
  #totalPages = 0;

  getPhotos() {
    const url = `https://pixabay.com/api/?key=30541781-d1cfd5170773e7eb644cb816c&q=${
      this.#query
    }&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${
      this.#page
    }`;
    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
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
