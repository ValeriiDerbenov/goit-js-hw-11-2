const axios = require('axios');

const URL = "https://pixabay.com/api";

export async function fetchImages (search, page) {
    const response = await axios.get(`${URL}/?key=28408221-8884b414615b22bda0ca1828e&q=${search}&page=${page}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`);
    return response.data;
}