import Vue from 'vue';
import App from './components/App.vue';
import VueRouter from 'vue-router';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/index.css' // costum global stylezz
import Dashboard from '@/components/Dashboard.vue';
import { firebaseApp } from './firebase'
import store from './store'

Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: '/dashboard',
      name: 'home',
      beforeEnter: (to, from, next) => {
        if (!store.state.user) {
          next('/signin')
        } else {
          next();
        }
      },
      component: Dashboard,
    },
    {
      path: '/signin',
      name: 'Signin',
      component: () => import(/* webpackChunkName: "signin" */ './components/Signin.vue'),
    },
    {
      path: '/about',
      name: 'About',
      component: () => import(/* webpackChunkName: "about" */ './components/About.vue'),
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import(/* webpackChunkName: "signup" */ './components/Signup.vue'),
    },
  ],
});

firebaseApp
  .auth()
  .onAuthStateChanged(user => {
    console.log('onAuthStateChanged');
    if (user) {
      store.dispatch('signIn', user);
      router.push('/dashboard');
    } else {
      store.dispatch('signOut');
      router.replace('/signin');
    }
  });

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})