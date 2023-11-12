import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore({
  id: "user",

  state: () => ({
    user: {
      isAuthenticated: false,
      id: null,
      name: null,
      email: null,
      access: null,
      refresh: null,
    },
  }),

  actions: {
    initStore() {
      if (localStorage.getItem("user.access")) {
        this.user.access = localStorage.getItem("user.access");
        this.user.refresh = localStorage.getItem("user.refresh");
        this.user.id = localStorage.getItem("user.id");
        this.user.name = localStorage.getItem("user.name");
        this.user.email = localStorage.getItem("user.email");
        this.user.isAuthenticated = true;

        this.refreshToken();

        console.log("Initialized user: " + this.user);
      }
    },

    setToken(data) {
      console.log("setToken", data);

      this.user.access = data.access;
      this.user.refresh = data.refresh;
      this.user.isAuthenticated = true;

      localStorage.setItem("user.access", data.access);
      localStorage.setItem("user.refresh", data.refresh);
    },

    removeToken(data) {
      console.log("remove token");

      this.user.access = null;
      this.user.refresh = null;
      this.user.id = false;
      this.user.name = false;
      this.user.email = false;
      this.user.isAuthenticated = false;

      this.user.access = localStorage.setItem("user.access", "");
      this.user.refresh = localStorage.setItem("user.refresh", "");
      this.user.id = localStorage.setItem("user.id", "");
      this.user.name = localStorage.setItem("user.name", "");
      this.user.email = localStorage.setItem("user.email", "");
    },

    setUserInfo(user) {
      console.log("setUserInfo", user);

      this.user.id = user.id;
      this.user.name = user.name;
      this.user.email = user.email;
      this.user.id = localStorage.setItem("user.id", user.id);
      this.user.name = localStorage.setItem("user.name", user.name);
      this.user.email = localStorage.setItem("user.email", user.email);

      console.log("User", user);
    },

    refreshToken() {
      axios
        .post("api/auth/refresh", {
          refresh: this.user.refresh,
        })
        .then((response) => {
          this.user.access = reponse.data.access;

          localStorage.setItem("user.access", response.data.access);

          axios.defaults.headers.common["Authorization"] =
            "Bearer: " + response.data.access;
        })
        .catch((error) => {
          console.log(error);

          this.removeToken();
        });
    },
  },
});
