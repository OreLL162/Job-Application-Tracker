<template>
  <div class="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-md">
    <header class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Job Application Tracker</h1>
          <button
          @click="openAddJobModal"
          class="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-800 "
        > Add Job
        </button>
    </header>
    

    <table class="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
      <thead class="bg-gray-50">
        <tr>
          <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">
            Company
          </th>
          <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">
            Job Title
          </th>
          <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">
            status
          </th>
                    <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">
            Application Date
          </th>
          <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">
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
          <button class="text-blue-600 hover:underline mr-4">View</button>
          <button
          @click="openEditJobModal"
          class="text-blue-600 hover:underline">Edit</button>        
        </td>
      </tr>

    </tbody>
    </table>

    <router-view />

  </div>
</template>




<script>
import JobModal from '../components/JobModal.vue';
import router from '../router';

export default {

  mounted() {
    this.fetchJobs()
  },

  data() {
    return {
      jobs: [],
    };
  },

  methods: {

    formatDate(dateString) {
      return new Date(dateString).toISOString().split("T")[0]; // Extracts only the date
    },

    getStatusClass(status) {
      const classes = {
        Applied: "bg-blue-200 text-blue-700",
        Interviewing: "bg-purple-200 text-purple-700",
        Assignment:"bg-orange-200 text-orange-700",
        Offer: "bg-green-200 text-green-700",
        Rejected: "bg-red-200 text-red-700",
      };
      return classes[status] || "bg-gray-100 text-gray-700";
    },

    openAddJobModal() {
      console.log('Add job button clicked');
      this.$router.push({name:'AddJob', params: {userId: this.$route.params.userId}});
    },

    openEditJobModal(jobId) {
      console.log('Edit button clicked');
      this.$router.push({
      name: 'EditJob',
      params: { userId: this.$route.params.userId, jobId },
    });
  },

    async fetchJobs(){
        try{
            const response = await fetch('http://localhost:5000/jobs/getAllJobs',
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
  }, 
    
    } 
</script>

