import { Notify } from 'notiflix/build/notiflix-notify-aio'
import NewsApiService from './js/api-service'
import { lightbox } from './js/lightbox'
import galleryTemplate from './markups/gallery'
import './sass/index.scss'

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
}
let isShown = 0
const newsApiService = new NewsApiService()

refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreBtn.addEventListener('click', onLoadMore)

const options = {
  rootMargin: '50px',
  root: null,
  threshold: 0.3,
}
const observer = new IntersectionObserver(onLoadMore, options)

function onSearch(element) {
  element.preventDefault()

  refs.galleryContainer.innerHTML = ''
  newsApiService.query =
    element.currentTarget.elements.searchQuery.value.trim()
  newsApiService.resetPage()

  if (newsApiService.query === '') {
    Notify.warning('Please, fill the main field')
    return
  }

  isShown = 0
  fetchGallery()
}

function onLoadMore() {
  newsApiService.incrementPage()
  fetchGallery()
}

async function fetchGallery() {
  refs.loadMoreBtn.classList.add('is-hidden')

  const result = await newsApiService.fetchGallery()
  const { hits, total } = result
  isShown += hits.length

  if (!hits.length) {
    Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    )
    refs.loadMoreBtn.classList.add('is-hidden')
    return
  }

  onRenderGallery(hits)

  if (isShown < total) {
    refs.loadMoreBtn.classList.remove('is-hidden')
  }

  if (isShown < total && isShown <= 40) {
    Notify.success(`Hooray! We found ${total} images !!!`)
  }

  if (isShown >= total) {
    Notify.info("We're sorry, but you've reached the end of search results.")
  }
}

async function onRenderGallery(elements) {
  const markupGallery = elements
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return galleryTemplate(webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads)
      }
    )
    .join('')
  refs.galleryContainer.insertAdjacentHTML('beforeend', markupGallery)
  lightbox.refresh()
}
