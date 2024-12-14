

import { isDrawerOpen } from '../../../store/index.ts'
import axios from 'axios';


export default async function logout(LoginStore) {
    await axios.post("http://127.0.0.1:8055/auth/logout", { refresh_token: localStorage.getItem("refreshtoken") }

    ).then(res => {
        console.log(res);
        LoginStore.user = null;
        if (isDrawerOpen.value === true ) {isDrawerOpen.value = false} // close drawer if open during logout
    }
    ).catch(err => console.error(err))
}
    