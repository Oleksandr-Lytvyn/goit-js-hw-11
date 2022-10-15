import { refs } from './refs';

export function createMarkup(hits) {
  //   clearCardList();
  // let dataMarkup = '';
  return hits
    .map(element => {
      return (refs.cardsList.innerHTML = `
  <a  href=${element.largeImageURL}">
    <img src="${element.webformatURL}" alt="${element.tags}" width="150px" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>${element.likes} Likes</b>
      </p>
      <p class="info-item">
        <b>${element.views} Views</b>
      </p>
      <p class="info-item">
        <b>${element.comments} Comments</b>
      </p>
      <p class="info-item">
        <b>${element.downloads} Downloads</b>
      </p>
    </div>
    </a >
    `);
    })
    .join('');
  refs.cardsList.innerHTML = dataMarkup;
}

function createCard(dataCard) {
  return `
  <a  href=${dataCard.largeImageURL}">
    <img src="${dataCard.webformatURL}" alt="${dataCard.tags}" width="150px" loading="lazy" />
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
    </a >
    `;
}
