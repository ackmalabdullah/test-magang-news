<template>
  <div class="pagination">

    <button
      @click="previousPage"
      :disabled="internalPage === 0"
      class="btn"
    >
      ←
    </button>

    <div class="page-numbers">

      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'page-btn',
          {
            active: page === internalPage
          }
        ]"
      >
        {{ page }}
      </button>

      <span
        v-if="props.totalPages > 5"
        class="dots"
      >
        ...
      </span>

      <button
        v-if="props.totalPages > 5"
        class="page-btn"
        @click="goToPage(props.totalPages)"
      >
        {{ props.totalPages }}
      </button>

    </div>

    <button
      @click="nextPage"
      :disabled="
        internalPage === props.totalPages
      "
      class="btn"
    >
      →
    </button>

  </div>
</template>

<script setup>
import {
  computed,
  ref,
  watch
} from 'vue'

const props = defineProps({
  totalPages: {
    type: Number,
    required: true
  },

  currentPage: {
    type: Number,
    default: 1
  }
})

const emit =
  defineEmits(['page-changed'])

const internalPage =
  ref(props.currentPage)

const visiblePages = computed(() => {
  return Array.from(
    {
      length: Math.min(
        5,
        props.totalPages
      )
    },
    (_, i) => i + 1
  )
})

watch(
  () => props.currentPage,
  (newPage) => {
    internalPage.value = newPage
  }
)

function goToPage(page) {
  internalPage.value = page

  emit('page-changed', page)
}

function previousPage() {
  if (internalPage.value > 1) {
    goToPage(
      internalPage.value - 1
    )
  }
}

function nextPage() {
  if (
    internalPage.value <
    props.totalPages
  ) {
    goToPage(
      internalPage.value + 1
    )
  }
}

watch(
  () => props.totalPages,
  () => {
    internalPage.value = 1
  }
)
</script>

<style scoped>
.pagination {
  display: flex;

  justify-content: center;

  align-items: center;

  gap: 10px;

  margin-top: 50px;

  flex-wrap: wrap;
}

.page-numbers {
  display: flex;

  align-items: center;

  gap: 8px;
}

.btn,
.page-btn {
  width: 42px;

  height: 42px;

  border-radius: 10px;

  border: 1px solid #ddd;

  background: white;

  cursor: pointer;

  transition: 0.3s ease;
}

.page-btn.active {
  background: var(--primary-color);

  color: white;

  border-color: var(--primary-color);
}

.btn:hover,
.page-btn:hover {
  background: var(--primary-color);

  color: white;
}

.btn:disabled {
  opacity: 0.5;

  cursor: not-allowed;
}

.dots {
  padding: 0 4px;

  color: gray;
}
</style>