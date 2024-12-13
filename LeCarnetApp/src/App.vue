<script setup>
import Login from './components/Home.vue'

import { ref } from 'vue';
import { useAuth } from './store/auth.js'

import MenuDrawer from './components/MenuDrawer.vue';
import { isDrawerOpen } from './store/index.ts'
import Menubars from './assets/menubars.svg'
import { RouterLink } from 'vue-router';


const LoginStore = useAuth(); /// Stores user information

function toggleDrawer () {
  if (isDrawerOpen.value == false) {
    isDrawerOpen.value = true
  } else {
    isDrawerOpen.value = false
  }
}


</script>

<template>
  <header class="flex justify-between items-center px-5 bg-slate-50 dark:bg-slate-900">
      <h1 class="text-5xl font-title text-slate-900 dark:text-slate-50 my-10"><RouterLink to="/">LeCarnet</RouterLink></h1>
      <button v-if="LoginStore.user !== null" v-on:click="toggleDrawer" class="w-[30px] h-[30px] relative right-3 bottom-1 dark:invert"><Menubars /></button>
  </header>
  <main class= "bg-slate-50 dark:bg-slate-900 dark:*:text-slate-100 grow px-5">
    <MenuDrawer v-on:click="toggleDrawer"/>
    <RouterView />
  </main>
  <footer class= "bottom-0 z-0 min-w-full bg-slate-50 dark:bg-slate-900 dark:*:text-slate-100">
    <h3 class="font-title text-center">LeCarnet - Florian Antoine</h3>
  </footer>

</template>

<style>


</style>
