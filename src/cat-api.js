import axios from 'axios';
const URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_cFPQrAg5CYBZmRDtRfaA24RnDxTxorzx1kegFGzoVb7BNT7IjU552Hsjjqd8xIoO';
axios.defaults.headers.common['x-api-key'] = API_KEY;
import axios from 'axios';

export function fetchBreeds() {
  return axios.get(`${URL}/breeds?api_key=${API_KEY}`).then(res => {
    if (res.status !== 200) {
      throw new Error(res.status);
    }
    return res.data;
  });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`)
    .then(res => {
      if (res.status !== 200) {
        throw new Error(res.status);
      }
      return res.data;
    });
}
