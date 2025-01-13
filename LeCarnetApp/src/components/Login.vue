<template>
    <div>
        <h2 class="my-6 text-xl">Please login to access your workouts</h2>
        <form class="flex flex-col gap-1 *:rounded-xl *:p-2 " id="login" @submit="login">
            <label id="email" name="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Your@email.com" v-model="loginFormData.email"
                required>
            <label class="mt-4" id="password" name="password">Password</label>
            <input type="password" id="password" name="password" placeholder="YourPassword"
                v-model="loginFormData.password" required>
            <button class="bg-slate-800 text-slate-100 dark:bg-slate-600 my-4">Connect</button>
            <button class="bg-slate-300 text-slate-900 dark:bg-slate-900 dark:text-slate-100">Create an account</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { useAuth } from '../store/auth.ts'
import { reactive } from 'vue'
import { useRouter } from 'vue-router';




const loginStore = useAuth();

const loginFormData = reactive({
    email: "",
    password: "",
});

const router = useRouter()

async function login(e:Event) {
    e.preventDefault();
    await axios.post("http://127.0.0.1:8055/auth/login/",
        loginFormData
    ).then(
        response => {
            loginStore.authenticate({
                //@ts-ignore
                loginFormData
            })
            localStorage.setItem("accessToken", response.data.data.access_token);
            localStorage.setItem("refreshToken", response.data.data.refresh_token);
            router.push('/')
        }
    ).catch(error => { console.error(error), alert('Wrong credentials. Please check email and password') })
    
}

</script>