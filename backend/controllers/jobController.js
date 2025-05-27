import mongoose from "mongoose";
import Job from "../models/Job.js";

export async function addJob(req, res) { 
    console.log(req.body);
    try {
        const {jobTitle, companyName, applicationDate, status, notes, reminderDate, user } = req.body; 


        if( !user ) {
            return res.status(400).json({msg: "Invalid User."})

        }


        if ( !jobTitle || !companyName || !applicationDate || !status) {
            return res.status(400).json({msg: "Please provide all required fields."})
        }

        const newJob = new Job ({
            jobTitle,
            companyName,
            applicationDate,
            status,
            notes,
            reminderDate,
            user
        });

        

        const savedJob = await newJob.save();

        return res.status(201).json({msg: "Job Application added successfully", job: savedJob});
    } catch (error) {
        console.error("Error adding job:", error);
        return res.status(500).json({ msg: "Server error, please try again later" });
    }

}



export async function updateJobApplication(req, res) { 
    const {id} = req.params; 
    const updates = req.body;

    try {

        const updatedJob = await Job.findByIdAndUpdate(
            id, 
            updates,
            {new: true}
        )

        if ( !updatedJob ) {
            return res.status(404).json({msg:"Job was not found."})
        }

        return res.status(200).json({msg: "Job updated successfully", job:updatedJob });

        
    } catch (error) {
        console.error("Error updating job:", error);
        return res.status(500).json({ msg: "Server error, please try again later" });
    }

}

export async function deleteJobApplication(req, res) { 
    const { id } = req.params; 

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "Invalid job ID" });
        }


        const deletedJob = await Job.findByIdAndDelete(id);

        if (!deletedJob) {
            return res.status(404).json({ msg: "Job not found" });
        }

        res.status(200).json({ msg: "Job deleted successfully" });
    } catch (error) {
        console.error('Error deleting job:', error.message);
        res.status(500).json({ msg: "Failed to delete job" });
    }
};

export async function getAllJobs(req, res) {

    try { 
        const jobs = await Job.find().sort({applicationDate: -1})
        console.log("Fetched jobs:", jobs);
        res.status(200).json(jobs);
    } catch (error) {
        console.error('Error retrieving jobs:', error.message);
        res.status(500).json({ msg: "Failed to retrieve jobs" });
    }
 }

export async function getJob(req, res) { 

    try {
        const {id} = req.params; 
        const job = await Job.findById(id);

        if ( !job ) { 
            return res.status(404).json({msg: "Job was not found."})
        }

        res.status(200).json(job);
    } catch (error) {
        console.error('Error fetching job:', error.message);
        res.status(500).json({ msg: 'Internal server error' });
    }
}


