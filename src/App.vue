<script setup lang="ts">
import NavBar from './components/NavBar.vue';

 
const handleSearch = (query: string) => {
  window.dispatchEvent(new CustomEvent('search-updated', { detail: query }));
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <NavBar @update:search="handleSearch" />

    <router-view />
  </div>
</template>