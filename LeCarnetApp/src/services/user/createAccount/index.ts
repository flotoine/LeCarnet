import userApi from "../userApi"


export default async function CreateAccount (registerFormData) {
    await userApi.post("/users/register/", registerFormData)
        .then(res => {console.log(res), alert('Successfull registration ! You can process to login')}) // should return to classic login view
        .catch(err => console.error(err))
}

