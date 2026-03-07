<script setup lang="ts">

    defineProps<{
        categories: string[];
        selectedCategory: string;
    }>();

    const emit = defineEmits(['update:category']);


</script>

<template>
    <div class="flex items-center gap-3 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
    <label for="category" class="font-bold text-gray-700">Filter by Category:</label>
    
    <select 
      id="category"
      :value="selectedCategory"
      @change="emit('update:category', ($event.target as HTMLSelectElement).value)"
      class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize bg-gray-50 hover:bg-white transition-colors cursor-pointer"
    >
      <option value="">All Categories</option>
      
      <option v-for="category in categories" :key="category" :value="category">
        {{ category.replace('-', ' ') }}
      </option>
    </select>
  </div>





</template>