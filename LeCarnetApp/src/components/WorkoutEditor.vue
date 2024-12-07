<template>
    <h2>Workout Editor</h2>
    <h3> Select muscle group </h3>
    <div class="exercise-selector">
        <div class="muscle-target-button-wrapper">
            <button class="muscle-target-button" v-for="muscle in muscles_targeted" :key="muscle.id" v-on:click="selectMuscleGroup(muscle.id)"> {{ muscle.muscle_type }}</button>
        </div>
        <div class="exercise-button-wrapper">
            <div v-for="exercise in exercises_names" :key="exercise.id" > 
                <button v-if="isMuscleTargetInExercise(exercise)" v-on:click="selectExercise(exercise.id)">
                    {{ exercise.exercise_name }}
                </button>
            </div>
        </div>
    </div>

</template>

<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import getExercisesNames from './ViewExercises/getExercisesNames/index.js'
    import getMusclesTargeted from './ViewExercises/getMusclesTargeted/index.js'
    import addExercise from './WorkoutEditor/AddExercise/index.js'

    let access_token = localStorage.getItem("accesstoken")
    
    const muscles_targeted = ref([]) 
    const exercises_names = ref([])
    
    getMusclesTargeted(access_token,muscles_targeted)  /// gets all muscle groups possible from DB
    getExercisesNames(access_token,exercises_names)     /// gets all exercises possible from DB

    const selected_muscle = ref(null)
    const selected_exercise = ref(null)

    function selectMuscleGroup (muscleid) {
        selected_muscle.value = muscleid                /// changes muscle targeted when specific button clicked
    }

    function selectExercise (exerciseid) {
        addExercise(access_token,exerciseid)
    }

    function isMuscleTargetInExercise (ex) {
        if (ex.muscle_target === selected_muscle.value) {  /// checks if exercise if relevant for clicked muscle group (same id)
            return true
        } else { return false}
    }



</script>

<style>

/*
.exercise-selector {
    display: flex;
    flex-direction: column;
    gap:40px;
}

.muscle-target-button-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    
}

.muscle-target-button{
    flex: 1 1 auto;
}

.exercise-button-wrapper {
    display: flex;
    justify-content: center;
    gap: 2px;
}
*/

</style>