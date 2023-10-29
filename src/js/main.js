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
refs.loadMoreBtn.addEventListener('click', loadMoreResults);

let currentPage = 1;
let searchQuery = '';

async function onSubmit(evt) {
  evt.preventDefault();
  refs.galleryContainer.innerHTML = '';

  searchQuery = evt.target.elements.searchQuery.value;
  currentPage = 1; // зброс поточної сторінки
  const data = await fetchData(searchQuery, currentPage);

  if (!data.hits.length) {
    Notiflix.Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
    // refs.loadMoreBtn.classList.add('is-hidden');
    return;
  }

  const cards = data.hits;
  const markup = createMarkup(cards);
  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();

  if (cards.length < data.totalHits) {
    refs.loadMoreBtn.classList.remove('is-hidden');
  }
  // else {
  //   refs.loadMoreBtn.classList.add('is-hidden');
  // }
}

async function loadMoreResults() {
  currentPage++;
  // Використовує earchQuery
  const data = await fetchData(searchQuery, currentPage);
  const cards = data.hits;
  console.log(cards);
  console.log(searchQuery);
  const markup = createMarkup(cards);
  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
  console.log(currentPage * 40);
  console.log(data.totalHits);
  console.log(cards.length);
  if (currentPage * 40 >= data.totalHits) {
    refs.loadMoreBtn.classList.add('is-hidden'); // ховаємо кнопку
  }
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
          <p class="info-item"><b>${comments}</b></p>
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
