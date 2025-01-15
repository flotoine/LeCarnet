<template>
    
    <div class="flex justify-between">
        <h2 class="text-2xl mb-4">Your training journal</h2>
        <button class="bg-red-600 rounded-lg text-slate-50 p-2 mb-4" v-on:click="deleteModeSwitch">Delete mode</button>
    </div>
    <section>
        <div v-for="date in itemsDates" class="bg-slate-200 dark:bg-slate-800 rounded-lg mb-2">
            <div class="bg-slate-300 dark:bg-slate-700 text-center rounded-t-lg">
                <h4 @click="dateClickHandler(date)" class="text-xl py-2"><RouterLink to="/wod">{{ date }}</RouterLink></h4>
            </div>
            <div class="p-2">
                <div v-for="item in userItems" :key="item.id">
                    <li v-if="date === item.short_date" class="flex gap-2">
                        <button class="text-red-600 font-extrabold" v-if="deleteStatus" v-on:click="deleteButtonHandler(Number(item.id))">X</button>
                        <button class="truncate" v-on:click="editButtonHandler(Number(item.id))">
                            {{ item.exercise_name }} 
                        </button>
                    </li>
                </div>
            </div>

        </div>


    </section>


</template>

<script setup lang="ts">
import { ref } from 'vue';
import { itemsDates, userItems } from '../store/index.ts'
import { RouterLink } from 'vue-router';

///////////////////////////////////////////////////////////////////////////////////////////////

import { API } from '../services/index.ts';

API.exercise.getAllExercises()

///////////////////////////////////////////////////////////////////////////////////////////////

async function deleteButtonHandler(exerciseToDeleteId: number) {
    API.exercise.deleteExercise(exerciseToDeleteId)
    API.exercise.getAllExercises() ///fix no refresh after deletion
}

///////////////////////////////////////////////////////////////////////////////////////////////

import { exerciseToEdit } from '../store/index.ts';
import { useRouter } from 'vue-router';


const router = useRouter()


async function editButtonHandler(exerciseToEditId: number) {
    exerciseToEdit.value = exerciseToEditId
    router.push('/edit-your-exercise')
}

///////////////////////////////////////////////////////////////////////////////////////////////

const deleteStatus = ref(false)

function deleteModeSwitch() {
    if (deleteStatus.value === true) {
        deleteStatus.value = false
    } else { deleteStatus.value = true }
}

///////////////////////////////////////////////////////////////////////////////////////////////

function dateClickHandler(selectedDate) {
    userItems.value = userItems.value.filter((item) => item.short_date === selectedDate)
}

</script>

<style></style>
