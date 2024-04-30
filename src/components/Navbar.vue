<template>
    <header class="bg-black shadow h-30 flex justify-between items-stretch">
      <router-link
        :to="{ name: 'home' }"
        class="inline-flex items-center h-full px-5 text-orange-500 font-bold"
      >
        <img src="../assets/images/logo.png" alt="Logo" width="125" height="125">
      </router-link>
      <div class="flex items-center gap-1">
        <router-link
          :to="{ name: 'mostSoldProducts' }"
          class="inline-flex items-center px-16 h-full transition-colors text-2xl hover:bg-orange-500 text-orange-500 hover:text-white font-bold" 
        >
          Most Sold Items
        </router-link>
        <router-link
          :to="{ name: 'recommendBySearch' }"
          class="inline-flex items-center px-16 h-full transition-colors text-2xl hover:bg-orange-500 text-orange-500 hover:text-white font-bold" 
        >
          Recommend Me
        </router-link>
      </div>
    </header>
  </template>
  