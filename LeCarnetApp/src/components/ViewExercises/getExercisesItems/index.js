import axios from 'axios'
import dayjs from 'dayjs';

export default async function getExerciseItems(access_token,results,exercises_names) {
    await axios.get("http://127.0.0.1:8055/items/exercise_item/", { headers: {"Authorization" : `Bearer ${access_token}`} }) // gets all exercises saved by user
    .then(res => results.value = res.data.data) // saves exercises under ref array
    .catch(err => console.error(err))
    
    for (let i = 0; i < results.value.length;i++) {
        let exercise_type = results.value[i].exercise_type
        results.value[i].exercise_name = exercises_names.value[exercise_type-1].exercise_name // get the name related to the id
        /// a voir si on conserve en dessous
        let date = dayjs(results.value[i].date_created).format('DD/MM/YYYY')
        results.value[i].date = date
    }


    return {results}
}
