<template>
    <div>
        <h2 class="my-6 text-xl">Please login to access your workouts</h2>
        <form class="flex flex-col gap-1 *:rounded-xl *:p-2 " id="login" @submit.prevent="loginButtonHandler">
            <label id="email" name="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Your@email.com" v-model="loginFormData.email"
                required>
            <label class="mt-4" id="password" name="password">Password</label>
            <input type="password" id="password" name="password" placeholder="YourPassword"
                v-model="loginFormData.password" required>
            <button class="bg-slate-800 text-slate-100 dark:bg-slate-600 my-4">Connect</button>
            <RouterLink to="/" class="bg-slate-300 text-slate-900 dark:bg-slate-900 dark:text-slate-100 text-center" >Home</RouterLink>
            
        </form>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router';
import { API } from '../services/index.ts';

const loginFormData = reactive({
    email: "",
    password: "",
});

const router = useRouter();

function loginButtonHandler () {
    API.user.login(loginFormData)
    router.push('/')
}

</script>