<template>
    <h2>Your trainings</h2>
    <button v-on:click="getExerciseItems()">Show your trainings</button>
    <div v-for="result in results" :key="result.id">Date: {{ result.date_created }} --- Exercice: {{ result.exercise_name }}</div> 

</template>

<script setup>
import axios from 'axios'
import { useAuth } from "../store/auth.js"
import { ref } from 'vue';
import { errorMessages } from 'vue/compiler-sfc'


const results = ref([])   

async function getExerciseItems() {
    let access_token = localStorage.getItem("accesstoken")
    
    await axios.get("http://127.0.0.1:8055/items/exercise_item/", { headers: {"Authorization" : `Bearer ${access_token}`} }) // gets all exercises saved by user
    .then(res => results.value = res.data.data) // saves exercises under ref array
    .catch(err => console.error(err))
    
    
    for (let i = 0; i < results.value.length;i++) {
        const exercise_type = results.value[i].exercise_type // for each exercise, gets exercise type id
        await axios.get(`http://127.0.0.1:8055/items/exercises_list/${exercise_type}`, { headers: {"Authorization" : `Bearer ${access_token}`} })
        .then(res => results.value[i].exercise_name = res.data.data.exercise_name) // get the name related to the id
    }

    return {results}
}

</script>