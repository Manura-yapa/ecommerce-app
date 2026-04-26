import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Product } from '../types/Product';

export const useCartStore = defineStore('cart', () => {
  // STATE: The array holding our cart items
  const items = ref<Product[]>([]);

  // GETTERS: Automatically calculate values based on the state
  const totalItems = computed(() => items.value.length);
  
  // NEW: Calculates the total cost of the cart, rounding to 2 decimal places
  const totalPrice = computed(() => {
    const sum = items.value.reduce((total, item) => total + item.price, 0);
    return Number(sum.toFixed(2));
  });

  // ACTIONS: Functions that modify the state
  const addToCart = (product: Product) => {
    items.value.push(product);
  };

  // NEW: Finds the item by ID and removes exactly one instance of it
  const removeFromCart = (productId: number) => {
    const index = items.value.findIndex(item => item.id === productId);
    if (index > -1) {
      items.value.splice(index, 1);
    }
  };

  return { items, totalItems, totalPrice, addToCart, removeFromCart };
});