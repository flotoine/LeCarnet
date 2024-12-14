import axios from 'axios'

export default async function addExercise(access_token:String,exercise_type:Number) {
    await axios.post("http://127.0.0.1:8055/items/exercise_item/", {"exercise_type":exercise_type},
        { headers: {"Authorization" : `Bearer ${access_token}`} }
    ) 
    .then(res => alert(`Successfully added. Code ${res.status}`)) 
    .catch(()=> alert(`Got a problem! Please relog`))
    
    
}