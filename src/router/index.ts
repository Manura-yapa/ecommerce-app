import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductDetails from '../views/ProductDetails.vue';
// 1. Import the new view
import CartView from '../views/CartView.vue'; 

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/product/:id',
      name: 'product-details',
      component: ProductDetails
    },
    // 2. Add the specific route for the cart
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    }
  ]
});

export default router;