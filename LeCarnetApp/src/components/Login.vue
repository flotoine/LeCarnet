<template>
    <!-- Welcoming message when connected --->
    <div v-if="LoginStore.user !== null">
        <h2 v-if="username !== null">Welcome {{ username }}</h2>
        <button v-on:click="logout">Logout</button>
    </div>
    <!--- Register user form displayed when specific button clicked on -->
    <div v-else-if="create_an_account !== null">
        <h2>Create your account</h2>
        <form class="userform" id="registerUser" @submit="registerUser" >
            <input class="input" type="email" id="email" name="email" placeholder="Your@email.com" v-model="registerFormData.email"
                required>
            <input class="input" type="password" id="password" name="password" placeholder="YourPassword"
                v-model="registerFormData.password" required>
            <input class="input" type="firstname" id="firstname" name="firstname" placeholder="First Name"
                v-model="registerFormData.first_name" required>
            <input class="input" type="lastname" id="lastname" name="lastname" placeholder="Last Name"
                v-model="registerFormData.last_name" required>
            <input class="submitButton" type="submit" value="Create an account" />
            <button v-on:click="CloseRegisterUserForm">Back to login</button>
        </form>

    </div>
    <!-- Default login form displayed at start --->
    <div class="userform" v-else>
        <h2>Please login to access your workouts</h2>
        <form class="userform" id="login" @submit="login">
            <input class="input" type="email" id="email" name="email" placeholder="Your@email.com" v-model="loginFormData.email"
                required>
            <input class="input" type="password" id="password" name="password" placeholder="YourPassword"
                v-model="loginFormData.password" required>
            <input class="submitButton" type="submit" value="Connect" />
            <button v-on:click="OpenRegisterUserForm">Create an account</button>
        </form>
    </div>
</template>

<script setup>
import axios from 'axios'
import { useAuth } from '../store/auth.js'
import { reactive } from 'vue'
import { ref } from 'vue';


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
</style>