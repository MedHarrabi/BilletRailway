import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import ContactUs from '../views/ContactUs.vue';
import translation from "../i18n/translation";
import token_service from '../services/token.service'
import { useUsersStore } from "../stores/auth.store";

const home = () => import('../views/HomeView.vue')
const adminHome = () => import('../views/admin/index.vue')
const about = () => import('../views/AboutView.vue')
const travels = () => import('../views/admin/travels/List.vue')
const createTravel = () => import('../views/admin/travels/Create.vue')
const editTravel = () => import('../views/admin/travels/[id].vue')
const notFound = () => import('../views/NotFound.vue')



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
      path: '/contact/:locale?',
      name: 'contact us',
      beforeEnter: translation.routeMiddleware,
      component: ContactUs
    },
    /* {
      path: '/admin/:locale?',
      name: 'home',
      beforeEnter: translation.routeMiddleware,
      component: adminHome,
    }, */
    {
      path: '/about/:locale?',
      name: 'about',
      component: AboutView
    },
    /* {
      path: '/admin/:locale?',
      component: adminHome,
      children: [
        {
          path: '/travels',
          name: 'list travels',
          component: travels
        },
        {
          path: '/travels/create',
          name: 'create travel',
          component: createTravel
        },
        {
          path: '/travels/:id',
          name: 'edit travel',
          component: editTravel
        },
      ]
    }, */
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: notFound
    },
  ]
});

router.beforeEach((_to, _from, next) => {
  console.log(`${JSON.stringify(_to)}`);
  const user_store = useUsersStore()
  if (_to.fullPath.includes('admin')) {
    if (user_store.isLoggedIn && token_service.getRole() === 'ADMIN') {
      next()
    } else {
      console.log(`this route is not opened bcs you are not signed in or u are not an ADMIN`);
    }
  }
})

export default router;
