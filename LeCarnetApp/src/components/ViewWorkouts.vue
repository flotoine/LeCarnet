<template>
    <h2 class="text-2xl mb-4">Your training journal</h2>
    <div class="*:bg-slate-200 dark:*:bg-slate-800 *:rounded-lg *:p-2 flex gap-2 mb-4">
        <button v-on:click="editModeSwitch">Edit mode</button>
    </div>
    <section>
        <div v-for="date in itemsDates" class="bg-slate-200 dark:bg-slate-800 rounded-lg mb-2 p-2">
            <h4 class="text-lg">Your training on {{ date }}</h4>
            <div v-for="item in userItems" :key="item.id">
                <li v-if="date === item.short_date" class="flex justify-between gap-2">
                    <p class="truncate">
                        {{ item.exercise_name }}
                    </p>
                    <div class="flex gap-2">
                        <button v-if="editStatus" v-on:click="editButtonHandler(Number(item.id))">edit</button>
                        <button v-if="editStatus" v-on:click="deleteButtonHandler(Number(item.id))">delete</button>
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
import { itemsDates, userItems } from '../store/index.ts'


let accessToken : String | null = localStorage.getItem("accessToken") /// gets user token in LS

///////////////////////////////////////////////////////////////////////////////////////////////

showExercisesItemsHandler()

async function showExercisesItemsHandler() {
    await getExercisesItems(accessToken)
}

getExercisesNames(accessToken) /// gets all exercises possibles



///////////////////////////////////////////////////////////////////////////////////////////////

async function deleteButtonHandler (exerciseToDeleteId:number) {
    await deleteExercise(accessToken, exerciseToDeleteId)
    await getExercisesItems(accessToken)  //bug: no exercises shown after one deletion
}

///////////////////////////////////////////////////////////////////////////////////////////////

import { exerciseToEdit } from '../store/index.ts';
import { useRouter } from 'vue-router';


const router = useRouter()


async function editButtonHandler (exerciseToEditId:number) {
    exerciseToEdit.value = exerciseToEditId
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
