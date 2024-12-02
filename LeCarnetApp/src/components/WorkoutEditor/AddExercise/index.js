import axios from 'axios'

export default async function addExercise(access_token,exercise_type) {
    await axios.post("http://127.0.0.1:8055/items/exercise_item/", {"exercise_type":exercise_type},
        { headers: {"Authorization" : `Bearer ${access_token}`} }
    ) 
    .then(res => console.log(res)) 
    .catch(err => console.error(err))
    
}