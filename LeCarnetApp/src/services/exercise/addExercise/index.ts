import api from "../../api";
import { exerciseToEdit } from '../../../store/index.ts'

export default async function addExercise(exerciseType:Number) {
    await api.post("/items/exercise_item/", {"exercise_type":exerciseType}) 
    .then(res => {
        console.log(res);
        exerciseToEdit.value=res.data.data.id;
        
    }) 
    .catch(()=> alert(`Got a problem! Please relog`))
    
    
}