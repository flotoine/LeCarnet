<template>
    <nav v-if="LoginStore.user !== null">
        <h2 v-if="username !== null">Bienvenue {{ username }}</h2> 
        <button v-on:click="logout">Logout</button>
    </nav>
    <nav v-else>
        <input type="email" id="email" name="email" placeholder="Your@email.com" v-model="formData.email">
        <input type="password" id="password" name="password" placeholder="YourPassword" v-model="formData.password">
        <button v-on:click="login" >Connect</button>
    </nav>
</template>

<script setup>
import axios from 'axios'
import { useAuth } from '../store/auth.js'
import { reactive } from 'vue'
import { ref } from 'vue';

const LoginStore = useAuth();

const formData = reactive({
    email: "",
    password: "",
});


const username = ref("username")


async function login()
        {
            let result = await axios.post("http://127.0.0.1:8055/auth/login/",      
            formData
                ).then(
                    response => {
                        LoginStore.authenticate({
                        formData
                        })
                        localStorage.setItem("accesstoken",response.data.data.access_token);
                        localStorage.setItem("refreshtoken",response.data.data.refresh_token);
                        getUser()
                    }
                ).catch(error => {console.error(error)})       
        }

async function getUser()
        {       
            let result = await axios.get("http://127.0.0.1:8055/users/me",{ headers: {"Authorization" : `Bearer ${localStorage.getItem("accesstoken")}`} })
            .then(res => username.value = res.data.data.first_name//username.value = res.data.data.first_name)
            ).catch(error => {console.error(error)})  
            return {username}
        }

async function logout()
        {
            let response = await axios.post("http://127.0.0.1:8055/auth/logout",{refresh_token : localStorage.getItem("refreshtoken")}

            ).then(res => {
                LoginStore.user = null
            }
            ).catch(err => console.error(err))
        }

</script>


<style .scoped>
    nav {
        display: flex;
        gap: 10px;
    }
</style>