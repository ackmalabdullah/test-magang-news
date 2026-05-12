<template>
  <section>
    <!-- LOADING -->
    <div v-if="loading" class="grid-3">
      <SkeletonCard v-for="n in 8" :key="n" />
    </div>

    <!-- NEWS -->
    <div v-else>
      <div class="grid-3">
        <NewsCard v-for="item in paginatedNews" :key="item.link" :news="item" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import NewsCard from './NewsCard.vue';
import SkeletonCard from './SkeletonCard.vue';

const props = defineProps({
  newsList: {
    type: Array,
    default: () => []
  }
});

const loading = ref(false);
const currentPage = ref(1);
const itemsPerPage = 8;

// Total page
const totalPages = computed(() => {
  return Math.ceil(props.newsList.length / itemsPerPage);
});

// News pagination
const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return props.newsList.slice(start, end);
});

// Change page
function handlePageChange(page) {
  currentPage.value = page;
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

// Reset page when newsList changes
watch(() => props.newsList, () => {
  currentPage.value = 1;
});
</script>

<style scoped>
.section-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 32px;
  color: var(--text-primary);
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}

@media (max-width: 1024px) {
  .grid-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 24px;
    margin-bottom: 24px;
  }
}

@media (max-width: 576px) {
  .grid-3 {
    grid-template-columns: 1fr;
  }
}
</style>