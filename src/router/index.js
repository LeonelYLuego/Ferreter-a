import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
  routes: [
    {
      path: '/products',
      name: 'Products',
      component: () => import('../views/Products')
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    }
  ]
})

export default Router;