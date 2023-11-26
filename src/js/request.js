import axios from 'axios';
const axios = require('axios');

const URL = 'https://pixabay.com/api';
const KEY = '40826699-b7bef6c2b5cf50adc3ffa0ee2';

export async function fetchImages(search, page) {
  const response = await axios.get(
    `${URL}/?key=40826699-b7bef6c2b5cf50adc3ffa0ee2=${search}&page=${page}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`
  );
  return response.data;
}

// export async function fetchImages(search, page) {
//   const response = await axios.get(
//     `${URL}/?${KEY}=${search}&page=${page}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`
//   );
//   return response.data;
// }
