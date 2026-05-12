<template>
  <section class="related-news">

    <h2 class="section-title">
      Berita Terkait
    </h2>

    <div
      v-if="loading"
      class="loading"
    >
      Loading...
    </div>

    <div
      v-else
      class="related-grid"
    >

      <RouterLink
        v-for="item in relatedNews"
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
        class="related-card"
      >

        <img
          :src="
            item.image?.large ||
            item.image ||
            fallbackImage
          "
          :alt="item.title"
        />

        <div class="card-content">

          <span class="category">
            {{ item.category }}
          </span>

          <h3>
            {{ item.title }}
          </h3>

          <p>
            {{ formatDate(item.isoDate) }}
          </p>

        </div>

      </RouterLink>

    </div>

  </section>
</template>

<script setup>
import {
  onMounted,
  ref,
  watch
} from 'vue'

import { getNews }
  from '../../services/api'

const props = defineProps({
  category: String,
  currentTitle: String
})

const loading = ref(true)

const relatedNews = ref([])

const fallbackImage =
  'https://via.placeholder.com/400x250'

async function fetchRelatedNews() {
  loading.value = true

  const data =
    await getNews(props.category)

  relatedNews.value = data
    .filter(
      item =>
        item.title !== props.currentTitle
    )
    .slice(0, 4)

  loading.value = false
}

watch(
  () => props.category,
  () => {
    fetchRelatedNews()
  }
)

onMounted(() => {
  fetchRelatedNews()
})

function formatDate(date) {
  if (!date) return '-'

  return new Date(date)
    .toLocaleDateString('id-ID')
}
</script>

<style scoped>
.related-news {
  background: white;

  border-radius: 16px;

  padding: 32px;

  box-shadow: var(--shadow-md);

  border: 1px solid
    var(--border-color);
}

.section-title {
  font-size: 24px;

  font-weight: 700;

  margin-bottom: 28px;

  color: var(--text-primary);
}

.related-grid {
  display: grid;

  grid-template-columns:
    repeat(2, 1fr);

  gap: 20px;
}

.related-card {
  background: #fff;

  border-radius: 14px;

  overflow: hidden;

  text-decoration: none;

  border: 1px solid
    var(--border-color);

  transition: 0.3s ease;
}

.related-card:hover {
  transform: translateY(-4px);

  box-shadow: var(--shadow-lg);
}

.related-card img {
  width: 100%;

  height: 180px;

  object-fit: cover;
}

.card-content {
  padding: 16px;
}

.category {
  color: var(--primary-color);

  font-size: 11px;

  font-weight: 700;

  text-transform: uppercase;
}

.card-content h3 {
  font-size: 15px;

  line-height: 1.5;

  margin: 10px 0;

  color: var(--text-primary);

  display: -webkit-box;

  -webkit-line-clamp: 2;

  -webkit-box-orient: vertical;

  overflow: hidden;
}

.card-content p {
  color: var(--text-secondary);

  font-size: 13px;
}

.loading {
  color: gray;
}

@media (max-width: 768px) {
  .related-grid {
    grid-template-columns: 1fr;
  }

  .related-card img {
    height: 160px;
  }
}
</style>