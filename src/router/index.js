import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import translation from "@/i18n/translation";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:locale?',
      name: 'home',
      beforeEnter: translation.routeMiddleware,
      component: HomeView
    },
    {
      path: '/about/:locale?',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
});

export default router;
