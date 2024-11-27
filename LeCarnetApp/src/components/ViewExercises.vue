<template>
    <h2>Vos séries</h2>
    <div v-if="results===null">Chargement...</div>
    <div v-else v-for="result in results.data.data">{{ result }}</div>
</template>

<script>
import axios from 'axios'
import { useAuth } from "../store/auth.js"
import { ref } from 'vue';
import { errorMessages } from 'vue/compiler-sfc'



export default {
    
    setup () {
        let access_token = localStorage.getItem("accesstoken")
        const results = ref(null)
        axios.get("http://127.0.0.1:8055/items/exercise_item/", { headers: {"Authorization" : `Bearer ${access_token}`} })
        .then(data => results.value = data)
        .catch(err => console.error(err))

        return {results}
    }

}

</script>