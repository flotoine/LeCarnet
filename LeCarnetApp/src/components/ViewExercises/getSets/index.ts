import axios from "axios"

export default async function getSets (accessToken:String) {
    await axios.get(`http://127.0.0.1:8055/items/exercise_set/`, { headers: {"Authorization" : `Bearer ${accessToken}`} }) 
    .then(res => console.log(res))
.catch(err => console.error(err))
}