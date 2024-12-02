<template>
    <h2>Workout Editor</h2>
    <h3> Select muscle group </h3>
    <div class="muscle-target-button-wrapper">
        <button class="muscle-target-button" v-for="muscle in muscles_targeted" :key="muscle.id" v-on:click="selectMuscleGroup(muscle.id)"> {{ muscle.muscle_type }}</button>
    </div>
    <br>
    <div v-for="exercise in exercises_names" :key="exercise.id" > 
        <button v-if="isMuscleTargetInExercise(exercise)">
            {{ exercise.exercise_name }}
        </button>
    </div>

</template>

<script setup>
    import { ref } from 'vue';
    import getExercisesNames from './ViewExercises/getExercisesNames/index.js'
    import getMusclesTargeted from './ViewExercises/getMusclesTargeted/index.js'

    let access_token = localStorage.getItem("accesstoken")
    
    const muscles_targeted = ref([]) 
    const exercises_names = ref([])
    
    getMusclesTargeted(access_token,muscles_targeted)  /// gets all muscle groups possible from DB
    getExercisesNames(access_token,exercises_names)     /// gets all exercises possible from DB

    const muscle_selected = ref(null)

    function selectMuscleGroup (muscleid) {
        muscle_selected.value = muscleid                /// changes muscle targeted when specific button clicked
    }

    function isMuscleTargetInExercise (ex) {
        if (ex.muscle_target === muscle_selected.value) {  /// checks if exercise if relevant for clicked muscle group (same id)
            return true
        } else { return false}
    }

</script>

<style>
.muscle-target-button-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    
}

.muscle-target-button{
    flex: 1 1 auto;
}
</style>