<template>
  <div class="min-h-screen flex flex-col">
    <router-view class="flex-1" />
    <footer
      class="w-full text-center py-8 text-lg bg-gradient-to-r from-blue-100 via-gray-100 to-blue-100 text-gray-700 shadow-inner border-t border-gray-200"
    >
      <span class="font-semibold tracking-wide text-xl">© 2025 Job Application Tracker.</span>
      <span class="ml-4 text-lg">All rights reserved to Orel Yehudai.</span>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>
