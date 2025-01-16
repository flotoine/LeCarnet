import userApi from "../userApi.ts";
import { useAuth } from "../../../store/auth";
import { isDrawerOpen } from '../../../store/index.ts'

export default async function logout () {
    await userApi.post("/auth/logout", { "refresh_token": localStorage.getItem("refreshToken") }

    ).then(() => {
        const loginStore = useAuth();
        loginStore.user = null;
        if (isDrawerOpen.value) {isDrawerOpen.value = false} // close drawer if open during logout
        ///router.push('/')
    }).catch(err => console.error(err))
}