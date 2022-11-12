import axios from "axios";
import jwt_decode from "jwt-decode";

export const createAxios = (user, dispatch, stateSuccess) => {
  const newInstance = axios.create();

  const refreshToken = async () => {
    try {
      const res = await axios.post("/v1/auth/refresh", {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodeToken = jwt_decode(user?.accessToken);
      if (decodeToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        dispatch(stateSuccess(refreshUser));
        config.headers["token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
