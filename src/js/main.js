import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchData } from './api-service';

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', onSubmit);

async function onSubmit(evt) {
  evt.preventDefault();
  const searchQuery = evt.target.elements.searchQuery.value;
  const data = await fetchData(searchQuery);
  console.log(searchQuery);
  console.log(data.hits);

  const cards = data.hits;
  console.log(cards);

  const markup = createMarkup(cards);

  // Добавьте разметку в контейнер галереи
  refs.galleryContainer.innerHTML = markup;
}

function createMarkup(cards) {
  return cards
    .map(card => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = card;

      return `
      <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item"><b>${likes}</b></p>
          <p class="info-item"><b>${views}</b></p>
          <p class "info-item"><b>${comments}</b></p>
          <p class="info-item"><b>${downloads}</b></p>
        </div>
      </div>
    `;
    })
    .join('');
}
