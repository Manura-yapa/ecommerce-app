<script setup lang="ts">
import NavBar from './components/NavBar.vue';

 
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