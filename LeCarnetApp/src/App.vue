<script setup lang="ts">
import { useAuth } from './store/auth.ts'

import MenuDrawer from './components/MenuDrawer.vue';
import Menubars from './assets/menubars.svg'
import { RouterLink } from 'vue-router';
import { ref } from 'vue';

const loginStore = useAuth(); /// Stores user information

const isMenuDrawerOpen = ref(false)

</script>

<template>
  <header class="flex justify-between items-center px-5 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-50">
      <h1 class="text-5xl font-title my-10"><RouterLink to="/">LeCarnet</RouterLink></h1>
      <button v-if="loginStore.user !== null" @click="isMenuDrawerOpen? isMenuDrawerOpen = false : isMenuDrawerOpen = true" class="w-[30px] h-[30px] relative right-3 bottom-1 dark:invert"><Menubars /></button>
  </header>
  <main class= "bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-50 dark:*:text-slate-100 grow px-5" @click="isMenuDrawerOpen = false">
    <MenuDrawer :is-opened="isMenuDrawerOpen"/>
    <RouterView />
  </main>
  <footer class= "bottom-0 z-0 min-w-full bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-50">
    <h3 class="font-title text-center">LeCarnet - Florian Antoine</h3>
  </footer>

</template>

<style>



</style>
