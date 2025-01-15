import userApi from "../userapi";
import { useAuth } from "../../../store/auth";

export default async function login(loginFormData) {
  const loginStore = useAuth();
  await userApi
    .post("/auth/login/", loginFormData)
    .then((res) => {
        loginStore.authenticate({
            //@ts-ignore
            loginFormData
        })
        localStorage.setItem("accessToken", res.data.data.access_token);
        localStorage.setItem("refreshToken", res.data.data.refresh_token);
    })
    .catch((err) => {
      console.error(err),
        alert("Wrong credentials. Please check email and password");
    });
}