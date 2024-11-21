<script >
import axios from 'axios'
import { ref } from 'vue'
const isConnected = ref(true)

export default {
    name: 'Login',
    data() 
    {
        return {
            email:'',
            password:''
        }
    },
    methods: {
        async login()
        {
            let result = await axios.post("http://127.0.0.1:8055/auth/login/",      
            {
                email:this.email,
                password:this.password
            })
            console.log(result.data.data.access_token) //donne token temporaire  /// utiliser pinia pour le rendu
            
        }
    }
} 




</script>

<template>
    <nav >
        <h2>Connecté.e</h2> 
    </nav>
    <nav>
        <input type="email" id="email" name="email" placeholder="Your@email.com" v-model="email">
        <input type="password" id="password" name="password" placeholder="YourPassword" v-model="password">
        <button v-on:click="login" >Connect</button>
    </nav>
</template>

<style .scoped>
    nav {
        display: flex;
        gap: 10px;
    }
</style>