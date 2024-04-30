<template>
  <div class="max-w-[800px] mx-auto p-8">
    <h1 class="text-4xl font-bold mb-5 text-orange-500">{{ product?.title }}</h1>
    <img :src="product?.images[0].hi_res || product?.images[0]?.large || product?.images[0]?.thumb" :alt="product?.images[0].variant" class="max-w-[100%]">
    <div class="grid grid-cols-1 sm:grid-cols-3 text-lg py-2">
      <div>
        <strong class="font-bold">Rating:</strong> {{ product?.average_rating }}
      </div>
      <div>
        <strong class="font-bold">Price:</strong> $ {{ product?.price }}
      </div>
      <div>
        <strong class="font-bold">Main Category:</strong> {{ product?.main_category }}
      </div>
    </div>

    <div class="my-3">
      {{ product?.description }}
    </div>
    <div class="product-features">
      <h2 class="section-title font-bold" v-if="product?.features">Features</h2>
      <ul class="feature-list">
        <li v-for="(feature, index) in product?.features?.split('|')" :key="index">{{ feature }}</li>
      </ul>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2">
      <div class="mt-10">
        <button class="bg-orange-500 text-white px-4 py-2 rounded-lg" @click="recommendProducts(product?.parent_asin)">
          Recommend Similar Products
        </button>
      </div>
    </div>


  </div>
</template>

<script>
import api from '../api-config';

export default {
  name: 'ProductDetails',
  components: {
  },
  data() {
    return {
      productId: null,
    product: null
    };
  },
  mounted() {
    this.productId = this.$route.params.id;
    this.getProductDetails();
  },
  methods: {
    getProductDetails() {
      api.get(`/get-product-by-id?product_id=${this.productId}`)
        .then(response => {
          this.product = response.data;
        })
        .catch(error => {
        });
    },
    recommendProducts(id) {
      this.$router.push({ name: 'recommendedProducts', params: { id: id } });
    },
  },
};

</script>

