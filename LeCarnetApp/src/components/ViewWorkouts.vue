<template>
    <h2 class="text-2xl mb-4">Your workouts</h2>
    <div class="*:bg-slate-200 *:rounded-lg *:p-2 flex gap-2 mb-4" >
        <button v-on:click="showExercisesItems">{{ showWorkoutsButton }}</button>
        <button v-if="showEditButton" v-on:click="editModeSwitch">Edit mode</button>
    </div>
    <div>
        <h3 class="text-xl mb-4">Par date</h3>
        
    </div>
    <section >
        <div  v-for="result in results" :key="result.id">
            <div>{{ dayjs(result.date_created).format('DD/MM/YYYY') }} --- Exercice: {{ result.exercise_name }}
            </div>
            <button v-if="editStatus" >edit</button>
            <button v-if="editStatus" 
                v-on:click="deleteExercise(access_token, result.id)">delete</button>
        </div>
    </section>


</template>

<script setup>
import axios from 'axios'
import { useAuth } from "../store/auth.js"
import { ref } from 'vue';
import { errorMessages } from 'vue/compiler-sfc'
import getExercisesNames from './ViewExercises/getExercisesNames/index.js'
import getExercisesItems from './ViewExercises/getExercisesItems/index.js'
import deleteExercise from './WorkoutEditor/DeleteExercise/index.js'
import dayjs from 'dayjs';

const results = ref([])
const exercises_names = ref([])

const showWorkoutsButton = ref("Show your workouts")
const noWorkoutJournal = ref(false)
const showEditButton = ref(false)
const editStatus = ref(false)

let access_token = localStorage.getItem("accesstoken")

getExercisesNames(access_token, exercises_names)

function showExercisesItems() {
    if (showWorkoutsButton.value == "Show your workouts") {
        getExercisesItems(access_token, results, exercises_names)
        showWorkoutsButton.value = "Hide your workouts"
        showEditButton.value = true
    } else {
        results.value = 0
        showWorkoutsButton.value = "Show your workouts"
        showEditButton.value = false
    }
}

function editModeSwitch() {
    if (editStatus.value === true) {
        editStatus.value = false
    } else { editStatus.value = true }
}

</script>

<style>

/*
.buttons-wrapper {
    display: flex;
    gap: 5px
}

.exercises-wrapper {
    margin-top: 10%;
    display: flex;
    flex-direction: column-reverse;
    gap: 5px;
}

.exercise-unit {
    display: flex;
    justify-content: space-between;
    background-color: #1a1a1a;
    padding: 2px 10px 2px 10px;
    border-radius: 2px;
}

.edit-button {
    background-color: #646cff;
    padding: 5px;
}

.delete-button {
    background-color: rgb(130, 5, 5);
    padding: 5px;
}
    */
</style>
