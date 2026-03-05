<script setup lang="ts">
import type { Product } from '../types/Product';

defineProps<{
  product: Product;
}>();
</script>

<template>
  <div class="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100">
    
    <div class="h-48 w-full bg-white rounded-md mb-4 overflow-hidden flex items-center justify-center p-2">
      <img 
        :src="product.thumbnail" 
        :alt="product.title" 
        class="max-h-full max-w-full object-contain"
      >
    </div>
    
    <div class="flex-grow flex flex-col justify-between">
      <div>
        <h2 class="font-bold text-lg text-gray-800 line-clamp-1" :title="product.title">
          {{ product.title }}
        </h2>
        <p class="text-gray-500 text-sm mt-1 capitalize">{{ product.category }}</p>
      </div>
      
      <div class="mt-4 flex justify-between items-center">
        <span class="text-blue-600 font-extrabold text-xl">${{ product.price }}</span>
        <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
          ★ {{ product.rating }}
        </span>
      </div>
    </div>
    
  </div>
</template>