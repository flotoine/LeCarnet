<template>
    <!-- View if user in LoginStore -- Beware if token key not refreshed --->
    <div v-if="loginStore.user !== null">
        <div class="flex  place-content-between items-center mb-6">
            <h2 class="text-xl" v-if="username !== null">Welcome {{ username }}</h2>
            <button class="bg-slate-200 text-slate-900 p-2 rounded-xl dark:bg-slate-800 dark:text-slate-50" v-on:click="logout">Logout</button>
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
        <button @click="testFunction">Test</button>
        
    </div>

    <!-- Default login form displayed at start --->
    <div v-else class="flex flex-col">
        <p>LeCarnet (french for notebook) is a simple web app aiming to track your fitness journey. You can save each rep and browse through your progress.<br>Next features could include views of your stats, achievement system and sharing with you friends.</p>
        <h2 class="my-6 text-xl">Please login to access your workouts</h2>
        <RouterLink class="bg-slate-800 text-slate-100 dark:bg-slate-600 my-4 rounded-xl p-2 text-center" to="/login">Login</RouterLink>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
//@ts-ignore
import { useAuth } from '../store/auth.ts'
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';


import { API } from '../services/index.ts';

async function testFunction () {
    await API.exercise.getAllExercises()
}

/////////////////////////////////////////////////////////
//notes : faire un composant par besoin (là y en a trois: piloté par le router /signup /login etc) voir Navigation Guards  vue3 pour condition
///creer des pages src/pages et dans chaque page tu peux mettre un ou pls composants
// Log in function

/// utilise les props
/// v-model pour autre chose ? lien avec les props
// autre mais plus tard: vois les composables
/// tanstack query pour gérer des états par exemple de chargement, ça peut etre sympa ça sur le projet, gestion erreurs tout ça
/// muscles selectionnés en radio possible

const loginStore = useAuth();


/////////////////////////////////////////////////////////

const username = ref("username")  /// defines name in welcoming message // Called after successfull login

if( loginStore.user !== null ) { getUser(), API.app.getExercisesNames()}

async function getUser() {
    await axios.get("http://127.0.0.1:8055/users/me", { headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` } })
        .then(res => username.value = res.data.data.first_name//username.value = res.data.data.first_name)
        ).catch(error => { console.error(error) })
    return { username }
}

/////////////////////////////////////////////////////////


/// Logout function and empty loginStore to adapt app view

import { isDrawerOpen } from '../store/index.ts'
const router = useRouter()

async function logout() {
    await axios.post("http://127.0.0.1:8055/auth/logout", { "refresh_token": localStorage.getItem("refreshToken") }

    ).then(res => {
        console.log(res);
        loginStore.user = null;
        if (isDrawerOpen.value === true ) {isDrawerOpen.value = false} // close drawer if open during logout
        router.push('/')
    }
    ).catch(err => console.error(err))
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