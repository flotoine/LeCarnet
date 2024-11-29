<script setup>
import Login from './components/Login.vue'
import ViewExercises from './components/ViewWorkouts.vue';
import { useAuth } from './store/auth.js'

const LoginStore = useAuth();

</script>

<template>
  <h1>LeCarnet</h1>
  <Login />
  <ViewExercises v-if="LoginStore.user !== null"/>
</template>

<style scoped>



</style>
