export function createMarkup(hits) {
  return hits
    .map(element => {
      return `
  <a  href="${element.largeImageURL}">
  <div class="photo-card">
  <div class="thumb">
    <img class="pic" src="${element.webformatURL}" alt="${element.tags}" width="300px" loading="lazy" />
    </div>
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
    </div>
    </a >
    `;
    })
    .join('');
}
