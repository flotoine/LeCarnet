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
        
    </div>
    <!--- Register user form displayed when sign-in button clicked on -->
    <div v-else-if="showSignInForm === true">
        <h2 class="mb-4 text-xl">Create your account</h2>
        <form class="flex flex-col gap-1 [&>*]:rounded-xl [&>*]:p-2" id="registerUser" @submit="registerUser" >
            <label id="email" name="email">Email</label>
            <input  type="email" id="email" name="email" placeholder="Your@email.com" v-model="registerFormData.email"
                required>
            <label class="mt-4" id="password" name="password">Password</label>
            <input  type="password" id="password" name="password" placeholder="YourPassword"
                v-model="registerFormData.password" required>
            <label class="mt-4" id="firstname" name="firstname">First Name</label>
            <input  type="firstname" id="firstname" name="firstname" placeholder="First Name"
                v-model="registerFormData.first_name" required>
            <label class="mt-4" id="lastname" name="lastname">Last Name</label>
            <input type="lastname" id="lastname" name="lastname" placeholder="Last Name"
                v-model="registerFormData.last_name" required>
            <button class="bg-slate-800 text-slate-200 my-4">Create an account</button>
            <button class="bg-slate-300 text-slate-900" v-on:click="CloseRegisterUserForm">Back to login</button>
        </form>

    </div>
    <!-- Default login form displayed at start --->
    <div v-else>
        <h2 class="mb-6 text-xl">Please login to access your workouts</h2>
        <form class="flex flex-col gap-1 *:rounded-xl *:p-2 " id="login" @submit="login">
            <label id="email" name="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Your@email.com" v-model="loginFormData.email"
                required>
            <label class="mt-4" id="password" name="password">Password</label>
            <input type="password" id="password" name="password" placeholder="YourPassword"
                v-model="loginFormData.password" required>
            <button class="bg-slate-800 text-slate-100 dark:bg-slate-600 my-4">Connect</button>
            <button class="bg-slate-300 text-slate-900 dark:bg-slate-900 dark:text-slate-100" v-on:click="OpenRegisterUserForm">Create an account</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
//@ts-ignore
import { useAuth } from '../store/auth.ts'
import { reactive } from 'vue'
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';

/////////////////////////////////////////////////////////

// Sign in form Display 

const showSignInForm = ref(false); 

function OpenRegisterUserForm() {
    showSignInForm.value = true
}

function CloseRegisterUserForm() {
    showSignInForm.value = false
}

/////////////////////////////////////////////////////////

// Log in function

const loginStore = useAuth();


const loginFormData = reactive({
    email: "",
    password: "",
});

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
            getUser()
        }
    ).catch(error => { console.error(error), alert('Wrong credentials. Please check email and password') })
    
}

/////////////////////////////////////////////////////////

const username = ref("username")  /// defines name in welcoming message // Called after successfull login

if( loginStore.user !== null ) { getUser()}

async function getUser() {
    await axios.get("http://127.0.0.1:8055/users/me", { headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}` } })
        .then(res => username.value = res.data.data.first_name//username.value = res.data.data.first_name)
        ).catch(error => { console.error(error) })
    return { username }
}

/////////////////////////////////////////////////////////

/// Sign in function. Saves user in DB

const registerFormData = reactive({
    email: "",
    password: "",
    first_name: "",
    last_name: ""
})

async function registerUser(e:Event) {

    e.preventDefault();
    await axios.post("http://127.0.0.1:8055/users/register/", registerFormData)
        .then(res => {console.log(res), CloseRegisterUserForm(), alert('Successfull registration ! You can process to login')}) // returns to classic login view
        .catch(err => console.error(err))

}


/////////////////////////////////////////////////////////

/// Logout function and empty loginStore to adapt app view

import { isDrawerOpen } from '../store/index.ts'
const router = useRouter()

async function logout() {
    await axios.post("http://127.0.0.1:8055/auth/logout", { refreshToken: localStorage.getItem("refreshToken") }

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