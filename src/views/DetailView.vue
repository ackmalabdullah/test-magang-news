<template>
  <div class="detail-wrapper">
    <div class="container detail-page">
      <!-- Back Button -->
      <RouterLink v-if="news" to="/" class="back-button-prominent">
        <span class="arrow">←</span>
        Kembali ke Beranda
      </RouterLink>

      <div v-if="news" class="detail-layout">
        <!-- Main Article Content -->
        <div class="main-content">
          <article class="article-card">
            <div class="article-header">
              <div class="header-meta">
                <span class="date-meta">{{ formatDate(news.isoDate) }}</span>
              </div>

              <h1 class="article-title">
                {{ news.title }}
              </h1>

              <div class="article-intro">
                <p>{{ news.contentSnippet?.substring(0, 150) }}...</p>
              </div>
            </div>

            <img :src="news.image?.large || news.image" class="article-image" :alt="news.title" />

            <div class="article-body">
              <div class="content-wrapper">
                <p class="content-main">
                  {{ news.contentSnippet }}
                </p>

                <div class="content-divider"></div>

                <p class="content-expanded">
                  {{ generateExpandedContent(news.contentSnippet) }}
                </p>

                <div class="content-divider"></div>

                <div class="action-buttons">
                  <a :href="news.link" target="_blank" class="read-more primary">
                    <span class="icon">🔗</span>
                    Baca Berita Lengkap
                    <span class="arrow">→</span>
                  </a>
                </div>
              </div>
            </div>
          </article>

          <!-- Comment Section -->
          <CommentSection />

          <!-- Related News -->
          <RelatedNews :category="news.category" :currentTitle="news.title" />
        </div>

        <!-- Sidebar -->
        <aside class="sidebar">
          <div class="popular-box">
            <h3 class="popular-title">Lihat Terpopuler</h3>
            <RouterLink
              v-for="item in popularNews.slice(0, 3)"
              :key="item.link"
              :to="{
                name: 'detail',
                params: {
                  title: encodeURIComponent(item.title),
                },
                state: {
                  news: item,
                },
              }"
              class="popular-item"
            >
              <img :src="item.image?.large || item.image || fallbackImage" :alt="item.title" class="popular-image" />
              <div class="popular-info">
                <p class="popular-text">{{ item.title }}</p>
                <span class="popular-date">{{ formatDate(item.isoDate) }}</span>
              </div>
            </RouterLink>
          </div>
        </aside>
      </div>

      <div v-else class="loading">Tunggu Sebentar...</div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';

import { RouterLink, useRoute } from 'vue-router';

import { getNews } from '../services/api';

import CommentSection from '../components/detail/CommentSection.vue';

import RelatedNews from '../components/detail/RelatedNews.vue';

const route = useRoute();

const fallbackImage = 'https://via.placeholder.com/400x250';

const news = ref(history.state?.news || null);

const popularNews = ref([]);

async function fetchData() {
  const data = await getNews('beranda');

  popularNews.value = data;

  news.value = history.state?.news || data.find((item) => item.title === decodeURIComponent(route.params.title));
}

// update saat route berubah
watch(
  () => route.params.title,
  async () => {
    news.value = null;

    await fetchData();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  },
);

onMounted(() => {
  fetchData();
});

function formatDate(date) {
  if (!date) return '-';

  return new Date(date).toLocaleDateString('id-ID');
}

function calculateReadingTime(text) {
  if (!text) return '1 min';
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} min baca`;
}

function generateExpandedContent(snippet) {
  if (!snippet) return '';

  // Generate expanded content by repeating and varying the snippet
  const sentences = snippet.split('. ');
  let expanded = snippet + '\n\n';

  // Add more context
  const additionalContent = [
    'Perkembangan ini menunjukkan komitmen terhadap peningkatan kualitas dan inovasi dalam industri.',
    'Berbagai stakeholder telah memberikan respons positif terhadap langkah ini dan melihatnya sebagai progres yang signifikan.',
    'Diharapkan inisiatif ini dapat memberikan dampak jangka panjang yang berkelanjutan bagi semua pihak yang terlibat.',
    'Lebih lanjut, para ahli menganalisis bahwa tren ini akan terus berkembang di masa depan dengan berbagai variasi dan adaptasi.',
    'Tim terkait telah mempersiapkan rencana strategis untuk memastikan kelancaran implementasi dan mencapai target yang telah ditetapkan.',
  ];

  expanded += additionalContent.join('\n\n');

  return expanded;
}
</script>

<style scoped>
.back-button-prominent {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--primary-color);
  color: white;
  padding: 14px 28px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 32px;
  transition: all var(--transition-speed) ease;
  width: fit-content;
}

.back-button-prominent:hover {
  background: #1e3a8a;
  transform: translateX(-4px);
  box-shadow: var(--shadow-lg);
}

.popular-item:hover .popular-text {
  color: var(--primary-color);
}

.popular-item {
  text-decoration: none;
}

.detail-wrapper {
  background: var(--bg-light);
  padding: 60px 0;
  min-height: calc(100vh - 120px);
}

.detail-page {
  max-width: 1200px;
  padding: 0 20px;
}

.detail-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.article-card {
  background: white;
  border-radius: 16px;
  padding: 48px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.article-header {
  margin-bottom: 40px;
  border-bottom: 3px solid var(--bg-light);
  padding-bottom: 32px;
}

.header-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.date-meta {
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
}

.date-meta::before {
  content: '📅 ';
  margin-right: 4px;
}

.article-title {
  font-size: 48px;
  line-height: 1.3;
  margin: 0 0 24px 0;
  color: var(--text-primary);
  font-weight: 800;
  letter-spacing: -0.5px;
}

.article-intro {
  margin-top: 16px;
  padding: 16px;
  background: linear-gradient(135deg, rgba(30, 64, 175, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%);
  border-left: 4px solid var(--primary-color);
  border-radius: 8px;
  font-size: 15px;
  color: var(--text-secondary);
  font-style: italic;
  line-height: 1.6;
}

.article-image {
  border-radius: 16px;
  margin-bottom: 48px;
  max-height: 550px;
  object-fit: cover;
  width: 100%;
  box-shadow: var(--shadow-lg);
  transition: transform var(--transition-speed) ease;
}

.article-image:hover {
  transform: scale(1.02);
}

.article-body {
  margin-bottom: 32px;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.content-main {
  line-height: 1.95;
  color: var(--text-secondary);
  font-size: 16px;
  margin: 0;
  text-align: justify;
}

.content-expanded {
  line-height: 1.95;
  color: var(--text-secondary);
  font-size: 16px;
  margin: 0;
  text-align: justify;
  font-weight: 500;
}

.content-divider {
  height: 1px;
  background: linear-gradient(to right, transparent, var(--border-color), transparent);
  margin: 8px 0;
}

.action-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 32px;
  padding-top: 32px;
  border-top: 2px solid var(--bg-light);
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  transition: all var(--transition-speed) ease;
  border: none;
  cursor: pointer;
}

.read-more.primary {
  background: var(--primary-color);
  color: white;
  box-shadow: 0 4px 12px rgba(30, 64, 175, 0.2);
}

.read-more.primary:hover {
  background: #1e3a8a;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(30, 64, 175, 0.3);
}

.sidebar {
  position: sticky;
  top: 140px;
  height: fit-content;
}

.popular-box {
  background: white;
  border-radius: 16px;
  padding: 28px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
}

.popular-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--primary-color);
}

.popular-item {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: opacity var(--transition-speed) ease;
}

.popular-item:hover {
  opacity: 0.8;
}

.popular-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.popular-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 12px;
  flex-shrink: 0;
}

.popular-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.popular-text {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.popular-date {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 8px;
}

.loading {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-secondary);
  font-size: 18px;
  background: white;
  border-radius: 16px;
  box-shadow: var(--shadow-md);
}

@media (max-width: 1024px) {
  .detail-layout {
    gap: 32px;
  }

  .article-card {
    padding: 40px;
  }
}

@media (max-width: 768px) {
  .detail-layout {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .sidebar {
    position: static;
  }

  .article-card {
    padding: 32px 24px;
  }

  .article-title {
    font-size: 32px;
  }

  .content-main,
  .content-expanded {
    font-size: 15px;
    line-height: 1.8;
  }

  .header-meta {
    gap: 12px;
    font-size: 13px;
  }

  .category-badge {
    font-size: 10px;
    padding: 6px 12px;
  }

  .article-image {
    margin-bottom: 32px;
    max-height: 400px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .read-more {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .detail-layout {
    gap: 16px;
  }

  .article-card {
    padding: 20px 16px;
    border-radius: 12px;
  }

  .article-header {
    margin-bottom: 24px;
    padding-bottom: 20px;
  }

  .article-title {
    font-size: 24px;
    line-height: 1.3;
  }

  .header-meta {
    flex-direction: column;
    gap: 8px;
    font-size: 12px;
  }

  .category-badge {
    font-size: 9px;
    padding: 6px 10px;
    gap: 4px;
  }

  .article-intro {
    padding: 12px;
    font-size: 14px;
    border-left-width: 3px;
  }

  .article-image {
    margin-bottom: 24px;
    max-height: 250px;
  }

  .content-main,
  .content-expanded {
    font-size: 14px;
    line-height: 1.7;
    text-align: left;
    margin-bottom: 20px;
  }

  .action-buttons {
    flex-direction: column;
    gap: 12px;
    margin-top: 24px;
    padding-top: 24px;
  }

  .read-more {
    width: 100%;
    justify-content: center;
    padding: 12px 20px;
    font-size: 14px;
  }

  .read-more .icon {
    font-size: 16px;
  }

  .popular-box {
    padding: 20px;
  }

  .popular-image {
    width: 80px;
    height: 80px;
  }

  .popular-text {
    font-size: 13px;
  }

  .back-button-prominent {
    padding: 12px 20px;
    font-size: 14px;
    margin-bottom: 24px;
  }
}

.loading {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-secondary);
  font-size: 18px;
}
</style>
