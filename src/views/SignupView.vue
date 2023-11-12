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
            Already have an account?
            <RouterLink :to="{ name: 'login' }" class="underline"
              >Click here</RouterLink
            >
            to log in!
          </p>
        </div>
      </div>
    </div>

    <div class="main-right">
      <div class="h-full p-12 bg-white border border-gray-200 rounded-lg">
        <form class="space-y-6" v-on:submit.prevent="submitForm">
          <div>
            <label>Username</label><br />
            <input
              type="text"
              v-model="form.name"
              placeholder="Your name"
              class="w-full px-6 py-4 mt-2 border border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label>E-mail</label><br />
            <input
              type="email"
              v-model="form.email"
              placeholder="Your e-mail address"
              class="w-full px-6 py-4 mt-2 border border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label>Password</label><br />
            <input
              type="password"
              v-model="form.password1"
              placeholder="Your password"
              class="w-full px-6 py-4 mt-2 border border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label>Repeat password</label><br />
            <input
              type="password"
              v-model="form.password2"
              placeholder="Repeat your password"
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
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref } from "vue";
  import axios from "axios";
  import { useToastStore } from "../stores/toast";

  export default {
    setup() {
      const form = ref({
        email: "",
        name: "",
        password1: "",
        password2: "",
      });
      const errors = ref([]);
      const toastStore = useToastStore();

      const submitForm = () => {
        console.log("Submit Form");
        errors.value = [];

        if (form.value.name === "") {
          errors.value.push("Your name is missing");
        }

        if (form.value.password1 === "") {
          errors.value.push("Your password is missing");
        }

        if (form.value.password1 !== form.value.password2) {
          errors.value.push("The passwords don't match");
        }

        if (form.value.email === "") {
          errors.value.push("Your email is missing");
        }

        if (errors.value.length === 0) {
          axios
            .post("api/signup/", form.value, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              console.log(response);
              if (response.data.message === "success") {
                toastStore.showToast(
                  5000,
                  "User registered. Please log in",
                  "bg-emerald-green"
                );

                form.value.email = "";
                form.value.name = "";
                form.value.password1 = "";
                form.value.password2 = "";
              } else {
                console.log("fail");
                toastStore.showToast(
                  5000,
                  "Something went wrong. Please try again",
                  "bg-red-300"
                );
              }
            })
            .catch((error) => {
              console.log(error.response.data);
              if (error.response.data.errors) {
                Object.values(error.response.data.errors).forEach(
                  (errorList) => {
                    errorList.forEach((errMsg) => {
                      toastStore.showToast(5000, errMsg, "bg-red-300");
                    });
                  }
                );
              } else {
                toastStore.showToast(
                  5000,
                  "Something went wrong. Please try again",
                  "bg-red-300"
                );
              }
            });
        }
      };

      return { form, errors, submitForm, toastStore };
    },
  };
</script>
