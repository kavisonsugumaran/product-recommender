<template>
  <div class="landing-page">
    <div class="logo-container">
      <img src="../assets/images/logo.png" alt="Company Logo">
    </div>
    <div class="search-box">
      <input type="text" placeholder="Enter product title" v-model="searchQuery">
      <button :class="{ 'disabled': !searchQuery }" :disabled="!searchQuery" @click="search">Search</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      searchQuery: ""
    }
  },
  methods: {
    search() {
      this.$router.push({ name: 'searchProducts', params: { title: this.searchQuery } });
    },

  }
}
</script>

<style>
.landing-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}

.logo-container {
  margin-bottom: 20px;
}

.logo-container img {
  max-width: 400px;
  height: auto;
}

.search-box {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}

.search-box input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  width: 300px;
  font-size: 16px;
}

.search-box button {
  padding: 10px 20px;
  background-color: #F97316;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.disabled {
  opacity: 0.5; 
  cursor: not-allowed; 
}
</style>
