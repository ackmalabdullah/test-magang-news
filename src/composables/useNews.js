import { ref } from 'vue';
import { getNews } from '@/services/api';

export function useNews() {
  const news = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchNews = async (category = 'beranda') => {
    loading.value = true;
    error.value = null;
    try {
      const data = await getNews(category);
      news.value = data;
    } catch (err) {
      error.value = err.message;
      console.error('Error fetching news:', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    news,
    loading,
    error,
    fetchNews,
  };
}
