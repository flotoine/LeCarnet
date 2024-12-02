<script setup>
import Login from './components/Login.vue'
import ViewExercises from './components/ViewWorkouts.vue';
import WorkoutEditor from './components/WorkoutEditor.vue'
import { useAuth } from './store/auth.js'
import { RouterLink } from 'vue-router';

const LoginStore = useAuth();

</script>

<template>
  <h1>LeCarnet</h1>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/workouts">Go to Workouts</RouterLink>
    <RouterLink to="/add-new-workout">Add new workout</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>

</template>

<style>
nav {
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: 400px;
}


</style>
