// import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchData } from './api-service';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
refs.loadMoreBtn.classList.add('is-hidden');

refs.searchForm.addEventListener('submit', onSubmit);

async function onSubmit(evt) {
  evt.preventDefault();
  const searchQuery = evt.target.elements.searchQuery.value;
  const data = await fetchData(searchQuery);

  if (!data.hits.length) {
    Notiflix.Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
    // refs.loadMoreBtn.classList.add('is-hidden');
    return;
  }
  const cards = data.hits;

  const markup = createMarkup(cards);

  // Добавьте разметку в контейнер галереи
  refs.galleryContainer.innerHTML = markup;
  lightbox.refresh();
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
      <a class="photo__link" href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
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

// підключаємо галерею
let lightbox = new SimpleLightbox('.photo-card a', {
  //   captions: true,
  captionPosition: 'bottom',
  captionsData: 'alt',
  captionDelay: 250,
});
