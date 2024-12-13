import axios from 'axios'

export default async function deleteExercise(access_token:String | null,exercise_id:Number) {
    if (confirm('Are you sure you want to delete this exercise ?') == true) {
        await axios.delete(`http://127.0.0.1:8055/items/exercise_item/${exercise_id}`,
            { headers: {"Authorization" : `Bearer ${access_token}`} }
        ) 
        .then(res => console.log(res)) 
        .catch(err => console.error(err))
      }
}
