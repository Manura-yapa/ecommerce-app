<script setup lang="ts">
import NavBar from './components/NavBar.vue';

// We catch the search text from NavBar and broadcast it so HomeView can hear it
const handleSearch = (query: string) => {
  window.dispatchEvent(new CustomEvent('search-updated', { detail: query }));
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <NavBar @update:search="handleSearch" />

    <router-view />
  </div>
</template>