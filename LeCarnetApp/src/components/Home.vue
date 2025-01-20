<template>
    <!-- View if user in LoginStore -- Beware if token key not refreshed --->
    <div v-if="loginStore.user !== null">
        <div class="flex  place-content-between items-center mb-6">
            <h2 class="text-xl" v-if="username !== null">Welcome {{ username }}</h2>
            <button class="bg-slate-200 text-slate-900 p-2 rounded-xl dark:bg-slate-800 dark:text-slate-50" @click="logoutButtonHandler">Logout</button>
        </div>
        <div class="flex *:bg-slate-200 dark:*:bg-slate-800 dark:*:text-slate-200 *:rounded-xl *:aspect-square *:grow *:flex *:flex-col *:place-items-center *:justify-between gap-2 *:p-2">
            <RouterLink to="/add-new-exercise">
                <p class="text-5xl relative top-5">+</p>
                <p>add new exercise</p>
            </RouterLink>
            <RouterLink to="/workouts">
                <p class="text-5xl relative top-5">?</p>
                <p>Open your journal</p>
            </RouterLink>
        </div>
        
    </div>

    <!-- Default login form displayed at start --->
    <div v-else class="flex flex-col">
        <p>LeCarnet (french for notebook) is a simple web app aiming to track your fitness journey. You can save each rep and browse through your progress.<br>Next features could include views of your stats, achievement system and sharing with you friends.</p>
        <h2 class="my-6 text-xl">Please login to access your workouts</h2>
        <RouterLink class="bg-slate-200 text-slate-900 dark:text-slate-100 dark:bg-slate-800 my-4 rounded-xl p-2 text-center" to="/login">Login</RouterLink>
        <RouterLink class="bg-slate-300 text-slate-900 dark:text-slate-100 dark:bg-slate-700 my-4 rounded-xl p-2 text-center" to="/create-an-account">Create an account</RouterLink>
    </div>
</template>

<script setup lang="ts">
import { useAuth } from '../store/auth.ts'
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { API } from '../services/index.ts';



/////////////////////////////////////////////////////////

/// idées : props/vmodel/composables/tanstack/boutons radio


const loginStore = useAuth();


/////////////////////////////////////////////////////////

const username = ref("username")  /// defines name in welcoming message // Called after successfull login

API.user.getUser(username)

API.app.getExercisesNames()

/////////////////////////////////////////////////////////

function logoutButtonHandler () { /// Logout function and empty loginStore to adapt app view
    API.user.logout()
}


/////////////////////////////////////////////////////////

</script>


<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  input {
    @apply bg-slate-200 dark:bg-slate-700;
  }
}
</style>