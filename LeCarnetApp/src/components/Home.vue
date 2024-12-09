<template>
    <!-- Welcoming message when connected --->
    <div v-if="LoginStore.user !== null">
        <div class="flex  place-content-between items-center mb-6">
            <h2 class="text-xl" v-if="username !== null">Welcome {{ username }}</h2>
            <button class="bg-slate-200 text-slate-900 p-2 rounded-xl" v-on:click="logout">Logout</button>
        </div>
        <div class="flex *:bg-slate-200 *:rounded-xl *:aspect-square *:grow *:flex *:flex-col *:place-items-center *:justify-between gap-2 *:p-2">
            <RouterLink to="/workouts">
                <p class="text-5xl relative top-5">+</p>
                <p>add new exercise</p>
            </RouterLink>
            <RouterLink to="/add-new-workout">
                <p class="text-5xl relative top-5">?</p>
                <p>Open your journal</p>
            </RouterLink>
        </div>
        
    </div>
    <!--- Register user form displayed when specific button clicked on -->
    <div v-else-if="create_an_account !== null">
        <h2 class="mb-4 text-xl">Create your account</h2>
        <form class="flex flex-col gap-1 [&>*]:rounded-xl [&>*]:p-2" id="registerUser" @submit="registerUser" >
            <label id="email" name="email">Email</label>
            <input class="bg-slate-200" type="email" id="email" name="email" placeholder="Your@email.com" v-model="registerFormData.email"
                required>
            <label class="mt-4" id="password" name="password">Password</label>
            <input class="bg-slate-200" type="password" id="password" name="password" placeholder="YourPassword"
                v-model="registerFormData.password" required>
            <label class="mt-4" id="firstname" name="firstname">First Name</label>
            <input class="bg-slate-200" type="firstname" id="firstname" name="firstname" placeholder="First Name"
                v-model="registerFormData.first_name" required>
            <label class="mt-4" id="lastname" name="lastname">Last Name</label>
            <input class="bg-slate-200" type="lastname" id="lastname" name="lastname" placeholder="Last Name"
                v-model="registerFormData.last_name" required>
            <input class="bg-slate-800 text-slate-200 my-4" type="submit" value="Create an account" />
            <button class="bg-slate-300 text-slate-900" v-on:click="CloseRegisterUserForm">Back to login</button>
        </form>

    </div>
    <!-- Default login form displayed at start --->
    <div v-else>
        <h2 class="mb-6 text-xl">Please login to access your workouts</h2>
        <form class="flex flex-col gap-1 [&>*]:rounded-xl [&>*]:p-2" id="login" @submit="login">
            <label id="email" name="email">Email</label>
            <input class="bg-slate-200" type="email" id="email" name="email" placeholder="Your@email.com" v-model="loginFormData.email"
                required>
            <label class="mt-4" id="password" name="password">Password</label>
            <input class="bg-slate-200" type="password" id="password" name="password" placeholder="YourPassword"
                v-model="loginFormData.password" required>
            <input class="bg-slate-800 text-slate-200 my-4" type="submit" value="Connect" />
            <button class="bg-slate-300 text-slate-900" v-on:click="OpenRegisterUserForm">Create an account</button>
        </form>
    </div>
</template>

<script setup>
import axios from 'axios'
import { useAuth } from '../store/auth.js'
import { reactive } from 'vue'
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

/////////////////////////////////////////////////////////

const create_an_account = ref(null); // create an account form visibility status

function OpenRegisterUserForm() {
    create_an_account.value = true
}

function CloseRegisterUserForm() {
    create_an_account.value = null
}

/////////////////////////////////////////////////////////

const LoginStore = useAuth();

const loginFormData = reactive({
    email: "",
    password: "",
});

async function login(e) {
    e.preventDefault();
    let result = await axios.post("http://127.0.0.1:8055/auth/login/",
        loginFormData
    ).then(
        response => {
            LoginStore.authenticate({
                loginFormData
            })
            localStorage.setItem("accesstoken", response.data.data.access_token);
            localStorage.setItem("refreshtoken", response.data.data.refresh_token);
            getUser()
        }
    ).catch(error => { console.error(error) })
}

/////////////////////////////////////////////////////////

const username = ref("username")  /// defines name in welcoming message // Called after successfull login

if( LoginStore.user !== null ) { getUser()}

async function getUser() {
    let result = await axios.get("http://127.0.0.1:8055/users/me", { headers: { "Authorization": `Bearer ${localStorage.getItem("accesstoken")}` } })
        .then(res => username.value = res.data.data.first_name//username.value = res.data.data.first_name)
        ).catch(error => { console.error(error) })
    return { username }
}

/////////////////////////////////////////////////////////

const registerFormData = reactive({
    email: "",
    password: "",
    first_name: "",
    last_name: ""
})

async function registerUser(e) {

    e.preventDefault();
    let result = await axios.post("http://127.0.0.1:8055/users/register/", registerFormData)
        .then(res => console.log(res), CloseRegisterUserForm(), alert('Successfull registration ! You can process to login')) // returns to classic login view
        .catch(err => console.error(err))

}


/////////////////////////////////////////////////////////

async function logout() {
    let response = await axios.post("http://127.0.0.1:8055/auth/logout", { refresh_token: localStorage.getItem("refreshtoken") }

    ).then(res => {
        LoginStore.user = null
    }
    ).catch(err => console.error(err))
}

/////////////////////////////////////////////////////////

</script>


<style>

/*
.userform {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.submitButton, .input {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
}

.submitButton:hover, .input:hover {
    border-color: #646cff;
}

.submitButton:focus, .input:focus,
.submitButton:focus-visible, .input:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
}
*/
</style>