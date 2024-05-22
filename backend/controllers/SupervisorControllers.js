const mongoose = require("mongoose")
const supervisorSchema = require('../schemas/SupervisorSchema');
const supervisionRequestSchema = require('../schemas/SupervisionRequestsSchema')
const groupSchema = require('../schemas/GroupSchema')
const studentSchema = require('../schemas/StudentSchema')
const generateRandomPassword = require('../methods/generatePassword')
const sendEmail = require('../methods/SendEmail');
const GroupSchema = require("../schemas/GroupSchema");


const signinSupervisor = async (req, res) => {
    try {
        const {password } = req.body
        const userid = req.params.userid;
 
        const user = await supervisorSchema.findOne({
            
            userid: userid,
            password: password
        })
        // console.log(user)
        if (!user) {
            return res.status(401).json({
                message: "username or password is incorrect."
            })
        }
  
        res.status(200).json({
            message: "Successfully logged in.",
        })
    } catch (error) {
        console.log(error)
    }
}

const signupSupervisor = async (req, res) => {
    try {
        const {userid, name, password, email } = req.body
        
        const supervisor = new supervisorSchema({
            userid: userid,
            name: name,
            password: password,
            email: email
          });
          
          await supervisor.save();

          res.status(201).json({
            message: "User created."
        })
    }catch(err){
        return res.status(500).send("Error creating Supervisor.");
    }
}

const getSupervisorInfo = async (req, res) => {
    try {
        const {userid} = req.params;
        console.log(userid)
 
        const supervisorData = await supervisorSchema.findOne({
            userid: userid
        })
        console.log(supervisorData)
        if (!supervisorData) {
            return res.status(404).json({
                message: "NO user found!!."
            })
        }

        const groups = await groupSchema.find({ groupid: { $in :supervisorData.groups}})
        console.log(groups)
  
        res.status(200).json({supervisorData, groups})
    } catch (error) {
        res.status(500).json({
            message: "Error getting Supervisor Information",
            error: error
        })
    }
}

const editSupervisorInfo = async (req, res) => {
    try{
        const {userid} = req.params
        const{domain, recentProjects, ideas, freeslots} = req.body

        const updatedSupervisor = await supervisorSchema.findOneAndUpdate(
            { userid },
            {
            domain,
            freeslots,
            recentProjects,
            ideas
            },
            { new: true }
        );

        if (!updatedSupervisor) {
            return res.status(404).json({
                error: {
                    message: "Not Found",
                    details: "Supervisor not found",
                },
            });
        }
  
        res.status(200).json({
            message: "Supervisor updated successfully",
            supervisor: updatedSupervisor,
        });
    }catch(error){
        res.status(500).json({
            message: "Error Editing Supervisor Info",
            error: error.message
        })
    }
}

const changePasswordSupervisor = async (req, res) => {
    try{
        const {oldPassword, newPassword} = req.body
        const {userid} = req.params

        const supervisorData = await supervisorSchema.findOne({
            userid: userid
        })

        if(!supervisorData){
            return res.status(404).json({
                message: `No supervisor ${userid} found!`
            })
        }
        if(supervisorData.password != oldPassword){
            return res.status(500).json({
                message: "Old Password does not match!!"
            })
        }

        supervisorData.password = newPassword
        supervisorData.resetPassword = false

        await supervisorData.save()

        res.json({
            message:'Password updated successfully'
        });
    }catch(error){
        res.status(500).json({
            error: {
                message: "Unable to update the password",
                details: error.message
            }
        })
    }
}

const createSupervisorProfile = async (req, res) => {
    try{
        const {recentProjects, ideas, freeslots, domain} = req.body;
        const {userid} = req.params;

        // Find the supervisor document in the database
        const updatedSupervisor = await supervisorSchema.findOneAndUpdate(
            { userid },
            {
            domain,
            freeslots,
            recentProjects,
            ideas
            },
            { new: true }
        );

        if (!updatedSupervisor) {
            return res.status(404).json({
            error: {
                message: "Not Found",
                details: "Supervisor not found",
            },
            });
        }
  
        res.status(200).json({
            message: "Supervisor updated successfully",
            supervisor: updatedSupervisor,
        });
    }catch(error){
        res.status(500).json({
            error: {
                message: "Server Error",
                details: error.message
            }
        })
    }
}

const resetPasswordSupervisor = async (req, res) => {
    try{
        const {userid} = req.params

        const supervisor = await supervisorSchema.findOne({
            userid : userid
        })

        if(!supervisor){
            return res.status(404).json({
                message: "No supervisor found with this id!"
            })
        }

        let password = generateRandomPassword(8)
        supervisor.password = password
        supervisor.resetPassword = true

        await supervisor.save()

        const subject = "Password Reset Successful"
        const text = `Use the updated password to login to your system:\n
        User Id: ${supervisor.userid}\n"Password: ${password}`
        sendEmail(supervisor.email, subject, text)

        res.status(204).json({
            message: "Password Reset Successful!"
        })
    }catch(error){
        res.status(500).send({
            message: "Error Resetting password",
            error: error.message
        })
    }
}

const checkAllSupervisionRequestsBySupervisor = async (req, res) => {
    try{
        const {userid} = req.params;
        

        const allRequests = await supervisionRequestSchema.find({supervisorid: userid})
        
        return res.status(200).json({
            message: "Request successful",
            allRequests: allRequests
        })
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}

const viewSupervisionRequestWithGroupDetails = async (req, res) => {
    try{
        const {userid, groupid} = req.query;

        const request = await supervisionRequestSchema.findOne({supervisorid: userid, groupid: groupid})

        const group = await groupSchema.findOne({groupid})

        // Get the names of the members
        const membersNamesObject = await studentSchema.find({ userid: { $in: group.members } })
        const details = {
            title: group.title,
            domain: group.domain,
            idea: request.idea,
            members: membersNamesObject,
            program: group.program
        }
        
        return res.status(200).json({
            message: "Request successful",
            details: details
        })
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}

const addCommentToSupervisionRequest = async (req, res) => {
    try{
        const {userid, groupid, comment} = req.body;

        const request = await supervisionRequestSchema.findOne({supervisorid: userid, groupid: groupid})

        const updatedRequest = await supervisionRequestSchema.findOneAndUpdate(
            { _id: request._id },
            {
            comment: comment
            },
            { new: true }
        );
        
        return res.status(200).json({
            message: "Request successful",
            request: updatedRequest
        })
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}

const rejectSupervisionRequest = async (req, res) => {
    try{
        const {userid, groupid} = req.body;

        const request = await supervisionRequestSchema.findOne({supervisorid: userid, groupid: groupid})

        const updatedRequest = await supervisionRequestSchema.findOneAndUpdate(
            { _id: request._id },
            {
            status: "Rejected"
            },
            { new: true }
        );
        
        return res.status(200).json({
            message: "Request successful",
            request: updatedRequest
        })
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}

const acceptSupervisionRequest = async (req, res) => {
    try{
        const {userid, groupid} = req.body;

        const supervisor = await supervisorSchema.findOne({userid})
        const group = await groupSchema.findOne({groupid})
        const request = await supervisionRequestSchema.findOne({supervisorid: userid, groupid: groupid})

        if (supervisor.groups.includes(groupid)) {
            return res.status(400).json({
                message: "Group is already assigned to the supervisor"
            });
        }

        if(supervisor.availableSlots > 0){
            const updatedSupervisor = await supervisorSchema.findOneAndUpdate(
                {userid},
                {
                    availableSlots: supervisor.availableSlots - 1,
                    $push: { groups: groupid } 
                },
                { new: true }
            )
            const updatedGroup = await groupSchema.findOneAndUpdate(
                { groupid },
                {
                supervisor: userid
                },
                { new: true }
            );
            const updatedRequest = await supervisionRequestSchema.findOneAndUpdate(
                { _id: request._id },
                {
                status: "accepted"
                },
                { new: true }
            );

            return res.status(200).json({
                message: "Request successful",
                request: updatedRequest,
                supervisor: updatedSupervisor,
                group: updatedGroup
            })
        }

        return res.status(404).json({
            message: "No available slots"
        })
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {signinSupervisor, signupSupervisor, getSupervisorInfo, changePasswordSupervisor,
                resetPasswordSupervisor, createSupervisorProfile, editSupervisorInfo, 
                checkAllSupervisionRequestsBySupervisor, viewSupervisionRequestWithGroupDetails,
                addCommentToSupervisionRequest, rejectSupervisionRequest, acceptSupervisionRequest
}