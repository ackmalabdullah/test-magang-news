<template>
  <section v-if="headlines.length > 0" class="hero-carousel">
    <div class="carousel-container">
      <div class="carousel-wrapper">
        <transition-group
          name="slide"
          tag="div"
          class="carousel-content"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div v-for="(item, index) in headlines" :key="index" class="hero-slide">
            <div class="hero-left">
              <span class="category">
                {{ item.category }}
              </span>

              <h1>
                {{ item.title }}
              </h1>

              <p>
                {{ item.contentSnippet }}
              </p>

              <a :href="item.link" target="_blank" class="read-link">
                Baca Selengkapnya
                <span class="arrow">→</span>
              </a>
            </div>

            <div class="hero-right">
              <img
                :src="item.image?.large || item.image"
                :alt="item.title"
              />
            </div>
          </div>
        </transition-group>
      </div>

      <!-- Navigation Dots with Numbers -->
      <div class="dots">
        <button
          v-if="currentIndex > 0"
          class="nav-button prev"
          @click="previousSlide"
        >
          ‹
        </button>

        <div class="dot-numbers">
          <span
            v-for="(item, index) in headlines"
            :key="index"
            :class="['dot-number', { active: currentIndex === index }]"
            @click="currentIndex = index"
          >
            {{ index + 1 }}
          </span>
        </div>

        <button
          v-if="currentIndex < headlines.length - 1"
          class="nav-button next"
          @click="nextSlide"
        >
          ›
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getNews } from '../../services/api'

const headlines = ref([])
const currentIndex = ref(0)

async function fetchHeadlines() {
  const data = await getNews('beranda')
  headlines.value = data.slice(0, 5)
}

function nextSlide() {
  if (currentIndex.value < headlines.value.length - 1) {
    currentIndex.value++
  }
}

function previousSlide() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

onMounted(() => {
  fetchHeadlines()
})
</script>

<style scoped>
.hero-carousel {
  width: 100%;
  padding: 40px 0;
}

.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel-wrapper {
  width: 100%;
  overflow: hidden;
}

.carousel-content {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.hero-slide {
  width: 100%;
  flex-shrink: 0;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 50px;
  align-items: center;
  padding: 40px 60px;
}

.hero-left {
  display: flex;
  flex-direction: column;
}

.category {
  color: var(--primary-color);
  font-weight: 700;
  margin-bottom: 16px;
  display: inline-block;
  font-size: 14px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.hero-left h1 {
  font-size: 52px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 24px;
  color: var(--text-primary);
}

.hero-left p {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 32px;
  font-size: 16px;
}

.read-link {
  text-decoration: none;
  color: var(--primary-color);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 0;
  transition: all 0.3s ease;
  width: fit-content;
}

.read-link:hover {
  gap: 10px;
}

.arrow {
  font-size: 16px;
}

.hero-left button {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  font-size: 16px;
  width: fit-content;
}

.hero-left button:hover {
  background: #1e3a8a;
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.read-button {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.read-button:hover {
  background: #1e3a8a;
  transform: translateX(4px);
  box-shadow: var(--shadow-md);
}

.arrow {
  font-size: 16px;
}

.hero-right img {
  width: 100%;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: var(--shadow-xl);
}

.dots {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
}

.dot-numbers {
  display: flex;
  gap: 8px;
  align-items: center;
}

.dot-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 13px;
  color: var(--text-secondary);
}

.dot-number:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.dot-number.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: scale(1.15);
}

.nav-button {
  background: white;
  border: 2px solid var(--border-color);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  font-weight: bold;
  padding: 0;
}

.nav-button:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: scale(1.1);
}

.nav-button.prev {
  order: -1;
}

.nav-button.next {
  order: 3;
}

@media (max-width: 992px) {
  .hero-slide {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .hero-left h1 {
    font-size: 36px;
  }

  .nav-button {
    width: 40px;
    height: 40px;
    font-size: 24px;
  }

  .prev {
    left: 10px;
  }

  .next {
    right: 10px;
  }
}

@media (max-width: 576px) {
  .hero-carousel {
    padding: 24px 0;
  }

  .hero-slide {
    gap: 20px;
  }

  .hero-left h1 {
    font-size: 28px;
    margin-bottom: 16px;
  }

  .hero-left p {
    font-size: 14px;
    margin-bottom: 20px;
  }

  .hero-left button {
    padding: 12px 24px;
    font-size: 14px;
  }

  .nav-button {
    width: 36px;
    height: 36px;
    font-size: 20px;
  }

  .dots {
    margin-top: 20px;
    gap: 8px;
  }

  .dot {
    width: 8px;
    height: 8px;
  }
}

.category {
  color: var(--primary-color);
  font-weight: 700;
  margin-bottom: 16px;
  display: inline-block;
  font-size: 14px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.hero h1 {
  font-size: 52px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 24px;
  color: var(--text-primary);
}

.hero p {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 32px;
  font-size: 16px;
}

.hero button {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  font-size: 16px;
}

.hero button:hover {
  background: #1e3a8a;
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.hero-right img {
  width: 100%;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: var(--shadow-xl);
}

@media (max-width: 992px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .hero h1 {
    font-size: 36px;
  }
}

@media (max-width: 576px) {
  .hero {
    margin: 30px 0;
    gap: 20px;
  }

  .hero h1 {
    font-size: 28px;
  }

  .hero p {
    font-size: 14px;
  }

  .hero button {
    padding: 12px 24px;
    font-size: 14px;
  }
}

.hero button {
  background: var(--primary-color);

  color: white;

  padding: 14px 24px;

  border-radius: 10px;
}

.hero-right img {
  border-radius: 24px;

  height: 450px;

  object-fit: cover;
}

@media (max-width: 992px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .hero h1 {
    font-size: 34px;
  }
}
</style>