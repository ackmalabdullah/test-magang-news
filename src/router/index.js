import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DetailView from '../views/DetailView.vue';
import CategoryView from '../views/CategoryView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },

  {
    path: '/category/:category',
    name: 'category',
    component: CategoryView,
  },

  {
    path: '/detail/:title',
    name: 'detail',
    component: DetailView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
