import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { refs } from './scripts/refs';
import { fetchImages } from './scripts/fetchImages';
import { createMarkup } from './scripts/createMarkup';
import { UnsplashAPI } from './scripts/unsplashApi';

const unsplashApi = new UnsplashAPI();

refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  clearPage();

  const { searchQuery } = event.target;
  const query = searchQuery.value.trim().toLowerCase();

  unsplashApi.query = query;
  unsplashApi
    .getPhotos()
    .then(({ hits, total, totalHits }) => {
      if (total > 0) {
        Notify.success(`Hooray! We found ${totalHits} images.`, {
          closeButton: true,
        });
      }
      if (!total) {
        Notify.info(
          'Sorry, there are no images matching your search query. Please try again.',
          {
            closeButton: true,
          }
        );
        return;
      }

      const markup = createMarkup(hits);
      refs.cardsList.insertAdjacentHTML('beforeend', markup);
      unsplashApi.calculateTotalPages(total);
      if (unsplashApi.isNotLastPage) {
        refs.loadBtn.classList.remove('is-hidden');
      }
    })
    .catch(error => {
      Notify.failure(error);
      clearPage();
    });
  // console.log('after create markup');
}

refs.loadBtn.addEventListener('click', onLoadMore);

function onLoadMore() {
  unsplashApi.incrementPage();
  unsplashApi
    .getPhotos()
    .then(({ hits }) => {
      const markup = createMarkup(hits);
      refs.cardsList.insertAdjacentHTML('beforeend', markup);
      if (!unsplashApi.isNotLastPage) {
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        refs.loadBtn.classList.add('is-hidden');
      }
    })
    .catch(error => {
      Notify.failure(error);
      clearPage();
    });
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'top',
  captionType: 'attr',
  captionDelay: 250,
  showCounter: false,
});

function clearPage() {
  unsplashApi.resetPage();
  refs.cardsList.innerHTML = '';
  refs.loadBtn.classList.add('is-hidden');
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
