<template>
  <div class="product-card bg-white shadow rounded-xl hover:scale-105 transition-all relative">
    <router-link :to="{ name: 'productDetails', params: { id: product.parent_asin } }">
      <img :src="product?.images[0].hi_res || product?.images[0]?.large || product?.images[0]?.thumb" :alt="product?.images[0].variant"
        class="rounded-t-xl w-full h-48 object-cover" />
      <div class="p-3 mt-2">
        <h3 class="font-bold">{{ truncatedTitle }}</h3>
        <p>
          {{ truncatedDescription }}
        </p>
      </div>
    </router-link>
    <div v-if="isHomeView" class="absolute bottom-0 left-0 right-0 p-3 bg-white">
      <button class="bg-orange-500 text-white px-4 py-2 rounded-lg w-full" @click="recommendProducts(product.parent_asin)">
        Recommend Similar Products
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  components: {

  },
  props: ["product", "isHomeView"],
  created() {

  },
  computed: {
    truncatedTitle() {
      if (this.product?.title?.length <= 75) {
        return this.product?.title;
      } else {
        return this.product?.title?.substring(0, 75) + '...';
      }
    },
    truncatedDescription() {
      let maxLength;
      if (this.isHomeView) maxLength = 200;
      else maxLength = 400;
      if (this.product?.description == null) {
        return 'No description available';
      }
      if (this.product?.description?.length <= maxLength) {
        return this.product?.description;
      } else {
        return this.product?.description?.substring(0, maxLength) + '...';
      }
    },
  },
  methods: {
    recommendProducts(id) {
      this.$router.push({ name: 'recommendedProducts', params: { id: id } });
    },
  },
};

</script>

<style scoped>
.product-card {
  width: 350px; 
  height: 500px; 
}

.product-card p {
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;

  overflow: hidden;
  text-overflow: ellipsis;

  margin-top: 1rem;
  margin-bottom: 2rem;
  padding: 0;
}
</style>
