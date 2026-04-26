<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Product, ProductResponse } from '../types/Product';
import ProductCard from '../components/ProductCard.vue';
import FilterBar from '../components/FilterBar.vue';

const products = ref<Product[]>([]);
const error = ref<string | null>(null);

const searchQuery = ref('');
const selectedCategory = ref('');

const uniqueCategories = computed(() => {
  const allCategories = products.value.map(p => p.category);
  return [...new Set(allCategories)];
});

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          product.brand?.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value === '' || product.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});

const handleCategoryChange = (category: string) => {
  selectedCategory.value = category;
};

// Listen for custom events dispatched from the window (our NavBar search)
window.addEventListener('search-updated', (e: Event) => {
  const customEvent = e as CustomEvent;
  searchQuery.value = customEvent.detail;
});

onMounted(async () => {
  try {
    const res = await fetch('https://dummyjson.com/products');
    const data: ProductResponse = await res.json();
    products.value = data.products;
  } catch (err) {
    error.value = 'Failed to load products. Check network.';
    console.error(err);
  }
});
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <FilterBar 
      v-if="products.length > 0"
      :categories="uniqueCategories" 
      :selectedCategory="selectedCategory"
      @update:category="handleCategoryChange"
    />

    <div v-if="error" class="text-red-500 font-bold p-4 bg-red-100 rounded text-center">
      {{ error }}
    </div>
    <div v-else-if="products.length === 0" class="text-gray-500 text-center py-20 text-xl animate-pulse">
      Loading amazing products...
    </div>
    <div v-else-if="filteredProducts.length === 0" class="text-center py-20">
      <h2 class="text-2xl font-bold text-gray-700">No products match your filters</h2>
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard 
        v-for="product in filteredProducts" 
        :key="product.id" 
        :product="product" 
      />
    </div>
  </div>
</template>