<template>
  <loading v-model:active="isLoading"
                 :is-full-page="true"
                 :color="'#F97316'"
                 :background-color="'#808080'"
                 :opacity="0.75"
                 :lock-scroll="true"/>
  <div class="p-8 pb-0 text-orange-500">
    <h1 class="text-4xl font-bold mb-12">Most Sold Items</h1>
  </div>
  <Products :products="products" :isHomeView="isHomeView" />
</template>

<script>
import Products from "../components/Products.vue";
import api from '../api-config';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

export default {
  name: "MostSoldProducts",
  components: {
    Products,
    Loading
  },
  props: [],
  data() {
    return {
      products: [],
      isHomeView: true,
      isLoading: false,
    };
  },
  created() {
    this.fetchTopProducts();
  },
  computed: {
  },
  methods: {
    fetchTopProducts() {
      this.isLoading = true;
      api.get(`/most-selling_product?top_n=9`)
        .then(response => {
          this.products = response.data;
          this.isLoading = false;
        })
        .catch(error => {
          this.error = error.message;
          this.isLoading = false;
        });
    },
  },
  watch: {},
};
</script>
