<template>
    <div class="dashboard-page">
        <h1 class="text-2xl font-bold">Job Application Tracker</h1>
        <div class="flex gap-4 mt-4" >
            <button class="btn btn-primary" @click="navigateToAddJob">Add Job</button>
        </div>

        <div class="JobList mt-6"> 
            <h2 class="text-xl font-semibold mb-2">Your Job Applications</h2>
            <div v-if="jobs.lenght === 0" class="text-gray-500">No job applications found.</div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="job in jobs" :key="job._id" class="job-card">
                    <h3 class="font-semibold">{{ job.title }}</h3>
                    <p>Company: {{ job.companyName }}</p>
                    <p>Status: {{ job.status }}</p>
                    <p>Reminder: {{ job.reminderDate || "Not set" }}</p>
                    <!-- need to add edit job button -->
                </div>
            </div>
        </div>
    </div>
</template>




<script>
export default {

  data() {
    return {
      jobs: [],
    };
  },

  method: {
    navigateToAddJob() {
      //this.$router.push(`/add-job`);
    },

    editJob(jobId) {
        //this.$router.push(`/${jobId}/edit-job`);
    },

    async fetchJobs(){
        const userID = this.$route.params.userId; 

        try{
            const response = await fetch('http://localhost:5000/jobs/getAllJobs');

            if ( !response.ok ) {
                throw new Error("Failed to fetch jobs");
            }
            
            const data = await response.json()
            this.jobs = data.jobs;

        } catch (error) {
            console.error(error);
            alert("Error fetching jobs");
        }
    },

    created() {
        const userId = this.$route.params.userId;
        this.fetchJobs();
    }
  }, 
    
    } 
</script>


<style scoped>
.dashboard-page {
  padding: 16px;
}
.job-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
}
</style>