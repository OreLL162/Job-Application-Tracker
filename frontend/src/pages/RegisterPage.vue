<template>
    <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <p v-if="errorMessage" class="text-red-500 font-bold bg-red-100 p-2 rounded-md mb-4">
      {{ errorMessage }}
    </p>
    <form
      @submit.prevent="handleRegister"
      class="flex flex-col gap-4 w-96 bg-white p-6 rounded-xl shadow-md"
    >
      <h1 class="text-4xl font-bold text-center text-blue-800 mb-6">Register</h1>

      <input
        type="text"
        placeholder="Username"
        v-model="username"
        required
        class="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

        <input
        type="text"
        placeholder="Email"
        v-model="email"
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
        Register Now!
      </button>

      <button
        type="button"
        @click="NavToLogin"
        class="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Back to Login
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
      isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      },
      
    async handleRegister() {

      if (!this.isValidEmail(this.email)) {
        this.errorMessage = "Please enter a valid email address.";
        return; // Stop form submission
      }
      try {
        const response = await fetch("http://localhost:5000/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password,
         }),
        });

        if (!response.ok) {
          //show the user error message on the UI
          const errorData = await response.json();
          console.error("Registration error:", errorData);
          throw new Error("Registration failed");
        }

        const data = await response.json();
        this.$router.push("/");
        console.log("Registration successful:", data);
        } catch (error) {
          console.error("Registration error:", error);
        }

    },
    NavToLogin() {
        this.$router.push("/");
    },
  },
};
</script>

