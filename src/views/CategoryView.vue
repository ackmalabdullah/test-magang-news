<template>
  <div class="container">
    <div class="category-page">
      <!-- Category Header with Search -->
      <div class="category-header">
        <h1>{{ getCategoryLabel(category) }}</h1>
        <SearchNews v-if="!loading" :newsList="news" />
      </div>

      <!-- News List -->
      <div v-if="loading" class="skeleton-container">
        <SkeletonCard v-for="i in 6" :key="i" />
      </div>

      <div v-else-if="news.length > 0" class="news-grid">
        <NewsCard v-for="item in paginatedNews" :key="item.link" :news="item" />
      </div>

      <div v-else class="no-news">
        <p>Tidak ada berita ditemukan untuk kategori ini.</p>
      </div>

      <!-- Pagination -->
      <Pagination
        v-if="news.length > 0"
        :currentPage="currentPage"
        :totalPages="totalPages"
        @page-changed="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getNews } from '../services/api'
import categories from '../data/categories'
import NewsCard from '../components/home/NewsCard.vue'
import SkeletonCard from '../components/home/SkeletonCard.vue'
import Pagination from '../components/home/Pagination.vue'
import SearchNews from '../components/home/SearchNews.vue'

const route = useRoute()
const news = ref([])
const loading = ref(false)
const currentPage = ref(1)
const itemsPerPage = 12

const category = computed(() => route.params.category || 'terbaru')

const totalPages = computed(() => Math.ceil(news.value.length / itemsPerPage))

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return news.value.slice(start, end)
})

const getCategoryLabel = (categoryValue) => {
  const found = categories.find(cat => cat.value === categoryValue)
  return found ? found.label : categoryValue
}

const handlePageChange = (page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const fetchCategoryNews = async () => {
  loading.value = true
  currentPage.value = 1
  try {
    const data = await getNews(category.value)
    news.value = data
  } catch (error) {
    console.error('Error fetching category news:', error)
    news.value = []
  } finally {
    loading.value = false
  }
}

watch(() => route.params.category, () => {
  fetchCategoryNews()
})

onMounted(() => {
  fetchCategoryNews()
})
</script>

<style scoped>
.category-page {
  padding: 40px 0;
  min-height: 80vh;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 40px;
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 20px;
}

.category-header h1 {
  font-size: 32px;
  font-weight: 800;
  color: var(--text-primary);
  text-transform: capitalize;
  margin: 0;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.skeleton-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.no-news {
  text-align: center;
  padding: 60px 20px;
  font-size: 18px;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .category-page {
    padding: 20px 0;
  }

  .category-header h1 {
    font-size: 24px;
  }

  .news-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }

  .skeleton-container {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
}
</style>
