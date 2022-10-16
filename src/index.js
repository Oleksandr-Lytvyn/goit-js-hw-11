import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { refs } from './scripts/refs';
import { fetchImages } from './scripts/fetchImages';
import { createMarkup } from './scripts/createMarkup';
import { PixabayAPI } from './scripts/pixabayApi';

const lightbox = new SimpleLightbox('.gallery a');

const pixabayApi = new PixabayAPI();

refs.form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  clearPage();

  const { searchQuery } = event.target;
  const query = searchQuery.value.trim().toLowerCase();

  pixabayApi.query = query;
  try {
    const { hits, total, totalHits } = await pixabayApi.getPhotos();
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
    }
    const markup = createMarkup(hits);

    refs.cardsList.insertAdjacentHTML('beforeend', markup);
    pixabayApi.calculateTotalPages(total);
    lightbox.refresh();
    if (pixabayApi.isNotLastPage) {
      refs.loadBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    Notify.failure(error);
    clearPage();
  }
}

refs.loadBtn.addEventListener('click', onLoadMore);

async function onLoadMore() {
  pixabayApi.incrementPage();

  const { hits } = await pixabayApi.getPhotos();
  try {
    const markup = createMarkup(hits);
    refs.cardsList.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
    if (!pixabayApi.isNotLastPage) {
      Notify.info(
        "We're sorry, but you've reached the end of search results.",
        {
          closeButton: true,
        }
      );
      refs.loadBtn.classList.add('is-hidden');
    }
  } catch (error) {
    Notify.failure(error);
    clearPage();
  }
}

function clearPage() {
  pixabayApi.resetPage();
  refs.cardsList.innerHTML = '';
  refs.loadBtn.classList.add('is-hidden');
}
