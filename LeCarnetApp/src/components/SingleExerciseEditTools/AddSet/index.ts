import axios from 'axios'


export default async function addSet(accessToken:String) {
    await axios.post("http://127.0.0.1:8055/items/exercise_set/",
        {
            "exercise_item":	55,
            "reps": 13,
            "weight" : 30.5
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
