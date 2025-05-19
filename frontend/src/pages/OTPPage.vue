<template>
    <div>
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
            @click="goToLogin"
            class="w-full p-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition"
            >
            Back to Login
            </button>
        </form>
    </div>
</template>