<template>
    <h2 class="text-2xl mb-4">Your training journal</h2>
    <div class="*:bg-slate-200 dark:*:bg-slate-800 *:rounded-lg *:p-2 flex gap-2 mb-4">
        <button v-on:click="editModeSwitch">Edit mode</button>
    </div>
    <section>
        <div v-for="date in items_dates" class="bg-slate-200 dark:bg-slate-800 rounded-lg mb-2 p-2">
            <h4 class="text-lg">Your training on {{ date }}</h4>
            <div v-for="user_item in user_items" :key="user_item.id">
                <li v-if="date === user_item.short_date" class="flex justify-between gap-2">
                    <p class="truncate">
                        {{ user_item.exercise_name }}
                    </p>
                    <div class="flex gap-2">
                        <button v-if="editStatus" v-on:click="editButtonHandler(Number(user_item.id))">edit</button>
                        <button v-if="editStatus" v-on:click="deleteButtonHandler(Number(user_item.id))">delete</button>
                    </div>

                </li>
            </div>
        </div>


    </section>


</template>

<script setup lang="ts">
import { ref } from 'vue';
import getExercisesNames from './ViewExercises/getExercisesNames/index.ts' 
import getExercisesItems from './ViewExercises/getExercisesItems/index.ts'
import deleteExercise from './SingleExerciseEditTools/DeleteExercise/index.ts'
import { items_dates } from '../store/index.ts'
import { user_items } from '../store/index.ts';


let access_token : String | null = localStorage.getItem("accesstoken") /// gets user token in LS

///////////////////////////////////////////////////////////////////////////////////////////////

showExercisesItemsHandler()

async function showExercisesItemsHandler() {
    await getExercisesItems(access_token)
}

getExercisesNames(access_token) /// gets all exercises possibles



///////////////////////////////////////////////////////////////////////////////////////////////

async function deleteButtonHandler (exercise_to_delete_id:number) {
    await deleteExercise(access_token, exercise_to_delete_id)
    await getExercisesItems(access_token)
}

///////////////////////////////////////////////////////////////////////////////////////////////

import { exercise_to_edit } from '../store/index.ts';
import { useRouter } from 'vue-router';


const router = useRouter()


async function editButtonHandler (exercise_to_edit_id:number) {
    exercise_to_edit.value = exercise_to_edit_id
    router.push('/edit-your-exercise')
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
