import api from "../../api";

export default async function deleteSet(setDataId:Number) {
    if (confirm('Are you sure you want to delete this set ?')) {
        await api.delete(`/items/exercise_set/${setDataId}`) 
        .then(res => console.log(res)) 
        .catch(err => console.error(err))
      } 
}