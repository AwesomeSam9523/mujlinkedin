import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const routes = [
  {
    path: '/',
    component: () => import('@/views/LandingPage.vue'),
    name: 'Loading...',
  },
  {
    path: '/login',
    component: () => import('@/views/LoginPage.vue'),
    name: 'Login',
  },
  {
    path: '/feed',
    component: () => import('@/views/FeedPage.vue'),
    name: 'My Feed',
  },
  {
    path: '/profile/:userId',
    component: () => import('@/views/UserProfile.vue'),
    name: 'Profile',
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

router.beforeEach((to, from, next) => { // eslint-disable-line no-unused-vars
  if (!to.name) {
    return;
  }
  document.title = to.name.toString();
  next();
});

const app = createApp(App);
app.use(router);
app.use(Toast, {
  timeout: 3000,
  position: POSITION.BOTTOM_RIGHT,
});
app.mount('#app');
