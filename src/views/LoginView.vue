<template>
  <div class="max-w-7xl mx-auto grid grid-cols-2 gap-4 mt-5 w-full">
    <div class="main-left">
      <div
        class="p-12 bg-white border border-gray-200 rounded-lg flex flex-col justify-center items-center h-full"
      >
        <img src="../assets/favicon.png" alt="" class="w-72 h-72" />
        <p class="mb-6 text-3xl text-sky-600 font-bold">Welcome to RetroZen</p>
        <p class="mb-6 text-3xl text-sky-500 font-semibold">
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
      <div class="p-12 bg-white border border-gray-200 rounded-lg h-full">
        <form class="space-y-6">
          <div>
            <label>E-mail</label><br />
            <input
              type="email"
              placeholder="Your e-mail address"
              class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label>Password</label><br />
            <input
              type="password"
              placeholder="Your password"
              class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
            />
          </div>

          <template>
            <div class="bg-red-300 text-white rounded-lg p-6">
              <p>Error</p>
            </div>
          </template>

          <div>
            <button
              class="py-4 px-6 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
