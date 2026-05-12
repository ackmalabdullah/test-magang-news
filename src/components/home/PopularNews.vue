<template>
  <section class="popular-section">
    <h2 class="section-title">Berita Terpopuler</h2>

    <div class="popular-grid">
      <RouterLink
        v-for="(item, index) in newsList.slice(0, 6)"
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
        class="popular-card"
      >
        <div class="card-image-wrapper">
          <img
            :src="item.image?.large || item.image || fallbackImage"
            :alt="item.title"
            class="card-image"
          />
          <span class="number">{{ String(index + 1).padStart(2, '0') }}</span>
        </div>

        <div class="card-content">
          <span class="category">{{ item.category || 'News' }}</span>
          <h3>{{ item.title }}</h3>
          <p class="date">{{ formatDate(item.isoDate) }}</p>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const fallbackImage =
  'https://via.placeholder.com/120x120'

defineProps({
  newsList: Array
})

function formatDate(date) {
  if (!date) return '-'

  return new Date(date).toLocaleDateString(
    'id-ID'
  )
}
</script>

<style scoped>
.popular-section {
  width: 100%;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 32px;
  color: var(--text-primary);
}

.popular-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}

.popular-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  text-decoration: none;
  height: 100%;
}

.popular-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-md);
}

.card-image-wrapper {
  position: relative;
  overflow: hidden;
  height: 120px;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.popular-card:hover .card-image {
  transform: scale(1.05);
}

.number {
  position: absolute;
  top: 8px;
  left: 8px;
  background: var(--primary-color);
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}

.card-content {
  padding: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.category {
  display: inline-block;
  background: var(--bg-light);
  color: var(--primary-color);
  font-size: 11px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 4px;
  margin-bottom: 8px;
  text-transform: uppercase;
  width: fit-content;
}

.card-content h3 {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.4;
  margin: 0 0 auto 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.date {
  font-size: 11px;
  color: var(--text-secondary);
  margin: 8px 0 0 0;
}

@media (max-width: 1024px) {
  .popular-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 14px;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 24px;
    margin-bottom: 24px;
  }

  .popular-grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 12px;
  }

  .card-image-wrapper {
    height: 100px;
  }

  .card-content h3 {
    font-size: 12px;
  }
}

@media (max-width: 576px) {
  .popular-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px;
  }

  .card-image-wrapper {
    height: 80px;
  }

  .card-content {
    padding: 8px;
  }

  .card-content h3 {
    font-size: 11px;
  }

  .number {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }
}
</style>