<template>
    <div>
        <h2>Your exercise - {{exerciseData.title}}</h2>
        <p>date : {{ exerciseData.date }}</p>
    </div>
    <div>
        <h3>Add reps</h3>
        <label for="reps">Reps: </label>
        <input id="reps" name="reps" class="dark:text-slate-950" type="number" v-model="repDataToAdd.reps">
        <label for="weight">Weight: </label>
        <input id="weight" name="weight" class="dark:text-slate-950" type="number" v-model="repDataToAdd.weight">
    </div>
    <div>
        <h3>Your reps</h3>
        <ul v-for="repData in exerciseRepData" :key="repData.id">
                <li>
                    {{ repData.reps }} reps @ {{ repData.weight }} kg
                </li>
        </ul>
        <button @click="addSetHandler" class= "bg-red-600">Ajouter</button>
    </div>

</template>

<script setup >
    import { reactive, ref } from 'vue';
    import { exerciseToEdit, exerciseData, exerciseRepData } from '../store/index.ts';
    import { watch } from 'vue';
    import { API } from '../services/index.ts';

    let accessToken = localStorage.getItem("accessToken")

    const repDataToAdd = reactive ({
        reps:0,
        weight:0
    })

    try {
        getExerciseAtDisplay(exerciseToEdit.value)  /// to replace with computed?
    } catch {}

    watch(exerciseToEdit, (newExercise) => {    /// reload, useful when adding new exercise to avoid displaying previous exercise
        getExerciseAtDisplay(exerciseToEdit.value)
    })

    async function getExerciseAtDisplay (exerciseId) {
        API.exercise.getExercise(exerciseId)
    }

    API.sets.getSets()

    function addSetHandler() {
        API.sets.addSet(repDataToAdd)
        API.sets.getSets()
    }

    
    
    
</script>