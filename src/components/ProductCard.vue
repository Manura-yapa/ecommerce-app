<script setup lang="ts">
import type { Product } from '../types/Product';
import { useCartStore } from '../stores/cartStore';

defineProps<{
  product: Product;
}>();

const cartStore = useCartStore();
</script>

<template>
  <div class="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100 group">
    
    <router-link :to="`/product/${product.id}`" class="h-48 w-full bg-white rounded-md mb-4 overflow-hidden flex items-center justify-center p-2 cursor-pointer">
      <img :src="product.thumbnail" :alt="product.title" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300">
    </router-link>
    
    <div class="flex-grow flex flex-col justify-between">
      <div>
        <router-link :to="`/product/${product.id}`" class="hover:text-blue-600 transition-colors cursor-pointer">
          <h2 class="font-bold text-lg text-gray-800 line-clamp-1" :title="product.title">{{ product.title }}</h2>
        </router-link>
        <p class="text-gray-500 text-sm mt-1 capitalize">{{ product.category }}</p>
      </div>
      
      <div class="mt-4 flex justify-between items-center">
        <span class="text-blue-600 font-extrabold text-xl">${{ product.price }}</span>
        <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
          ★ {{ product.rating }}
        </span>
      </div>
      
      <button 
        @click="cartStore.addToCart(product)" 
        class="mt-4 w-full bg-gray-900 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition-colors duration-200"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>