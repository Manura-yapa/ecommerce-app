<script setup lang="ts">


const handleCheckout = () => {
  if (cartStore.totalItems === 0) return;
  
  
  alert(`Success! Your order for $${cartStore.totalPrice} has been placed.\nThank you for shopping at TechStore!`);
  cartStore.clearCart();
  router.push('/');
};


import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cartStore';

const router = useRouter();
const cartStore = useCartStore();
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 class="text-3xl font-extrabold text-gray-900 mb-8">Your Shopping Cart</h1>

    <div v-if="cartStore.totalItems === 0" class="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div class="text-6xl mb-4">🛒</div>
      <h2 class="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
      <p class="text-gray-500 mb-6">Looks like you haven't added any products yet.</p>
      <button 
        @click="router.push('/')" 
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-md"
      >
        Start Shopping
      </button>
    </div>

    <div v-else class="flex flex-col lg:flex-row gap-8">
      
      <div class="lg:w-2/3 space-y-4">
        <div 
          v-for="item in cartStore.items" 
          :key="item.id" 
          class="flex items-center gap-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100"
        >
          <div class="h-24 w-24 bg-gray-50 rounded-lg flex-shrink-0 flex items-center justify-center p-2">
            <img :src="item.thumbnail" :alt="item.title" class="max-h-full max-w-full object-contain">
          </div>
          
          <div class="flex-grow">
            <h3 class="font-bold text-lg text-gray-900">{{ item.title }}</h3>
            <p class="text-gray-500 text-sm capitalize">{{ item.category }}</p>
          </div>
          
          <div class="text-right">
            <p class="font-extrabold text-xl text-blue-600 mb-2">${{ item.price }}</p>
            <button 
              @click="cartStore.removeFromCart(item.id)" 
              class="text-sm text-red-500 hover:text-red-700 font-semibold transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <div class="lg:w-1/3">
        <div class="bg-white p-6 rounded-2xl shadow-md border border-gray-100 sticky top-24">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
          
          <div class="flex justify-between text-gray-600 mb-4">
            <span>Items ({{ cartStore.totalItems }})</span>
            <span>${{ cartStore.totalPrice }}</span>
          </div>
          
          <div class="flex justify-between text-gray-600 mb-6">
            <span>Shipping</span>
            <span class="text-green-500 font-semibold">Free</span>
          </div>
          
          <div class="border-t border-gray-200 pt-4 mb-8 flex justify-between items-center">
            <span class="font-bold text-gray-900">Total</span>
            <span class="font-black text-3xl text-gray-900">${{ cartStore.totalPrice }}</span>
          </div>
          
          <button 
            @click="handleCheckout"
            class="w-full bg-gray-900 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-colors duration-300 shadow-md text-lg"
            >
            Proceed to Checkout
          </button> 
        </div>
      </div>

    </div>
  </div>
</template>