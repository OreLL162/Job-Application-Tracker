<template>
    <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <form
      @submit.prevent="handleLogin"
      class="flex flex-col gap-4 w-96 bg-white p-6 rounded-xl shadow-md"
    >
      <h1 class="text-4xl font-bold text-center text-blue-800 mb-4">Login</h1>

      <input
        type="text"
        placeholder="Username"
        v-model="username"
        required
        class="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        placeholder="Enter your password"
        v-model="password"
        required
        class="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        class="bg-blue-600 mt-7 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Login
      </button>

      <button
        type="button"
        @click="goTORegister"
        class="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Register
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      console.log("Login button clicked");
      try {
        const response = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
         }),
        });

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const data = await response.json();
        console.log("Login successful:", data);
        } catch (error) {
          console.error("Login error:", error);
        }
    },

    goTORegister() {
      this.$router.push("/register");
    }
  }
};
</script>

