<template>
  <div class="container">

    <!-- HEADLINE -->
    <HeroNews />

    <!-- POPULAR -->
    <PopularNews :newsList="popularNews" />

    <!-- REKOMENDASI -->
    <section class="recommendation-section">

      <div class="section-header">
        <h2 class="section-title">
          Rekomendasi Untuk Anda
        </h2>

        <SearchNews
          :newsList="recommendationNews"
        />
      </div>

      <!-- NEWS -->
      <RecommendationNews
        :newsList="paginatedRecommendationNews"
      />

      <!-- PAGINATION -->
      <Pagination
        v-if="recommendationNews.length > 0"
        :currentPage="currentPage"
        :totalPages="totalPages"
        @page-changed="handlePageChange"
      />
    </section>
  </div>
</template>

<script setup>
import {
  ref,
  watch,
  onMounted,
  computed
} from 'vue'

import HeroNews from '../components/home/HeroNews.vue'
import PopularNews from '../components/home/PopularNews.vue'
import RecommendationNews from '../components/home/RecommendationNews.vue'
import SearchNews from '../components/home/SearchNews.vue'
import Pagination from '../components/home/Pagination.vue'

import { getNews } from '../services/api'

const props = defineProps({
  selectedCategory: {
    type: String,
    default: 'beranda'
  }
})

/* STATE */
const popularNews = ref([])
const recommendationNews = ref([])
const currentPage = ref(1)
const itemsPerPage = 6

/* TOTAL PAGE */
const totalPages = computed(() => {
  return Math.ceil(
    recommendationNews.value.length /
    itemsPerPage
  )
})

/* PAGINATION DATA */
const paginatedRecommendationNews =
  computed(() => {

    const start =
      (currentPage.value - 1)
      * itemsPerPage

    const end =
      start + itemsPerPage

    return recommendationNews.value.slice(
      start,
      end
    )
  })

/* HANDLE PAGE */
function handlePageChange(page) {

  currentPage.value = page

  const section =
    document.querySelector(
      '.recommendation-section'
    )

  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

/* FETCH POPULAR */
async function fetchPopularNews() {

  const data =
    await getNews('beranda')

  popularNews.value =
    data.slice(0, 6)
}

/* FETCH REKOMENDASI */
async function fetchRecommendationNews() {

  const data =
    await getNews(
      props.selectedCategory
    )

  recommendationNews.value = data

  currentPage.value = 1
}

/* WATCH CATEGORY */
watch(
  () => props.selectedCategory,
  () => {
    fetchRecommendationNews()
  }
)

/* MOUNT */
onMounted(() => {
  fetchPopularNews()
  fetchRecommendationNews()
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 40px 0;
  min-height: calc(100vh - 120px);
}

.recommendation-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

@media (max-width: 768px) {
  .container {
    gap: 40px;
    padding: 24px 0;
  }

  .section-header {
    flex-direction: column;
    gap: 16px;
  }

  .section-title {
    font-size: 24px;
  }
}

@media (max-width: 576px) {
  .container {
    gap: 32px;
    padding: 16px 0;
  }

  .recommendation-section {
    gap: 16px;
  }
}
</style>