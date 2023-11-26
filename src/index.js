import Notiflix from 'notiflix';
const axios = require('axios');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const URL = 'https://pixabay.com/api';
const KEY = '40826699-b7bef6c2b5cf50adc3ffa0ee2';

// async function fetchImages(search, page) {
//   const response = await axios.get(
//     `${URL}/?${KEY}=${search}&page=${page}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`
//   );
//   return response.data;
// }
