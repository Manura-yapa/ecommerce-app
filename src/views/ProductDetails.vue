<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Product } from '../types/Product';
import { useCartStore } from '../stores/cartStore';

// 1. Get the router and the current URL parameters
const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

// 2. State for a SINGLE product
const product = ref<Product | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

// 3. Fetch just the one product when the page loads
onMounted(async () => {
  try {
    // We use route.params.id to get the number from the URL
    const res = await fetch(`https://dummyjson.com/products/${route.params.id}`);
    if (!res.ok) throw new Error('Product not found');
    product.value = await res.json();
  } catch (err) {
    error.value = 'Failed to load product details.';
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    
    <button @click="router.push('/')" class="mb-8 text-gray-500 hover:text-blue-600 font-semibold flex items-center gap-2 transition-colors">
      ← Back to Products
    </button>

    <div v-if="loading" class="text-center py-20 text-gray-500 text-xl animate-pulse">Loading product details...</div>
    <div v-else-if="error" class="text-center py-20 text-red-500 font-bold">{{ error }}</div>
    
    <div v-else-if="product" class="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
      
      <div class="md:w-1/2 bg-gray-50 p-8 flex items-center justify-center">
        <img :src="product.thumbnail" :alt="product.title" class="max-w-full h-auto object-contain max-h-[400px]">
      </div>
      
      <div class="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <p class="text-sm text-blue-500 font-bold uppercase tracking-wider mb-2">{{ product.category }}</p>
        <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{{ product.title }}</h1>
        
        <div class="flex items-center gap-4 mb-6">
          <span class="text-4xl font-black text-gray-900">${{ product.price }}</span>
          <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold text-sm">
            ★ {{ product.rating }}
          </span>
        </div>
        
        <p class="text-gray-600 mb-8 leading-relaxed text-lg">{{ product.description }}</p>
        
        <button 
          @click="cartStore.addToCart(product)" 
          class="w-full bg-gray-900 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-colors duration-300 shadow-md hover:shadow-lg text-lg"
        >
          Add to Cart
        </button>
      </div>
      
    </div>
  </div>
</template>