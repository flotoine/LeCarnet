import axios from 'axios'

export default async function deleteExercise(accessToken:String | null,exerciseId:Number) {
    if (confirm('Are you sure you want to delete this exercise ?') == true) {
        await axios.delete(`http://127.0.0.1:8055/items/exercise_item/${exerciseId}`,
            { headers: {"Authorization" : `Bearer ${accessToken}`} }
        ) 
        .then(res => console.log(res)) 
        .catch(err => console.error(err))
      }
}
