<template>
  <div class="grid w-full grid-cols-2 gap-4 mx-auto mt-5 max-w-7xl">
    <div class="main-left">
      <div
        class="flex flex-col items-center justify-center h-full p-12 bg-white border border-gray-200 rounded-lg"
      >
        <img src="../assets/favicon.png" alt="" class="w-72 h-72" />
        <p class="mb-6 text-3xl font-bold text-sky-600">Welcome to RetroZen</p>
        <p class="mb-6 text-3xl font-semibold text-sky-500">
          Welcome to The Peaceful World
        </p>
        <div class="flex w-full mt-20 text-gray-600">
          <p>
            Do not have an account?
            <RouterLink :to="{ name: 'signup' }" class="underline"
              >Click here</RouterLink
            >
            to sign up!
          </p>
        </div>
      </div>
    </div>

    <div class="main-right">
      <div class="h-full p-12 bg-white border border-gray-200 rounded-lg">
        <form class="space-y-6" v-on:submit.prevent="submitForm">
          <div>
            <label>E-mail</label><br />
            <input
              v-model="form.email"
              type="email"
              placeholder="Your e-mail address"
              class="w-full px-6 py-4 mt-2 border border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label>Password</label><br />
            <input
              v-model="form.password"
              type="password"
              placeholder="Your password"
              class="w-full px-6 py-4 mt-2 border border-gray-200 rounded-lg"
            />
          </div>

          <template v-if="errors.length !== 0">
            <div class="p-6 text-white bg-red-300 rounded-lg">
              <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
            </div>
          </template>

          <div>
            <button
              class="px-6 py-4 text-white rounded-lg bg-sky-600 hover:bg-sky-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import { useRouter } from "vue-router";
  import { useToastStore } from "../stores/toast";
  import { useUserStore } from "../stores/user";
  import { ref } from "vue";

  export default {
    setup() {
      const errors = [];
      const toastStore = useToastStore();
      const userStore = useUserStore();
      const router = useRouter();

      const form = ref({
        email: "",
        password: "",
      });

      const submitForm = async () => {
        console.log("Submit Form");
        errors.value = [];

        if (form.value.password === "") {
          errors.value.push("Your password is missing");
        }

        if (form.value.email === "") {
          errors.value.push("Your email is missing");
        }

        if (errors.value.length === 0) {
          await axios
            .post("api/login/", form.value, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              console.log(response);
              userStore.setToken(response.data);
              axios.defaults.headers.common["Authorization"] =
                "Bearer " + response.data.access;
            })
            .catch((error) => {
              console.log("error", error);
              errors.push(
                "The email or password is incorrect! Or the user is not activated!"
              );
            });

          await axios
            .get("api/me/")
            .then((response) => {
              userStore.setUserInfo(response.data);
              router.push("/feed");
            })
            .catch((error) => {
              console.log("error", error);
            });
        }
      };
      return { form, errors, submitForm, toastStore };
    },
  };
</script>
