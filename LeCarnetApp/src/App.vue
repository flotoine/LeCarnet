<script setup>
import Login from './components/Login.vue'
import ViewExercises from './components/ViewWorkouts.vue';
import WorkoutEditor from './components/WorkoutEditor.vue'
import { ref } from 'vue';
import { useAuth } from './store/auth.js'
import { RouterLink } from 'vue-router';
import MenuDrawer from './components/MenuDrawer.vue';
import { isDrawerOpen } from './store/menuDrawerStore.js'


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
  <header class="flex flex-col mx-5 bg-slate-50">
    <h1 class="text-5xl font-title text-slate-900 my-10">LeCarnet</h1>
    <button v-on:click="toggleDrawer" class= "bg-lime-500 ">Menu</button>
    
    <!---<nav class="flex gap-5" v-if="LoginStore.user !== null">-->
      <!---<RouterLink to="/">Home</RouterLink>
      <RouterLink to="/workouts">Go to Workouts</RouterLink>
      <RouterLink to="/add-new-workout">Add new workout</RouterLink>
    </nav> -->
  </header>
  <main class= "bg-slate-50">
    <MenuDrawer v-if="isDrawerOpen" v-on:click="toggleDrawer"/>
    <RouterView class="bg-slate-50 mx-5 rounded-md"/>
  </main>
  <footer class= "fixed bottom-0 z-0 min-w-full bg-slate-50">
    <h3 class="font-title text-center">LeCarnet - Florian Antoine</h3>
  </footer>

</template>

<style>

/*
nav {
  display: flex;
  justify-content: space-between;
  margin: auto;
}
  */


</style>
