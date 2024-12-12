<template>
    <h2 class="text-2xl mb-4">Your training journal</h2>
    <div class="*:bg-slate-200 dark:*:bg-slate-800 *:rounded-lg *:p-2 flex gap-2 mb-4">
        <button v-on:click="showExercisesItems">{{ workoutDisplayButton }}</button>
        <button v-if="showEditButton" v-on:click="editModeSwitch">Edit mode</button>
    </div>
    <section>
        <div v-for="date in items_dates" :key="date">
            <h4 class=" text-lg mb-4">{{ date }}</h4>
            <div v-for="result in results" :key="result.id">
                <li v-if="date === result.date" class="flex justify-between">
                    {{ result.exercise_name }}
                    <div class="flex gap-2">
                        <button v-if="editStatus">edit</button>
                        <button v-if="editStatus" v-on:click="deleteButtonHandler(result.id)">delete</button>
                    </div>

                </li>
            </div>
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
import { items_dates } from '../store/itemsDatesStore.js'

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

async function deleteButtonHandler (exercise_to_delete_id) {
    await deleteExercise(access_token, exercise_to_delete_id)
    await getExercisesItems(access_token, results, exercises_names)
}

///////////////////////////////////////////////////////////////////////////////////////////////

const editStatus = ref(false)

function editModeSwitch() {
    if (editStatus.value === true) {
        editStatus.value = false
    } else { editStatus.value = true }
}

</script>

<style></style>
