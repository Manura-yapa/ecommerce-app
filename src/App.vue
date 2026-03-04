<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Product, ProductResponse } from './types/Product';

const products = ref<Product[]>([]);
const error = ref<string | null>(null);

  onMounted(async () => {
    try {
      console.log("Attempting to fetch data...");
      const res = await fetch('https://dummyjson.com/products');

      const data: ProductResponse = await res.json();

      products.value = data.products;
      console.log('Succcess! Data fetched:', products.value);
    } catch (err) {
      error.value = 'Failed to load products. Check your network connection.';
      console.error(err);
    }
  })

</script>

<template>
  <div class="p-10 bg-gray-50 min-h-screen">
    <h1 class="text-3xl font-bold text-blue-600 mb-6">Step 4 Check: Data Fetching</h1>
    
    <div v-if="error" class="text-red-500 font-bold p-4 bg-red-100 rounded">
      {{ error }}
    </div>
    
    <div v-else-if="products.length === 0" class="text-gray-500">
      Loading products...
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div 
        v-for="product in products" 
        :key="product.id" 
        class="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
      >
        <img :src="product.thumbnail" :alt="product.title" class="h-40 w-full object-cover rounded-md mb-4">
        <h2 class="font-bold text-lg text-gray-800">{{ product.title }}</h2>
        <p class="text-green-600 font-semibold">${{ product.price }}</p>
        <p class="text-gray-500 text-sm mt-2 line-clamp-2">{{ product.description }}</p>
      </div>
    </div>
  </div>
</template>