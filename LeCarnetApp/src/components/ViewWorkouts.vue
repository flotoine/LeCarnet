<template>
    <h2>Your workouts</h2>
    <button v-on:click="showExercisesItems">{{showWorkoutsButton}}</button>
    <section class="exercises-wrapper">
        <div class="exercise-unit" v-for="result in results" :key="result.id">Date: {{ dayjs(result.date_created).format('DD/MM/YYYY') }} --- Exercice: {{ result.exercise_name }}</div> 
    </section>
    

</template>

<script setup>
import axios from 'axios'
import { useAuth } from "../store/auth.js"
import { ref } from 'vue';
import { errorMessages } from 'vue/compiler-sfc'
import getExercisesNames from './ViewExercises/getExercisesNames/index.js'
import getExercisesItems from './ViewExercises/getExercisesItems/index.js'
import dayjs from 'dayjs';

const results = ref([])
const exercises_names = ref([])

const showWorkoutsButton = ref("Show your workouts")
const noWorkoutJournal = ref (false)

let access_token = localStorage.getItem("accesstoken")

getExercisesNames(access_token,exercises_names)

function showExercisesItems () {
    if (showWorkoutsButton.value == "Show your workouts")
    {
        getExercisesItems(access_token,results,exercises_names)
        showWorkoutsButton.value = "Hide your workouts"
    } else {
        results.value = 0
        showWorkoutsButton.value = "Show your workouts"
    }
}

</script>

<style>
.exercises-wrapper {
    margin-top:10%;
    display: flex;
    flex-direction: column-reverse;
    gap:5px;
}

.exercise-unit {
    background-color:#1a1a1a;
    padding: 2px 10px 2px 10px;
    border-radius: 2px;
}

</style>
