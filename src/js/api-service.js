import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '40268074-5c3ececf222fa6778734cace7';

export async function fetchData(searchQuery) {
  try {
    const res = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
    );
    // console.log(res.data);
    return res.data;
  } catch (error) {
    Notiflix.Notify.failure('Something went wrong in "fetchData"');
  }
}
