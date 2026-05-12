<template>
  <div id="app">
    <Navbar
      :selectedCategory="selectedCategory"
      @change-category="changeCategory"
    />

    <main class="main-content">
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view
          :selectedCategory="selectedCategory"
        />
      </transition>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Navbar from './components/common/Navbar.vue'
import Footer from './components/common/Footer.vue'

const route = useRoute()

const selectedCategory = computed(() => {
  if (route.name === 'category') {
    return route.params.category
  }
  return 'beranda'
})

function changeCategory(category) {
  // Router already handles navigation in Navbar
}
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

/* TRANSITION */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>