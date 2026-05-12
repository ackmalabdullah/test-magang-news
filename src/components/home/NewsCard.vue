<template>
  <RouterLink :to="detailLink" class="card">
    <img :src="news.image?.large || news.image || fallbackImage" alt="news" />

    <div class="card-content">
      <span class="category">
        {{ news.category || 'News' }}
      </span>

      <h3>
        {{ news.title }}
      </h3>

      <p>
        {{ formatDate(news.isoDate) }}
      </p>
    </div>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue';

const fallbackImage = 'https://via.placeholder.com/400x250';

const props = defineProps({
  news: Object,
});

const detailLink = computed(() => {
  return {
    name: 'detail',
    params: {
      title: encodeURIComponent(props.news.title),
    },
    state: {
      news: props.news,
    },
  };
});

function formatDate(date) {
  if (!date) return '-';

  return new Date(date).toLocaleDateString('id-ID');
}
</script>

<style scoped>
.card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  display: block;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.card img {
  height: 180px;

  object-fit: cover;

  width: 100%;
}

.card-content {
  padding: 16px;

  flex: 1;

  display: flex;

  flex-direction: column;
}

.category {
  color: var(--primary-color);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  display: inline-block;
}

.card h3 {
  margin: 10px 0;

  line-height: 1.4;

  font-size: 15px;

  color: var(--text-primary);

  font-weight: 600;

  min-height: 44px;

  display: -webkit-box;

  -webkit-line-clamp: 2;

  -webkit-box-orient: vertical;

  overflow: hidden;

  flex-grow: 1;
}

.card p {
  color: var(--text-secondary);
  font-size: 14px;
  margin: 0;
  margin-top: auto;
}

@media (max-width: 576px) {
  .card img {
    height: 180px;
  }

  .card-content {
    padding: 16px;
  }

  .card h3 {
    font-size: 16px;
  }
}
</style>
