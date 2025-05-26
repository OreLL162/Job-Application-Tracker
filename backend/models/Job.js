import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  jobTitle: { 
    type: String, 
    required: true
  }, 

  companyName: { 
    type: String, 
    required: true
  },

  applicationDate: { 
    type: Date, 
    required: true,
  },

  status: { 
    type: String, 
    enum: ["Applied", "Interviewing", "Assignment", "Offer", "Rejected"], 
    required: true, 
  },

  notes: { 
    type: String, 
    default: "" 
  },

  reminderDate: { 
    type: Date, 
  },

  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    //required: true, 
  },

}, 

{ 
  timestamps: true
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
