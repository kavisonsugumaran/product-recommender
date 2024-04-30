<template>
    <loading v-model:active="isLoading"
                 :is-full-page="true"
                 :color="'#F97316'"
                 :background-color="'#808080'"
                 :opacity="0.75"
                 :lock-scroll="true"/>
  <div class="p-8 pb-0 text-orange-500">
    <h1 class="text-4xl font-bold mb-12">Recommend items for <span class="title-span">{{ selectedProduct?.title }}</span></h1>
  </div>
  <Products :products="products" :isHomeView="isHomeView" />
</template>

<script>
import Products from "../components/Products.vue";
import api from '../api-config';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

export default {
  name: "RecommendedProducts",
  components: {
    Products,
    Loading
  },
  props: [],
  data() {
    return {
      products: [],
      productId: null,
      isHomeView: false,
      selectedProduct: null,
      isLoading: false,
    };
  },
  created() {
    this.productId = this.$route.params.id;
    this.getProductDetails();
    this.getRecommendedProducts();
  },
  computed: {
  },
  methods: {
    fetchTopProducts() {
      api.get(`/most-selling_product?top_n=9`)
        .then(response => {
          this.products = response.data;
        })
        .catch(error => {
          this.error = error.message;
        });
    },
    getRecommendedProducts() {
      this.isLoading = true;
      api.get(`/recommend-top-items-by-item?item_id=${this.productId}&top_n=9`)
        .then(response => {
          this.products = response.data;
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
    },
    getProductDetails() {
      api.get(`/get-product-by-id?product_id=${this.productId}`)
        .then(response => {
          this.selectedProduct = response.data;
        })
        .catch(error => {
        });
    }
  },
  watch: {},
};
</script>

<style scoped>
.title-span {
  color: #976; /* Black color */
  /* font-size: 1rem; 1.2 times the default size */
}
</style>
