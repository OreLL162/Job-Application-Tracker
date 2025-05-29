<template>
<div
    v-if="isVisible"
    class="fixed inset-0 bg-white/60 backdrop-blur-sm flex justify-center items-center transition-all duration-300 z-50"
>
    <div class="bg-white rounded-lg shadow-2xl p-6 w-96 border border-gray-200 relative">
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold">
                {{ job ? "Edit Job" : "Add New Job" }}
            </h2>
        </div>
        <form @submit.prevent="handleSubmit">
            <div class="mb-4">
                <label for="title" class="block text-sm font-medium mb-2">Job Title</label>
                <input
                v-model="jobData.jobTitle"
                type="text"
                id="title"
                class="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Job Title"
                required
                />
            </div>
            <div class="mb-4">
                <label for="company" class="block text-sm font-medium mb-2">Company</label>
                <input
                v-model="jobData.companyName"
                type="text"
                id="company"
                class="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Company Name"
                required
                />
            </div>
            <div class="mb-4">
                <label for="status" class="block text-sm font-medium mb-2">Status</label>
                <select
                v-model="jobData.status"
                id="status"
                class="w-full border border-gray-300 rounded px-3 py-2"
                required
                >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Assignment">Assignment</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
                </select>
            </div>
            <div class="mb-4">
                <label for="applicationDate" class="block text-sm font-medium mb-2">Application Date</label>
                <input
                v-model="jobData.applicationDate"
                type="date"
                id="applicationDate"
                class="w-full border border-gray-300 rounded px-3 py-2"
                required
                />
            </div>
            <div class="mb-4">
                <label for="notes" class="block text-sm font-medium mb-2">Notes</label>
                <textarea
                v-model="jobData.notes"
                id="notes"
                rows="3"
                class="w-full border border-gray-300 rounded px-3 py-2"
                ></textarea>
            </div>
            <div class="mb-4">
                <label for="reminderDate" class="block text-sm font-medium mb-2">Reminder Date</label>
                <input
                v-model="jobData.reminderDate"
                type="date"
                id="reminderDate"
                class="w-full border border-gray-300 rounded px-3 py-2"
                />
            </div>
            <div class="flex justify-end space-x-3">
                <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                Cancel
                </button>
                <button
                type="submit"
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                Save
                </button>
            </div>
        </form>
    </div>
</div>
</template>


<script>

export default {
    props:{
        isVisible: Boolean,
        job : {
            type: Object,
            default: null,
        },
    },

    data() {
        return {
            jobData : {
                jobTitle: this.job?.jobTitle || "",
                companyName: this.job?.companyName || "",
                status: this.job?.status || "",
                applicationDate: this.job?.applicationDate || "",
                notes: this.job?.notes || "",
                reminderDate: this.job?.reminderDate || "",
                user: this.job?.user,
                }
        };
    },

    watch: {
        job: {
            immediate: true,
            handler(newJob) {
                if (newJob) {
                    this.jobData = {
                        jobTitle: newJob.jobTitle || "",
                        companyName: newJob.companyName || "",
                        status: newJob.status || "",
                        applicationDate: newJob.applicationDate || "",
                        notes: newJob.notes || "",
                        reminderDate: newJob.reminderDate || "",
                        user: newJob.user,
                    };
                } else {
                    this.jobData = {
                        jobTitle: "",
                        companyName: "",
                        status: "",
                        applicationDate: "",
                        notes: "",
                        reminderDate: "",
                        user: this.userId,
                    };
                }
            }
        },
        isVisible(newVal) {
            // If opening modal for add (job is null), reset the form
            if (newVal && !this.job) {
                this.jobData = {
                    jobTitle: "",
                    companyName: "",
                    status: "",
                    applicationDate: "",
                    notes: "",
                    reminderDate: "",
                    user: this.userId,
                };
            }
        }
    },

    computed: {
    userId() {
      return this.$route.params.userId;
    },

    jobId () {
        return this.job?._id;
    },
    },
    methods: {

        closeModal(){
            console.log("closeModal called");
            this.$emit("close");
        },

        async handleSubmit() {
            console.log("handleSubmit called", this.jobData);
            try {
                let url, method ; 
                    if(!this.job){
                        url = 'http://localhost:5000/jobs/addJob';
                        method = "POST";
                        this.jobData.user = this.userId;
                    } else {
                        url = `http://localhost:5000/jobs/updateJob/${this.jobId}`;
                        method = "PUT";
                    }
                        
                        const response = await fetch(url, {
                        method,
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(this.jobData)
                        });


                        if ( !response.ok ) {
                        throw new Error(`${method} failed`);
                        }
                        
                        this.$emit("saved");
                        this.closeModal();
                    } catch ( error ) {
                        console.error("Error saving job:", error);
                        alert("Failed to save job.");
                    }
        },
    }
}


</script>