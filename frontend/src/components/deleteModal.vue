<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-white/60 backdrop-blur-sm flex justify-center items-center transition-all duration-300 z-50"
  >
    <div class="bg-white rounded-lg shadow-2xl p-6 w-110 border border-gray-200">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold">Delete Job</h2>
        <button
          type="button"
          @click="closeModal"
          class="text-2xl text-gray-500 hover:text-gray-700"
          aria-label="Close Modal"
        >×</button>
      </div>
      <p class="mb-6 text-gray-700">Are you sure you want to delete this job Application?</p>
      <div class="flex justify-end space-x-3">
        <button
          type="button"
          @click="closeModal"
          class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >Cancel</button>
        <button
          type="button"
          @click="deleteJob"
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >Delete</button>
      </div>
    </div>
  </div>
</template>




<script>

export default {

    props: {
        isVisible: Boolean,
        jobId: {
            type: String,
            required: true
        }
    },

    methods: {

    closeModal(){
        this.$emit("close")
    },
    
    async deleteJob() {
        try{
        const response = await fetch(`http://localhost:5000/jobs/deleteJob/${this.jobId}`,{
          method: "DELETE"
        });

        if(!response.ok) {
          throw new Error("Delete job failed");  
        }
        this.$emit("deleted")        
        this.closeModal();
      } catch ( error ) {
        alert(error.message || "Error deleting job");
       }
    },
    }
}


</script>