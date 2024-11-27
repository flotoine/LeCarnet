<template>
    <!-- Welcoming message when connected --->
    <div v-if="LoginStore.user !== null">
        <h2 v-if="username !== null">Bienvenue {{ username }}</h2> 
        <button v-on:click="logout">Logout</button>
    </div>
    <!--- Register user form displayed when specific button clicked on -->
    <div class="userform" v-else-if="create_an_account !== null">
        <h2>Create your account</h2>
        <input type="email" id="email" name="email" placeholder="Your@email.com" v-model="registerFormData.email">
        <input type="password" id="password" name="password" placeholder="YourPassword" v-model="registerFormData.password">
        <input type="firstname" id="firstname" name="firstname" placeholder="First Name" v-model="registerFormData.first_name">
        <input type="lastname" id="lastname" name="lastname" placeholder="Last Name" v-model="registerFormData.last_name">
        <button v-on:click="registerUser" >Create an account</button>
        <button v-on:click="CloseRegisterUserForm" >Back to login</button>
    </div>
    <!-- Default login form displayed at start --->
    <div class="userform" v-else>
        <h2>Please login to access your trainings</h2>
        <input type="email" id="email" name="email" placeholder="Your@email.com" v-model="loginFormData.email">
        <input type="password" id="password" name="password" placeholder="YourPassword" v-model="loginFormData.password">
        <button v-on:click="login" >Connect</button>
        <button v-on:click="OpenRegisterUserForm">Create an account</button>
    </div>
</template>

<script setup>
import axios from 'axios'
import { useAuth } from '../store/auth.js'
import { reactive } from 'vue'
import { ref } from 'vue';


/////////////////////////////////////////////////////////

const create_an_account = ref(null); // create an account form visibility status

function OpenRegisterUserForm () {
    create_an_account.value = true
}

function CloseRegisterUserForm () {
    create_an_account.value = null
}

/////////////////////////////////////////////////////////

const LoginStore = useAuth();

const loginFormData = reactive({
    email: "",
    password: "",
});

async function login()
        {
            let result = await axios.post("http://127.0.0.1:8055/auth/login/",      
            loginFormData
                ).then(
                    response => {
                        LoginStore.authenticate({
                            loginFormData
                        })
                        localStorage.setItem("accesstoken",response.data.data.access_token);
                        localStorage.setItem("refreshtoken",response.data.data.refresh_token);
                        getUser()
                    }
                ).catch(error => {console.error(error)})       
        }

/////////////////////////////////////////////////////////

const username = ref("username")  /// defines name in welcoming message // Called after successfull login

async function getUser()
        {       
            let result = await axios.get("http://127.0.0.1:8055/users/me",{ headers: {"Authorization" : `Bearer ${localStorage.getItem("accesstoken")}`} })
            .then(res => username.value = res.data.data.first_name//username.value = res.data.data.first_name)
            ).catch(error => {console.error(error)})  
            return {username}
        }

/////////////////////////////////////////////////////////

const registerFormData = reactive({
    email: "",
    password: "",
    first_name: "",
    last_name: ""
})

async function registerUser() {
    let result = await axios.post("http://127.0.0.1:8055/users/register/",registerFormData)
    .then(res => console.log(res), CloseRegisterUserForm(), alert('Successfull registration ! You can process to login')) // returns to classic login view
    .catch(err => console.error(err))
}

/////////////////////////////////////////////////////////

async function logout()
        {
            let response = await axios.post("http://127.0.0.1:8055/auth/logout",{refresh_token : localStorage.getItem("refreshtoken")}

            ).then(res => {
                LoginStore.user = null
            }
            ).catch(err => console.error(err))
        }

/////////////////////////////////////////////////////////

</script>


<style .scoped>
    .userform {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>