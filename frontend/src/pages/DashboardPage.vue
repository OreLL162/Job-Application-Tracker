<template>
  <div class="w-full max-w-7xl min-w-[280px] mx-auto p-6 bg-white rounded-2xl shadow-md">
    <header class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Job Application Tracker</h1>
          <button
          @click="openAddJobModal"
          class="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-800 "
        > Add Job
        </button>

        <button
          @click="signOut"
          class="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700"
        >Sign Out</button>
    </header>
    

    <table class="w-full border-collapse rounded-lg overflow-hidden shadow-sm min-h-[200px]">
      <thead class="bg-gray-50">
        <tr>
          <th class="text-left py-3 px-4 text-md font-semibold text-gray-700">
            Company
          </th>
          <th class="text-left py-3 px-4 text-md font-semibold text-gray-700">
            Job Title
          </th>
          <th class="text-left py-3 px-4 text-md font-semibold text-gray-700">
            status
          </th>
          <th class="text-left py-3 px-4 text-md font-semibold text-gray-700">
            Application Date
          </th>
          <th class="text-left py-3 px-4 text-md font-semibold text-gray-700">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
      <tr 
        v-for="job in jobs"
        :key="job._id"
        class="border-b last:border-none hover:bg-gray-100"
        >
        <td class="py-3 px-4 text-gray-700">{{ job.companyName }}</td>
        <td class="py-3 px-4 text-gray-700">{{ job.jobTitle }}</td>
        <td class="py-3 px-4">
          <span
            class="inline-block px-3 py-1 text-sm font-medium rounded-lg"
            :class="getStatusClass(job.status)"

          >
            {{ job.status }}
          </span>
        </td>

        <td class="py-3 px-4 text-gray-700">{{ formatDate(job.applicationDate) }}</td>

        <td class="py-3 px-4">
          <button
          @click="openEditJobModal(job)"
          class="text-blue-600 hover:underline">View/Edit</button>    
          
          <button
          class="ml-5 text-blue-600 hover:underline hover:text-black "
          @click="askToDeleteJob(job._id)">
          Delete
          </button>
        </td>
      </tr>

    </tbody>
    </table>

    <router-view />
    <JobModal
      :isVisible="showJobModal"
      :job="selectedJob"
      @close="showJobModal = false"
      @saved="handleJobSaved"
    />


    <deleteModal
      :isVisible="showDeleteJobModal"
      :jobId="jobIdToDelete"
      @close="showDeleteJobModal = false"
      @deleted="handleJobDeleted"
    />

  </div>
</template>




<script>
import JobModal from '../components/JobModal.vue';
import deleteModal from '../components/deleteModal.vue';

export default {

  components: {
    JobModal,
    deleteModal
  },

  mounted() {
    this.fetchJobs()
  },


  data() {
    return {
      jobs: [],
      showJobModal: false,
      showDeleteJobModal : false,
      selectedJob: null,
      jobIdToDelete:null
    };
  },

  methods: {

  signOut() {
    sessionStorage.removeItem("username")
    this.$router.replace('/login')
  },

  askToDeleteJob(jobId){
    this.jobIdToDelete = jobId;
    this.showDeleteJobModal = true
  },

  handleJobDeleted(){
    this.showDeleteJobModal = false;
    this.fetchJobs();
  },
  
  handleJobSaved() {
    this.showJobModal = false;
    this.fetchJobs(); // Refresh the job list after saving
  },

  openAddJobModal() {
    this.selectedJob = null;
    this.showJobModal = true;
  },
  openEditJobModal(job) {
    this.selectedJob = {...job};
    this.showJobModal = true;

  },

    formatDate(dateString) {
      return new Date(dateString).toISOString().split("T")[0]; // Extracts only the date
    },

    getStatusClass(status) {
      const classes = {
        Applied: "bg-blue-200 text-blue-700",
        Interview: "bg-purple-200 text-purple-700",
        Assignment:"bg-orange-200 text-orange-700",
        Offer: "bg-green-200 text-green-700",
        Rejected: "bg-red-200 text-red-700",
      };
      return classes[status] || "bg-gray-100 text-gray-700";
    },
  
    async fetchJobs(){
        try{
            const userId = this.$route.params.userId;
            const response = await fetch(`http://localhost:5000/jobs/getAllJobsByUser/${userId}`,
            );

            if ( !response.ok ) {
                throw new Error("Failed to fetch jobs");
            }
            
            const data = await response.json()
            this.jobs = data;
            console.log("Fetched jobs:", this.jobs);


        } catch (error) {
            console.error(error.message);
            alert(error.message || "Error fetching jobs");
        }
    },
    
    async deleteJob(jobId) {
      try{
        const response = await fetch(`http://localhost:5000/jobs/deleteJob/${jobId}`,{
          method: "DELETE"
        });

        if(!response.ok) {
          throw new Error("Delete job failed");  
          }

        // Remove the deleted job from the jobs array
        await this.fetchJobs()
      } catch ( error ) {
        alert(error.message || "Error deleting job");
       }
    },
  } 
    
    } 
</script>

