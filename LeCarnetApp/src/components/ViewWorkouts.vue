<template>
    <h2 class="text-2xl mb-4">Your workouts</h2>
    <div class="*:bg-slate-200 *:rounded-lg *:p-2 flex gap-2 mb-4" >
        <button v-on:click="showExercisesItems">{{ workoutDisplayButton }}</button>
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

let access_token = localStorage.getItem("accesstoken") /// gets user token in LS

///////////////////////////////////////////////////////////////////////////////////////////////

const workoutDisplayButton = ref("Show your workouts")
const showEditButton = ref(false)

const results = ref([]) /// array to receive exercises saved by user
const exercises_names = ref([])  /// array to receive all exercises possible (defined thru DB)

getExercisesNames(access_token, exercises_names) /// gets all exercises possibles

function showExercisesItems() {
    if (workoutDisplayButton.value == "Show your workouts") {   /// if user has clicked on Show WO button
        getExercisesItems(access_token, results, exercises_names)  /// Gets all exercises. Compare exercise id to exercises_names to print names instead of IDs
        workoutDisplayButton.value = "Hide your workouts"  // Change button content
        showEditButton.value = true /// Show edit button
    } else { /// if user has clicked on Hide WO button
        results.value = 0   ///empty results array (allows data refresh if reclicked after)
        workoutDisplayButton.value = "Show your workouts"  /// Change button content
        showEditButton.value = false /// Hide edit button
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////

const editStatus = ref(false)

function editModeSwitch() {
    if (editStatus.value === true) {
        editStatus.value = false
    } else { editStatus.value = true }
}

</script>

<style>

</style>
