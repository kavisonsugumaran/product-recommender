<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-5 px-8">
    <ProductItem v-for="product of products" :key="product.parent_asin" :product="product" :isHomeView="isHomeView" />
  </div>
  <div v-if="products.length == 0" class="flex justify-center text-gray-600 p-8">
    There are no products to display
  </div>
</template>

<script>
import ProductItem from './ProductItem.vue';
export default {
  name: 'Home',
  components: {
    ProductItem,
  },
  props: ["products", "isHomeView"],
  
}
</script>
