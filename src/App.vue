<template>
  <nav class="px-8 py-10 border-b border-gray-200 bg-gray-50">
    <div class="mx-auto max-w-7xl">
      <div class="flex items-center justify-between">
        <RouterLink :to="{ name: 'home' }">
          <div class="flex items-center menu-left">
            <img src="./assets/favicon.png" alt="" class="w-20 h-20" />
            <a href="#" class="text-4xl font-bold text-sky-600">RetroZen</a>
          </div>
        </RouterLink>

        <div class="flex items-center gap-7">
          <div
            class="flex space-x-5 menu-center text-sky-700"
            v-if="userStore.user.isAuthenticated"
          >
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="{1.5}"
                stroke="currentColor"
                class="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </a>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-7 h-7"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                />
              </svg>
            </a>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-7 h-7"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </a>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="{1.5}"
                stroke="currentColor"
                class="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </a>
          </div>
          <template class="menu-right" v-if="userStore.user.isAuthenticated">
            <RouterLink
              :to="{ name: 'profile', params: { id: userStore.user.id } }"
            >
              <img
                src="https://haycafe.vn/wp-content/uploads/2022/05/Anh-songoku-cuc-chat.jpg"
                class="object-cover rounded-full w-14 h-14"
              />
            </RouterLink>
          </template>

          <template class="menu-right" v-else>
            <RouterLink to="/login">
              <button
                type="button"
                class="text-white bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
              >
                Login
              </button>
            </RouterLink>
            <RouterLink to="/signup">
              <button
                type="button"
                class="text-gray-800 hover:text-white bg-gray-300 hover:bg-sky-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
              >
                Signup
              </button>
            </RouterLink>
          </template>
        </div>
      </div>
    </div>
  </nav>
  <RouterView />
  <Toast />
</template>

<script>
  import axios from "axios";
  import Toast from "./components/Toast.vue";
  import { useUserStore } from "./stores/user";

  export default {
    setup() {
      const userStore = useUserStore();

      userStore.initStore();

      const token = userStore.user.access;

      if (token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
      }
      console.log(token);
      return { userStore };
    },

    components: {
      Toast,
    },
  };
</script>
