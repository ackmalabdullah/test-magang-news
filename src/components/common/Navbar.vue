<template>
  <nav class="navbar">
    <div class="container">
      <div class="top-navbar">
        <RouterLink to="/" class="logo">BeritaKini</RouterLink>
      </div>

      <div class="category-navbar">
        <button
          v-for="item in categories"
          :key="item.value"
          :class="[
            'category-button',
            { active: selectedCategory === item.value }
          ]"
          @click="selectCategory(item.value)"
        >
          {{ item.label }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import categories from '../../data/categories'
import { useRouter } from 'vue-router'
import { defineEmits } from 'vue'

const router = useRouter()
const props = defineProps({
  selectedCategory: String
})

const emit = defineEmits(['change-category'])

const selectCategory = (category) => {
  if (category === 'beranda') {
    router.push('/')
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    emit('change-category', 'beranda')
    return
  }

  router.push(`/category/${category}`)
  emit('change-category', category)
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 999;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.top-navbar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 24px 0;
}

.logo {
  font-size: 28px;
  font-weight: 800;
  color: var(--primary-color);
  transition: color var(--transition-speed) ease;
}

.logo:hover {
  color: #1e3a8a;
}

.category-navbar {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 18px;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.category-navbar::-webkit-scrollbar {
  display: none;
}

.category-button {
  border: none;
  padding: 10px 20px;
  border-radius: 999px;
  background: var(--bg-light);
  color: var(--text-secondary);
  white-space: nowrap;
  transition: all var(--transition-speed) ease;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
}

.category-button:hover {
  background: var(--primary-color);
  color: white;
}

.category-button.active {
  background: var(--primary-color);
  color: white;
  box-shadow: var(--shadow-md);
}

@media (max-width: 768px) {
  .top-navbar {
    padding: 16px 0;
  }

  .category-navbar {
    padding-bottom: 12px;
    gap: 8px;
  }

  .category-button {
    padding: 8px 16px;
    font-size: 13px;
  }
}

@media (max-width: 576px) {
  .logo {
    font-size: 24px;
  }
}
</style>
