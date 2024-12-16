import axios from 'axios'
import { exerciseToEdit } from '../../../store/index.ts'

export default async function addExercise(accessToken:String,exerciseType:Number) {
    await axios.post("http://127.0.0.1:8055/items/exercise_item/", {"exercise_type":exerciseType},
        { headers: {"Authorization" : `Bearer ${accessToken}`} }
    ) 
    .then(res => {
        console.log(res);
        exerciseToEdit.value=res.data.data.id;
        
    }) 
    .catch(()=> alert(`Got a problem! Please relog`))
    
    
}
