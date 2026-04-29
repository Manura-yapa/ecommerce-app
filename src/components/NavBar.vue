<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCartStore } from '../stores/cartStore';

const emit = defineEmits(['update:search']);
const searchQuery = ref('');
const cartStore = useCartStore();


const isDark = ref(false);


onMounted(() => {
  if (localStorage.getItem('theme') === 'dark') {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  }
});


const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};


const onInput = () => {
  emit('update:search', searchQuery.value);
};

</script>

<template>
  <nav class="bg-gray-900 text-white p-4 shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-4 px-2 sm:px-6 lg:px-8">
      
      <div class="order-1">
        <h1 class="text-2xl font-bold tracking-wider">ShopLux<span class="text-blue-500">.</span></h1>
      </div>
      
      <div class="flex items-center gap-4 order-2 md:order-3">
        <router-link to="/cart" class="text-gray-300 hover:text-white cursor-pointer transition font-medium flex items-center gap-2">
          🛒 Cart 
          <span class="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
            {{ cartStore.totalItems }}
          </span>
        </router-link>

        <button 
          @click="toggleTheme" 
          class="p-2 rounded-full hover:bg-gray-800 transition-colors text-xl"
          title="Toggle Dark Mode"
        >
          {{ isDark ? '☀️' : '🌙' }}
        </button>
      </div>

      <div class="w-full md:w-auto md:flex-1 md:max-w-md mx-auto order-3 md:order-2">
        <input 
          type="text" 
          v-model="searchQuery" 
          @input="onInput"
          placeholder="Search products..." 
          class="w-full px-4 py-2 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 transition-all"
        />
      </div>
      
    </div>
  </nav>
</template>