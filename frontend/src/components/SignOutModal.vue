<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-white/60 backdrop-blur-sm flex justify-center items-center transition-all duration-300 z-50"
  >
    <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-sm">
      <h2 class="text-xl font-bold mb-4">Sign Out</h2>
      <p class="mb-6">Are you sure you want to sign out?</p>
      <div class="flex justify-end gap-3">
        <button
          @click="$emit('close')"
          class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >Cancel</button>
        <button
          @click="$emit('signedOut')"
          class="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700"
        >Sign Out</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: Boolean,
  },
}
</script>