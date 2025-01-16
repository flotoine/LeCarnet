import api from "../../api" /// needs interceptor with auth


export default async function getUser(username) {  /// put in API
    await api.get("/users/me")
        .then(res => username.value = res.data.data.first_name//username.value = res.data.data.first_name)
        ).catch(error => { console.error(error) })
    return { username }
}