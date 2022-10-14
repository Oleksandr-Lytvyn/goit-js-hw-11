import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './scripts/refs';
import { fetchImages } from './scripts/fetchImages';
import { createMarkup } from './scripts/createMarkup';
import { UnsplashAPI } from './scripts/unsplashApi';

const unsplashApi = new UnsplashAPI();

refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  unsplashApi.resetPage();

  const { searchQuery } = event.target;
  const query = searchQuery.value.trim().toLowerCase();

  unsplashApi.query = query;
  unsplashApi.getPhotos().then(({ hits, total, totalHits }) => {
    Notify.success(`Hooray! We found ${totalHits} images.`, {
      closeButton: true,
    });
    createMarkup(hits);
    unsplashApi.calculateTotalPages(total);
    if (unsplashApi.isNotLastPage) {
      refs.loadBtn.classList.remove('is-hidden');
    }
  });
}

refs.loadBtn.addEventListener('click', onLoadMore);

function onLoadMore() {
  unsplashApi.incrementPage();
  unsplashApi.getPhotos().then(({ hits }) => {
    createMarkup(hits);
  });
  if (!unsplashApi.isNotLastPage) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    refs.loadBtn.classList.add('is-hidden');
  }
}

// refs.form.addEventListener('submit', onSubmit);

// function onSubmit(event) {
//   event.preventDefault();
//   fetchImages(event)
//     .then(data => {
//       if (data.length === 0) {
//         Notify.info(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );
//       }
//       createMarkup(data);
//     })
//     .catch(error => console.log(error));
// }
