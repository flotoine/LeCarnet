<template>
    <h2 class="text-2xl mb-4">Workout Editor</h2>
    <h3 class="text-xl mb-4"> Select muscle group </h3>
    
    <div class="*:bg-slate-200 *:rounded-lg *:p-2 flex flex-wrap *:grow gap-2">
        <button v-for="muscle in muscles_targeted" :key="muscle.id" v-on:click="selectMuscleGroup(muscle.id)"> {{ muscle.muscle_type }}</button>
    </div>
    <h3 v-if="exercises_selected.length !== 0" class="text-xl my-4">Select your exercise</h3>
    <div class="*:bg-slate-200 *:rounded-lg *:p-2 flex flex-wrap *:grow gap-2">
        <button v-for="exercise in exercises_selected" :key="exercise.id" v-on:click="selectExercise(exercise.id)">
            {{ exercise.exercise_name }}
        </button>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import getExercisesNames from './ViewExercises/getExercisesNames/index.js'
    import getMusclesTargeted from './ViewExercises/getMusclesTargeted/index.js'
    import addExercise from './WorkoutEditor/AddExercise/index.js'

    let access_token = localStorage.getItem("accesstoken")
    
    ////////////////////////

    const muscles_targeted = ref([]) /// array to received all muscle groups from DB
    getMusclesTargeted(access_token,muscles_targeted)  /// gets all muscle groups possible from DB

    ////////////////////////

    const exercises_names = ref([]) /// array to received all exercises from DB
    getExercisesNames(access_token,exercises_names)     /// gets all exercises possible from DB
    
    ////////////////////////
    
    const exercises_selected = ref([]) /// array to received all exercises that match selected muscle group 

    function selectMuscleGroup (muscleid) {
              /// changes muscle targeted when specific button clicked
        exercises_selected.value = exercises_names.value.filter((ex) => ex.muscle_target === muscleid);
    }

    function selectExercise (exerciseid) { /// on click on specific exercise, adds it to user list of exercise thru DB
        addExercise(access_token,exerciseid)
        exercises_selected.value=[]
    }

</script>

<style>

</style>