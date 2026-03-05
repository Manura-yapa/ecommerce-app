<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Product, ProductResponse } from './types/Product';

import NavBar from './components/NavBar.vue';
import ProductCard from './components/ProductCard.vue';

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
  
  <div class="min-h-screen bg-gray-50">
    
    <NavBar />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div v-if="error" class="text-red-500 font-bold p-4 bg-red-100 rounded text-center">
        {{ error }}
      </div>
      
      <div v-else-if="products.length === 0" class="text-gray-500 text-center py-20 text-xl animate-pulse">
        Loading amazing products...
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        <ProductCard 
          v-for="product in products" 
          :key="product.id" 
          :product="product" 
        />
        
      </div>
    </main>
  </div>
</template>