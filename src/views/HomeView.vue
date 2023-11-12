<template>
  <div class="px-8 py-6 bg-gray-50">
    <h1>Welcome</h1>
    <button @click="handleClick">Click</button>
  </div>
</template>

<script>
  import { useToastStore } from "../stores/toast";

  export default {
    setup() {
      const toastStore = useToastStore();

      // Return an object containing the required properties/methods
      return {
        toastStore,
        handleClick: () => {
          toastStore.showToast(5000, "abc", "bg-red-300");
        },
      };
    },
  };
</script>
