import axios from 'axios'
import { exerciseToEdit } from '../../../store';


export default async function addSet(accessToken:String,repDataToAdd) {
    await axios.post("http://127.0.0.1:8055/items/exercise_set/",
        {
            "exercise_id": exerciseToEdit.value,
            "reps": repDataToAdd.reps,
            "weight" : repDataToAdd.weight
        },
        { 
            headers: {"Authorization" : `Bearer ${accessToken}`}
        }
    ) 
    .then(res => {
        console.log(res); 
    }) 
    .catch(()=> alert(`Got a problem! Please relog`))
    
    
}
