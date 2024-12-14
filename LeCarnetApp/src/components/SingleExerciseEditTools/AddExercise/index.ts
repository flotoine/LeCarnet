import axios from 'axios'
import { exercise_to_edit } from '../../../store/index.ts'

export default async function addExercise(access_token:String,exercise_type:Number) {
    await axios.post("http://127.0.0.1:8055/items/exercise_item/", {"exercise_type":exercise_type},
        { headers: {"Authorization" : `Bearer ${access_token}`} }
    ) 
    .then(res => {
        console.log(res);
        exercise_to_edit.value=res.data.data.id;
        
    }) 
    .catch(()=> alert(`Got a problem! Please relog`))
    
    
}
