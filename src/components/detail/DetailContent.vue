<template>
  <article class="detail-content">
    <div class="article-header">
      <h1>{{ article.title }}</h1>
      <div class="article-meta">
        <span class="author">By {{ article.author }}</span>
        <span class="date">{{ formatDate(article.date) }}</span>
      </div>
    </div>

    <div class="article-image">
      <img :src="article.image || 'https://via.placeholder.com/800x400'" :alt="article.title" />
    </div>

    <div class="article-body">
      {{ article.content }}
    </div>
  </article>
</template>

<script>
export default {
  name: 'DetailContent',
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
  },
};
</script>

<style scoped>
.detail-content {
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
}

.article-header {
    margin-bottom: 32px;
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 24px;
}

.article-header h1 {
  font-size: 42px;
  margin-bottom: 16px;
  line-height: 1.3;
  font-weight: 800;
  color: var(--text-primary);
}

.article-meta {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  color: var(--text-secondary);
  font-size: 14px;
}

.article-image {
  width: 100%;
  height: 450px;
  overflow: hidden;
  border-radius: var(--border-radius);
  margin-bottom: 32px;
  box-shadow: var(--shadow-md);
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-body {
  line-height: 1.9;
  color: var(--text-secondary);
  font-size: 16px;
}

@media (max-width: 768px) {
  .detail-content {
    padding: 24px;
  }

  .article-header h1 {
    font-size: 28px;
  }

  .article-image {
    height: 300px;
    margin-bottom: 24px;
  }

  .article-body {
    font-size: 15px;
  }
}

@media (max-width: 576px) {
  .detail-content {
    padding: 16px;
  }

  .article-header {
    margin-bottom: 20px;
    padding-bottom: 16px;
  }

  .article-header h1 {
    font-size: 20px;
  }

  .article-meta {
    gap: 12px;
    font-size: 13px;
  }

  .article-image {
    height: 200px;
  }
}
</style>
