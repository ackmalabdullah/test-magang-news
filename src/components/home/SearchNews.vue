<template>
  <div class="search-section">
    <div class="search-container" ref="searchContainer">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Cari..."
        @input="handleSearch"
        class="search-input"
      />
      <span class="search-icon">🔍</span>
    </div>

    <div 
      v-if="searchQuery && searchResults.length > 0" 
      class="search-results"
      :style="searchResultsStyle"
    >
      <RouterLink
        v-for="item in searchResults.slice(0, 5)"
        :key="item.link"
        :to="{
          name: 'detail',
          params: {
            title: encodeURIComponent(item.title)
          },
          state: {
            news: item
          }
        }"
        class="result-item"
      >
        <div class="result-image-wrapper">
          <img :src="item.image?.large || item.image || fallbackImage" :alt="item.title" class="result-image" />
        </div>
        <div class="result-content">
          <h4 class="result-title">{{ item.title }}</h4>
          <p class="result-snippet">{{ item.contentSnippet?.substring(0, 80) }}...</p>
        </div>
      </RouterLink>
    </div>

    <div v-else-if="searchQuery && searchResults.length === 0" class="no-results">
      Tidak ditemukan
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const fallbackImage = 'https://via.placeholder.com/80x60'
const searchContainer = ref(null)
const searchResultsPosition = ref({ top: 0, left: 0 })

const props = defineProps({
  newsList: {
    type: Array,
    default: () => []
  }
})

const searchQuery = ref('')

const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return []

  const query = searchQuery.value.toLowerCase()
  return props.newsList.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.contentSnippet?.toLowerCase().includes(query) ||
    item.category?.toLowerCase().includes(query)
  )
})

const searchResultsStyle = computed(() => ({
  top: searchResultsPosition.value.top + 'px',
  right: searchResultsPosition.value.right + 'px'
}))

function handleSearch(e) {
  if (searchContainer.value) {
    const rect = searchContainer.value.getBoundingClientRect()
    searchResultsPosition.value = {
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right
    }
  }
}

onMounted(() => {
  handleSearch()
  window.addEventListener('resize', handleSearch)
})
</script>

<style scoped>
.search-section {
  margin-bottom: 0;
  position: relative;
}

.search-container {
  position: relative;
  width: 240px;
  margin-left: auto;
}

.search-input {
  width: 100%;
  padding: 10px 16px 10px 36px;
  border: 1.5px solid var(--border-color);
  border-radius: 6px;
  font-size: 13px;
  transition: all 0.3s ease;
  background: white;
  color: var(--text-primary);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(30, 58, 138, 0.1);
}

.search-input::placeholder {
  color: var(--text-secondary);
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
}

.search-results {
  position: fixed;
  width: 380px;
  margin-top: 0;
  background: white;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  max-height: 450px;
  overflow-y: auto;
  z-index: 1001;
}

.result-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px;
  margin: 8px 8px;
  border: 1px solid transparent;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  background: white;
}

.result-item:hover {
  background: var(--bg-light);
  border: 1px solid var(--primary-color);
  box-shadow: 0 2px 12px rgba(30, 64, 175, 0.15);
}

.result-image-wrapper {
  width: 100%;
  height: 160px;
  border-radius: 6px;
  overflow: hidden;
  background: var(--bg-light);
}

.result-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.result-item:hover .result-image {
  transform: scale(1.05);
}

.result-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.result-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.result-snippet {
  font-size: 12px;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.no-results {
  padding: 12px 12px;
  text-align: center;
  color: var(--text-secondary);
  background: white;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  position: fixed;
  width: 380px;
  margin-top: 0;
  font-size: 12px;
  z-index: 1001;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

@media (max-width: 576px) {
  .search-container {
    width: 200px;
  }

  .search-input {
    font-size: 12px;
    padding: 8px 14px 8px 32px;
  }

  .search-icon {
    font-size: 12px;
  }

  .search-results {
    width: 300px;
    max-height: 400px;
  }

  .no-results {
    width: 300px;
  }

  .result-item {
    padding: 12px;
    margin: 6px 6px;
  }

  .result-image-wrapper {
    height: 140px;
  }

  .result-title {
    font-size: 13px;
  }

  .result-snippet {
    font-size: 11px;
  }
}
</style>
