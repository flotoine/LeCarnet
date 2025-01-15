import api from '../../api';
import { exerciseToEdit } from '../../../store';


export default async function addSet(repDataToAdd) {
    await api.post("/items/exercise_set/",
        {
            "exercise_id": exerciseToEdit.value,
            "reps": repDataToAdd.reps,
            "weight" : repDataToAdd.weight
        }
    ) 
    .then(res => {
        console.log(res); 
    }) 
    .catch(()=> alert(`Got a problem! Please relog`))
    
    
}