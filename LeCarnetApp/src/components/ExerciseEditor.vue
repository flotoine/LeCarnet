<template>
    <div class="flex justify-between place-items-baseline mb-4">
        <h2 class="text-2xl">{{ exerciseData.title }}</h2>
        <p>{{ exerciseData.date }}</p>
    </div>
    <div class="flex flex-col gap-2 dark:bg-slate-900 p-2 mb-4">
        <h3 class="text-lg">Enter your set performance:</h3>
        <label for="reps">Reps: </label>
        <input id="reps" name="reps" class="pl-2 dark:text-slate-50" type="number" v-model="repDataToAdd.reps">
        <label for="weight">Weight (kg):</label>
        <input id="weight" name="weight" class="pl-2 dark:text-slate-50" type="number" v-model="repDataToAdd.weight">
        <button @click="addSetHandler" class=" bg-slate-200 dark:bg-slate-700">Add set data</button>
    </div>
    <div class="grid grid-cols-2">
        <h3 class="text-lg">Your reps</h3>
        <button class="bg-red-600 rounded-lg text-slate-50 p-1 mb-4" v-on:click="deleteModeSwitch">Delete mode</button>
        <ul v-for="repData in exerciseRepData" :key="repData.id" class="flex gap-2 col-span-2">
            <button class="text-red-600 font-extrabold" v-if="deleteStatus" v-on:click="deleteButtonHandler(Number(repData.id))">X</button>
            <li>
                {{ repData.reps }} reps @ {{ repData.weight }} kg
            </li>
           
        </ul>

    </div>

</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { exerciseToEdit, exerciseData } from '../store/index.ts';
import { watch } from 'vue';
import { API } from '../services/index.ts';

interface RepData {
    id: PropertyKey;
    reps:Number;
    weight:Number
}

const exerciseRepData = ref<RepData[]>([])


const repDataToAdd = reactive({
    reps: 0,
    weight: 0
})

try {
    getExerciseAtDisplay(exerciseToEdit.value)  /// to replace with computed?
} catch { }

watch(exerciseToEdit, (newExercise) => {    /// reload, useful when adding new exercise to avoid displaying previous exercise
    getExerciseAtDisplay(exerciseToEdit.value)
})

async function getExerciseAtDisplay(exerciseId) {
    API.exercise.getExercise(exerciseId)
}

API.sets.getSets()

function addSetHandler() {
    API.sets.addSet(repDataToAdd).then(() => API.sets.getSets())
}

const deleteStatus = ref(false)

function deleteModeSwitch() {
    if (deleteStatus.value) {
        deleteStatus.value = false
    } else { deleteStatus.value = true }
}

function deleteButtonHandler(setDataId:Number) {
    API.sets.deleteSet(setDataId).then(() => API.sets.getSets())
}


</script>