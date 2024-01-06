/* import { createRouter, createWebHistory } from 'vue-router';
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
      path: '/:locale?/contact',
      name: 'contact us',
      beforeEnter: translation.routeMiddleware,
      component: ContactUs
    },
    {
      path: '/:locale?/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/:locale?/admin',
      component: adminHome,
      children: [
        {
          path: '/:locale?/travels',
          name: 'list travels',
          component: travels
        },
        {
          path: '/:locale?/travels/create',
          name: 'create travel',
          component: createTravel
        },
        {
          path: '/:locale?/travels/:id',
          name: 'edit travel',
          component: editTravel
        },
      ]
    },
    {
      path: '/:locale?/:pathMatch(.*)*',
      name: 'NotFound',
      component: notFound
    },
  ]
});

router.beforeEach((_to, _from, next) => {
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
 */
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import translation from "@/i18n/translation";
import { useUsersStore } from '../stores/auth.store';
import token_service from '../services/token.service';
//import { useI18n } from 'vue-i18n';

//const { t, locale } = useI18n()

const adminHome = () => import('../views/admin/index.vue')
const about = () => import('../views/AboutView.vue')
const travels = () => import('../views/admin/travels/List.vue')
const createTravel = () => import('../views/admin/travels/Create.vue')
const editTravel = () => import('../views/admin/travels/[id].vue')
const reservations = () => import('../views/admin/reservedTickets/List.vue')
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
      path: '/:locale?/contact',
      name: 'contact us',
      beforeEnter: translation.routeMiddleware,
      component: () => import('../views/ContactUs.vue')
    },
    {
      path: '/:locale?/about',
      name: 'about',
      beforeEnter: translation.routeMiddleware,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/:locale?/admin',
      name: 'admin home',
      component: adminHome,
      beforeEnter: translation.routeMiddleware,
    },
    {
      path: '/:locale?/admin/travels',
      name: 'list travels',
      beforeEnter: translation.routeMiddleware,
      component: travels,
    },
    {
      path: '/:locale?/admin/travel/:id',
      beforeEnter: translation.routeMiddleware,
      name: 'edit travel',
      component: editTravel
    },
    {
      path: '/:locale?/admin/travel/create',
      beforeEnter: translation.routeMiddleware,
      name: 'create travel',
      component: createTravel
    },
    {
      path: '/:locale?/admin/reservations',
      name: 'list reservations',
      beforeEnter: translation.routeMiddleware,
      component: reservations,
    },
    {
      path: '/:locale?/:pathMatch(.*)*',
      name: 'NotFound',
      component: notFound
    },
  ]
});

router.beforeEach((_to, _from, next) => {
  const user_store = useUsersStore()
  if (_to.fullPath.includes('admin')) {
    // ADMIN ROUTES
    if (user_store.isLoggedIn) {
      if (token_service.getRole() === 'ADMIN') {
        next()
      } else {
        next(`/${localStorage.getItem("user-locale")}/`)
        //next(`/${locale.value}/`)
      }
    } else {
      next(`/${localStorage.getItem("user-locale")}/`)
      //next(`/${locale.value}/`)
    }
  } else {
    // USER ROUTES
    if (user_store.isLoggedIn) {
      if (token_service.getRole() === 'USER') {
        next()
      } else {
        //next(`/${locale.value}/admin`)
        next(`/${localStorage.getItem("user-locale")}/admin`)
      }
    } else {
      next()
    }
  }
})

export default router;