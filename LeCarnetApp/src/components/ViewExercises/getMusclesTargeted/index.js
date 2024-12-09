export default async function getMusclesTargeted(access_token,muscles_targeted) {
    await axios.get(`http://127.0.0.1:8055/items/muscle_targeted/`, { headers: {"Authorization" : `Bearer ${access_token}`} })
    .then(res=> muscles_targeted.value = res.data.data)
    .catch(err => console.warn(err))
}