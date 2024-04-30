import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../components/DefaultLayout.vue";
import MostSoldProducts from "../views/MostSoldProducts.vue";
import ProductDetails from "../views/ProductDetails.vue";
import RecommendedProducts from "../views/RecommendedProducts.vue";
import RecommendBySearch from "../views/RecommendBySearch.vue";
import Home from "../views/Home.vue";
import SearchProducts from "../views/SearchProducts.vue";

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: '/mostSoldProducts',
        name: 'mostSoldProducts',
        component: MostSoldProducts,
      },
      {
        path: '/product-details/:id?',
        name: 'productDetails',
        component: ProductDetails,
      },
      {
        path: '/recommended-products/:id?',
        name: 'recommendedProducts',
        component: RecommendedProducts,
      },
      {
        path: '/recommend-by-search',
        name: 'recommendBySearch',
        component: RecommendBySearch,
      },
      {
        path: '/searched-products/:title?',
        name: 'searchProducts',
        component: SearchProducts,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
