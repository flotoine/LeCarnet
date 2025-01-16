import api from "../../api"

export default async function deleteExercise(exerciseId:Number) {
    if (confirm('Are you sure you want to delete this exercise ?')) {
        await api.delete(`/items/exercise_item/${exerciseId}`) 
        .then(res => console.log(res)) 
        .catch(err => console.error(err))
      } 
}