<script setup>
import Login from './components/Login.vue'
import ViewExercises from './components/ViewWorkouts.vue';
import WorkoutEditor from './components/WorkoutEditor.vue'
import { ref } from 'vue';
import { useAuth } from './store/auth.js'

import MenuDrawer from './components/MenuDrawer.vue';
import { isDrawerOpen } from './store/menuDrawerStore.js'
import Menubars from './assets/menubars.svg'


const LoginStore = useAuth();

function toggleDrawer () {
  if (isDrawerOpen.value == false) {
    isDrawerOpen.value = true
  } else {
    isDrawerOpen.value = false
  }
}


</script>

<template>
  <header class="flex justify-between items-center mx-5 bg-slate-50">
      <h1 class="text-5xl font-title text-slate-900 my-10">LeCarnet</h1>
      <button v-if="LoginStore.user !== null" v-on:click="toggleDrawer" class="w-[30px] h-[30px] relative right-3 bottom-1"><Menubars /></button>
  </header>
  <main class= "bg-slate-50 grow mx-5">
    <MenuDrawer v-on:click="toggleDrawer"/>
    <RouterView/>
  </main>
  <footer class= "fixed bottom-0 z-0 min-w-full bg-slate-50">
    <h3 class="font-title text-center">LeCarnet - Florian Antoine</h3>
  </footer>

</template>

<style>


</style>
