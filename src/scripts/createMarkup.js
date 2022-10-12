import { refs } from './refs';

export function createMarkup(data) {
  let dataMarkup = '';
  data.map(element => {
    // console.log(element.userImageURL);
    dataMarkup += createCard(element);
  });
  console.log(dataMarkup);
  refs.cardsList.innerHTML = dataMarkup;
}

function createCard(dataCard) {
  return `<div class="photo-card">
    <img src="${dataCard.webformatURL}" alt="${dataCard.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>${dataCard.likes} Likes</b>
      </p>
      <p class="info-item">
        <b>${dataCard.views} Views</b>
      </p>
      <p class="info-item">
        <b>${dataCard.comments} Comments</b>
      </p>
      <p class="info-item">
        <b>${dataCard.downloads} Downloads</b>
      </p>
    </div>
  </div>`;
}
