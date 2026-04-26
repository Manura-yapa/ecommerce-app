import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import type { Product } from '../types/Product';

export const useCartStore = defineStore('cart', () => {
 
  const savedCart = localStorage.getItem('techstore-cart');
  const items = ref<Product[]>(savedCart ? JSON.parse(savedCart) : []);

  
  watch(items, (newItems) => {
    localStorage.setItem('techstore-cart', JSON.stringify(newItems));
  }, { deep: true });

  const totalItems = computed(() => items.value.length);
  
  const totalPrice = computed(() => {
    const sum = items.value.reduce((total, item) => total + item.price, 0);
    return Number(sum.toFixed(2));
  });

  const addToCart = (product: Product) => {
    items.value.push(product);
  };

  const removeFromCart = (productId: number) => {
    const index = items.value.findIndex(item => item.id === productId);
    if (index > -1) {
      items.value.splice(index, 1);
    }
  };

  
  const clearCart = () => {
    items.value = [];
  };

  return { items, totalItems, totalPrice, addToCart, removeFromCart, clearCart };
});