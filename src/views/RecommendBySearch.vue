<template>
    <loading v-model:active="isLoading" :is-full-page="true" :color="'#F97316'" :background-color="'#808080'"
        :opacity="0.75" :lock-scroll="true" />
    <div class="p-8 pb-0 text-orange-500">
        <h1 class="text-4xl font-bold mb-12">Recommend by Search</h1>
    </div>
    <div class="flex items-center justify-center p-8 space-x-4">
        <VueMultiselect v-model="selectedTitleOption" :options="titleOptions" :multiple="false" track-by="title"
            :searchable="true" :custom-label="customLabel" @search-change="getTitleDropdownValues" :disabled="disableTitleDropdown">
        </VueMultiselect>
        <VueMultiselect v-model="selectedIdOption" :options="idOptions" :multiple="false" track-by="parent_asin"
            :searchable="true" :custom-label="customIdLabel" @search-change="getIdDropdownValues" :disabled="disableIdDropdown">
        </VueMultiselect>
        <button 
            class="bg-green-500 text-white px-4 py-2 rounded-lg" 
            :class="{ 'disabled': disabledResetButton }" 
            :disabled="disabledResetButton" 
            @click="reset"
        >
            Reset
        </button>
        <button 
            class="bg-orange-500 text-white px-4 py-2 rounded-lg" 
            :class="{ 'disabled': disabledRecommendationButton }" 
            :disabled="disabledRecommendationButton" 
            @click="recommendProducts"
        >
            Recommend
        </button>
    </div>
    <Products v-if="!pageLoad" :products="products" :isHomeView="isHomeView" />
</template>

<script>
import Products from "../components/Products.vue";
import api from '../api-config';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import VueMultiselect from 'vue-multiselect';
import { debounce } from 'lodash';

export default {
    name: "RecommendBySearch",
    components: {
        Products,
        Loading,
        VueMultiselect
    },
    props: [],
    data() {
        return {
            pageLoad: true,
            products: [],
            productId: null,
            isHomeView: false,
            selectedProduct: null,
            isLoading: false,
            selectedTitleOption: null,
            selectedIdOption: null,
            titleOptions: [],
            idOptions: [],
            allProducts: [],
        };
    },
    created() {
        //this.getAllProducts();
    },
    computed: {
        disabledRecommendationButton() {
            return !this.selectedTitleOption && !this.selectedIdOption;
        },
        disableTitleDropdown() {
            return this.selectedIdOption;
        },
        disableIdDropdown() {
            return this.selectedTitleOption;
        },
        disabledResetButton() {
            return !this.selectedTitleOption && !this.selectedIdOption;
        }
    },
    methods: {
        customLabel(option) {
            return `${option.title}`
        },
        customIdLabel(option) {
            return `${option.parent_asin}`
        },
        getTitleDropdownValues: debounce(function (searchQuery) {
            if (searchQuery && searchQuery.trim() !== '') {
                this.isLoading = true;
                api.get(`/all-products-by-title?titlesearchstring=${searchQuery}`)
                .then(response => {
                    this.titleOptions = response.data;
                    this.isLoading = false;
                })
                .catch(error => {
                    this.isLoading = false;
                });
            }
        }, 1000),
        getIdDropdownValues: debounce(function (searchQuery) {
            if (searchQuery && searchQuery.trim() !== '') {
                this.isLoading = true;
                api.get(`/all-products-by-id?product_id=${searchQuery}`)
                .then(response => {
                    this.idOptions = response.data;
                    this.isLoading = false;
                })
                .catch(error => {
                    this.isLoading = false;
                });
            }
        }, 1000),
        getAllProducts() {
            this.isLoading = true;
            api.get(`/all-products`)
                .then(response => {
                    this.allProducts = response.data;
                    this.isLoading = false;
                })
                .catch(error => {
                    this.isLoading = false;
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
        recommendProducts() {
            if (this.selectedTitleOption) {
                this.productId = this.selectedTitleOption.parent_asin;
                this.getRecommendedProducts();
                this.pageLoad = false;
            }
            if (this.selectedIdOption) {
                this.productId = this.selectedIdOption.parent_asin;
                this.getRecommendedProducts();
                this.pageLoad = false;
            }
        },
        reset() {
            this.selectedTitleOption = null;
            this.selectedIdOption = null;
        }
    },
    watch: {},
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style scoped>
.title-span {
    color: #976;
    /* Black color */
    /* font-size: 1rem; 1.2 times the default size */
}

.disabled {
  opacity: 0.5; /* Example styling for a disabled button */
  cursor: not-allowed; /* Example styling for a disabled button */
}

.form-select {
    @apply w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm;
}
</style>