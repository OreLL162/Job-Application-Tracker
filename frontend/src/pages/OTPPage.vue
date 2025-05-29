<template>
    <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
        <form @submit.prevent="HandleOTP" class="flex flex-col gap-4 w-96 bg-white p-6 rounded-xl shadow-md">
            <h1 class="text-4xl font-bold text-center text-blue-800 mb-4">Enter OTP</h1>
            <input
                type="text"
                placeholder="Enter OTP"
                v-model="otp"
                maxlength="6"
                required
                class="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                class="bg-blue-600 mt-7 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Verify OTP
            </button>

            <button
            type="button"
            @click="handleResend"
            class="w-full p-2 mb-3 rounded bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition"
            >
            Resend OTP
            </button>

                  <button
            type="button"
            @click="NavToLogin"
            class="w-full p-2 rounded text-blue-700 font-semibold hover:text-red-600 transition"
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
                otp: "",
                errorMessage: "",
                waitTime: 0,
                resendDisabled: false,
            };
        },
        
    methods: {

        async HandleOTP () {
            try { 
                const username = sessionStorage.getItem("username")
                const response = await fetch("http://localhost:5000/auth/verifyOTP" , {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username,
                        otp: this.otp,
                    }),
                })
                
                if(!response.ok) {
                    const data = await response.json();
                    this.errorMessage = data.message;
                    console.error("OTP Verification failed:", this.errorMessage);
                    alert(this.errorMessage);
                } 
                // localStorage.removeItem("username");
                const data = await response.json();
                console.log("OTP Verification successful:", data);

                const userId = data.userId;
                localStorage.setItem("userId",userId)
                this.$router.push(`/${userId}/dashboard`);
             } catch (error) {
                console.error("OTP Verification error:", error);
                alert("An error occurred during OTP verification.");
            }
    }, 

    async handleResend() {
        const username = sessionStorage.getItem("username")
        try {
            const response = await fetch("http://localhost:5000/auth/resendOTP", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({username})
            });

            if (!response.ok) {
                const errorData = await response.json();

                if (response.status === 429 && errorData.msg) {
                    const match = errorData.msg.match(/(\d+)s/);
                    if (match && match[1]) {
                        alert(`Please wait ${match[1]} seconds before requesting a new OTP.`);
                    } else {
                        alert(errorData.msg); 
                    }
                     } else {
                        alert(errorData.msg || "Failed to resend OTP");
                    }
                    return;
                }
            // localStorage.removeItem("username");
            alert("OTP resent successfully!");
        } catch (error) {
            console.error(error);
            alert(error.message || "Error resending OTP");
    }
  },

    NavToLogin() {
        this.$router.push("/");
    },
}
}
           
</script>