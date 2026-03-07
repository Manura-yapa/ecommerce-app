<script setup lang="ts">
  import { ref, watch } from 'vue';

  const emit = defineEmits(['update:search']);
  const searchQuery = ref('');
  watch(searchQuery, (newValue) => {
  emit('update:search', newValue);
});




</script>



<template>
  <nav class="bg-gray-900 text-white p-4 shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-bold tracking-wider">TechStore<span class="text-blue-500">.</span></h1>
      
      <div class="flex gap-4">
        <div class="relative">
          <input 
            type="text" 
            v-model="searchQuery" 
            
            placeholder="Search products..." 
            class="bg-white px-4 py-1.5 rounded-full text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 sm:w-64 transition-all"          />
        </div>

        <span class="text-gray-300 hover:text-white cursor-pointer transition">Search</span>
        <span class="text-gray-300 hover:text-white cursor-pointer transition">Cart (0)</span>
      </div>
    </div>
  </nav>
</template>