const mongoose = require("mongoose")
const studentSchema = require('../schemas/StudentSchema')
const groupSchema = require('../schemas/GroupSchema')
const groupInviteSchema = require('../schemas/GroupInviteSchema')
const supervisorSchema = require('../schemas/SupervisorSchema')
const supervisionRequestSchema = require('../schemas/SupervisionRequestsSchema')

const generateRandomPassword = require('../methods/generatePassword');
const sendEmail = require('../methods/SendEmail');
const verifyGroupConstraints = require('../methods/verifyGroupConstraints')

const { json } = require("express");
require( 'dotenv').config();

const signinStudent = async (req, res) => {
    try {
        const {password } = req.body
        const userid = req.params.userid;
 
        const user = await studentSchema.findOne({
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
            student: user
        })
    } catch (error) {
        console.log(error)
    }
}

const signupStudent = async (req, res) => {
    try {
        const {userid, name, password, email } = req.body
        
        const student = new studentSchema({
            userid: userid,
            name: name,
            password: password,
            email: email
        });
          
        await student.save();

        res.status(201).json({
            message: "User created."
        })
    }catch(err){
        return res.status(500).send("Error creating Student.");
    }
}

const createGroup = async (req, res) => {
    try {
        const latestGroup = await groupSchema.findOne({}, {}, { sort: { groupid: -1 } });
        const semester = process.env.semester;
        const groupNumber = latestGroup ? parseInt(latestGroup.groupid.split('-G')[1]) + 1 : 1;
        const {userid } = req.body
        const programObj = await studentSchema.findOne({userid}, 'program')
        console.log(programObj.program)

        const student = await studentSchema.findOne({userid})

        if(student.inGroup){
            return res.status(403).json({
                message: "You are already in a group."
            })
        }

        let groupProgram = ""

        if (student.program.includes('Software')) {
            groupProgram = 'BS - SE';
            
        } else if (student.program.includes('Data')) {
            groupProgram = 'BS - DS';
        } else if (student.program.includes('Computer')) {
            groupProgram = 'BS - CS';
        }

        console.log(groupProgram)

        const group = new groupSchema({
            groupid: `${semester}-G${groupNumber}`,
            leader: userid,
            members: [userid],
            program: groupProgram
        });
              
        await group.save();

        student.inGroup = true;
        student.isLeader = true;

        await student.save()
        
       

        res.status(201).json({
            message: "Group created.",
            group,
            student
        })
    }catch(err){
        return res.status(500).send(err.message);
    }
}

const viewGroupByLeader = async (req, res) => {
    try {
        const {userid } = req.params
        
        const group = await groupSchema.findOne({leader: userid})

        const members = await studentSchema.find({ userid: { $in: group.members } })

        let supervisor = {}
        if(group.supervisor){
            supervisor = await supervisorSchema.findOne({ userid: group.supervisor })
        }else{
            supervisor = {
                userid: "No Supervisor",
                name: "No Supervisor"
            }
        }

        res.status(200).json({
            message: "Group Information.",
            group,
            members,
            supervisor
        })
    }catch(err){
        return res.status(500).send(err.message);
    }
}

const viewGroupByMember = async (req, res) => {
    try {
        const {userid } = req.params
        console.log(userid)
        
        const group = await groupSchema.findOne({ members: userid });

        // Check if group is found
        if (!group) {
            return res.status(404).json({
                message: `No group found for member with userid ${userid}`
            });
        }

        const members = await studentSchema.find({ userid: { $in: group.members } })

        let supervisor = {}
        if(group.supervisor){
            supervisor = await supervisorSchema.findOne({ userid: group.supervisor })
        }else{
            supervisor = {
                userid: "No Supervisor",
                name: "No Supervisor"
            }
        }

        res.status(200).json({
            message: "Group Information.",
            group,
            members,
            supervisor
        })
    }catch(err){
        return res.status(500).send(err.message);
    }
}

const deleteGroup = async (req, res) => {
    try {
        const {groupid } = req.body
        const group = await groupSchema.findOneAndDelete( { groupid: groupid } );
        if (!group) {
            return res.status(404).json({
                message: "Group not found"
            })
        }

        const updatedStudent = await studentSchema.findOneAndUpdate(
            { userid: group.leader },
            {
                inGroup: false,
                isLeader: false
            },
            { new: true }
        )

        res.status(201).json({
            message: "Group Deleted.",
            group: group,
            student: updatedStudent
        })
    }catch(err){
        return res.status(500).send(err.message);
    }
}

const editGroup = async (req, res) => {
    try {
        const {groupid, groupTitle, groupDomains, groupDescription } = req.body
        
        const updatedGroup = await groupSchema.findOneAndUpdate(
            { groupid: groupid },
            {
                title: groupTitle,
                domain: groupDomains,
                description: groupDescription
            },
            { new: true }
        )
        if (!updatedGroup) {
            return res.status(404).json({
                message: "Group not found"
            })
        }

        let supervisor = {}
        if(group.supervisor){
            supervisor = await supervisorSchema.findOne({ userid: group.supervisor })
        }else{
            supervisor = {
                userid: "No Supervisor",
                name: "No Supervisor"
            }
        }

        res.status(201).json({
            message: "Group Information Updated.",
            group: updatedGroup,
            supervisor
        })
    }catch(err){
        return res.status(500).send(err.message);
    }
}

const inviteStudentToGroup = async (req, res) => {
    try{
        const {leaderid, memberid} = req.body;

        const group = await groupSchema.findOne({leader:leaderid})

        const groupInvite = new  groupInviteSchema({
            leaderid : leaderid ,
            memberid : memberid ,
            groupid : group.groupid,
            groupTitle : group.title,
            status: "pending"
        });

        const invite = await groupInvite.save()
        
        return res.status(200).json({
            message: "invite successful",
            invite: invite
        })
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}

const viewGroupInvitesByLeader = async (req, res) => {
    try{
        const {userid} = req.body

        const invites = await groupInviteSchema.find({leaderid: userid})

        return res.status(200).json({
            invites: invites
        })
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}

const viewGroupInvitesByMember = async (req, res) => {
    try{
        const {userid} = req.params

        const invites = await groupInviteSchema.find({memberid: userid})

        return res.status(200).json({
            invites: invites
        })
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}
//requires working
// const acceptGroupInviteByMember = async (req, res) => {
//     try{
//         const {memberid, groupid} = req.body

//         const group = await groupSchema.findOne({ groupid: groupid });

//         group.members.forEach ( async m => {
//             console.log(m)
//             let member = await studentSchema.findOne({userid: m})
//             console.log(member)
//         });

//         // student.CGPA = CGPA;
//         // student.skills = skills;
//         // student.interests = interests;
//         // student.freeslots = freeslots;
    
//         // await student.save();
    

//         // const updatedGroup = await groupSchema.findOneAndUpdate(
//         //     { groupid: groupid },
//         //     {
//         //         $push: {members: memberid}
//         //     },
//         //     { new: true }
//         // )
//         // if(!updatedGroup){
//         //     return res.status(400).json({
//         //         message: "error adding member",

//         //     })
//         // }

//         // const updatedStudent = await studentSchema.findOneAndUpdate(
//         //     { userid: memberid},
//         //     {
//         //         inGroup: true,
//         //         isLeader: false
//         //     },
//         //     {new :true}            
//         // )

//         // const updatedGroupInvite = await groupInviteSchema.findOneAndUpdate(
//         //     { 
//         //         memberid: memberid,
//         //         groupid: groupid
//         //     },
//         //     {status: "Accepted"},
//         //     {new: true}
//         // )

//         return res.status(200).json({
//             // group: updatedGroup,
//             // member: updatedStudent,
//             // groupInvite: updatedGroupInvite
//         })
//     }catch(error){
//         return res.status(500).json({
//             message: error.message
//         })
//     }
// }

const acceptGroupInviteByMember = async (req, res) => {
    try{
        const {memberid, groupid} = req.body

        let group = await groupSchema.findOne({groupid})
        presentPrograms = []
        for ( let i=0; i< group.members.length; i++){
            let student = await studentSchema.findOne({userid : group.members[i]})
            presentPrograms.push(student.program)
        }
        let member = await studentSchema.findOne({userid: memberid})
        if(!verifyGroupConstraints(group.program, presentPrograms, member.program)){
            return res.status(405).json({
                message : "Group constraints not satisfied!"
            })
        }

        const updatedGroup = await groupSchema.findOneAndUpdate(
            { groupid: groupid },
            {
                $push: {members: memberid}
            },
            { new: true }
        )

        console.log("updatedGroup = ", updatedGroup)
        if(!updatedGroup){
            return res.status(400).json({
                message: "error adding member",

            })
        }

        const updatedStudent = await studentSchema.findOneAndUpdate(
            { userid: memberid},
            {
                inGroup: true,
                isLeader: false
            },
            {new :true}            
        )

        const updatedGroupInvite = await groupInviteSchema.findOneAndUpdate(
            { 
                memberid: memberid,
                groupid: groupid
            },
            {status: "Accepted"},
            {new: true}
        )

        return res.status(200).json({
            group: updatedGroup,
            member: updatedStudent,
            groupInvite: updatedGroupInvite
        })
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}

const rejectGroupInviteByMember = async (req, res) => {
    try{
        const {memberid, groupid} = req.body

        const updatedGroupInvite = await groupInviteSchema.findOneAndUpdate(
            { 
                memberid: memberid,
                groupid: groupid
            },
            {status: "Rejected"},
            {new: true}
        )

        return res.status(200).json({
            message: "Group invite Rejected!",
            groupInvite: updatedGroupInvite
        })
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}

const leaveGroupByMember = async (req, res) => {
    try{
        const {memberid, groupid} = req.body

        const updatedGroup = await groupSchema.findOneAndUpdate(
            {groupid: groupid},
            {
                $pull: {members: memberid}
            },
            {new : true}
        )

        if(!updatedGroup){
            return res.status(400).json({
                message:"error removing student"
            })
        }

        const updatedStudent = await studentSchema.findOneAndUpdate(
            {userid: memberid},
            {
                inGroup:false
            },
            {new:true}
        )

        return res.status(200).json({
            message: "Member removed",
            group: updatedGroup,
            student: updatedStudent
        })
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}

const getStudentInfo = async (req, res) => {
    try {
        const {userid} = req.params;
 
        const studentData = await studentSchema.findOne({
            userid: userid
        })
        // console.log(studentData)
        if (!studentData) {
            return res.status(404).json({
                message: "NO user found!!."
            })
        }
  
        res.status(200).send(studentData)
    } catch (error) {
        console.log(error)
    }
}

const editStudentInfo = async (req, res) => {
    try{
        const userid = req.params.userid
        const {CGPA, skills, interests, freeslots}= req.body

        const student = await studentSchema.findOne({ userid: userid });
        console.log("Student", student)

        if (!student) {
        return res.status(404).json({ message: 'Student not found' });
        }

        student.CGPA = CGPA;
        student.skills = skills;
        student.interests = interests;
        student.freeslots = freeslots;
    
        await student.save();

        if(student.inGroup){
            const group = await groupSchema.findOne({members: {"$in": [student.userid]}})
            console.log("group = ", group)

            if(group.members.length == 4){
                let commonFreeslots = [
                    [1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1]
                ]
                for(let i = 0 ; i < group.members.length ; i++){
                    let member = await studentSchema.findOne({userid : group.members[i]})
                    for(let j = 0; j < member.freeslots.length ; j++){
                        for(let k = 0; k < member.freeslots[j].length ; k++){
                            if(member.freeslots[j][k] == 0){
                                commonFreeslots[j][k] = 0
                            }
                        }
                    }

                }
                console.log("commonFreeslots",commonFreeslots)
                group.commonFreeslots = commonFreeslots

                await group.save()
            }
        }
    
        res.status(200).json({
            message: "Student info updated successfully!!",
            student: student
        })
    }catch(err){
        res.status(200).send(err)
    }
}

const searchStudents = async (req, res) => {
    try{

        const { keyword } = req.body || "";

        if (!keyword) {
            return res.status(400).json({
                message: "Keyword is required",
            });
        }

        const students = await studentSchema.find({
            $and: [ 
                { $or: [ 
                    { userid: { $regex: keyword, $options: "i" } }, 
                    { name: { $regex: keyword, $options: "i" } }, 
                ], }, 
                { inGroup: false, } 
            ], 
        }).exec();
      
        if (students.length === 0) {
            return res.status(404).json({
              message: "No students found",
            });
        }
      
        res.status(200).json({
            message: "Students found",
            students,
        });

    }catch (error) {
        res.status(500).json({
          message: "An error occurred",
          error: error.message,
        });
    }
}

const changePasswordStudent = async (req, res) => {
    try{
        const {oldPassword, newPassword} = req.body
        const {userid} = req.params

        const studentData = await studentSchema.findOne({
            userid: userid
        })

        if(!studentData){
            return res.status(404).json({
                message: `No student ${userid} found!`
            })
        }
        if(studentData.password != oldPassword){
            return res.status(500).json({
                message: "Old Password does not match!!"
            })
        }

        studentData.password = newPassword
        studentData.resetPassword = false

        await studentData.save()

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

const resetPasswordStudent = async (req, res) => {
    try {
        const { userid } = req.body;
        const student = await studentSchema.findOne({ userid : userid });

        if (!student) {
            return res.status(404).json({
                message: "No student found with this email!"
            });
        }

        let password = generateRandomPassword(8);
        student.password = password;
        student.resetPassword = true;

        await student.save();

        const subject = "Password Reset Successful";
        const text = `Dear ${student.name},

You requested to retrieve your password for your account on http://localhost:3000.

Use the following details to login:
User ID: ${student.userid}
Password: ${password}

Please change your password after login.

If you received this message without any action from your side, then someone else entered your email address on the http://localhost:3000 website. Therefore, we strongly advise you to change your password immediately.`;

        sendEmail(student.email, subject, text);

        res.status(200).json({
            message: "Password reset email sent!"
        });
    } catch (error) {
        res.status(500).send({
            message: "Error resetting password",
            error: error.message
        });
    }
};

const createStudentProfile = async (req, res) => {
    try{
        const {CGPA, skills, interests, freeslots} = req.body;
        const {userid} = req.params;

        // Find the Student document in the database
        const updatedStudent = await studentSchema.findOneAndUpdate(
            { userid },
            {
            CGPA,
            skills,
            interests,
            freeslots
            },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({
                error: {
                    message: "Not Found",
                    details: "Student not found",
                },
            });
        }
  
        res.status(200).json({
            message: "Student updated successfully",
            student: updatedStudent,
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

const searchSupervisors = async (req, res) => {
    try{

        const { keyword } = req.params;

        if (!keyword) {
            return res.status(400).json({
                message: "Keyword is required",
            });
        }

        const supervisors = await supervisorSchema.find({
            $or: [ 
                { userid: { $regex: keyword, $options: "i" } }, 
                { name: { $regex: keyword, $options: "i" } }, 
            ]              
        }).exec();
      
        if (supervisors.length === 0) {
            return res.status(404).json({
              message: "No supervisors found",
            });
        }
      
        res.status(200).json({
            message: "Supervisors found",
            supervisors,
        });

    }catch (error) {
        res.status(500).json({
          message: "An error occurred",
          error: error.message,
        });
    }
}

const sendSupervisionRequest = async (req, res) => {
    try{
        const {groupid, supervisorid, idea} = req.body;

        const group = await groupSchema.findOne({groupid})

        if(group.supervisor){
            return res.status(400).json({
                message: "This group already has a supervisor!",
                group
            })
        }

        const supervisionRequest = new  supervisionRequestSchema({
            groupid : groupid ,
            title: group.title,
            supervisorid : supervisorid ,
            idea : idea,
            status: "pending"
        });

        const request = await supervisionRequest.save()
        
        return res.status(200).json({
            message: "Request successful",
            request: request
        })
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}

const getAllSupervisionRequests = async (req, res) => {
    try{
        const {groupid} = req.params;

        const allRequests = await supervisionRequestSchema.find({groupid: groupid})
        
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


module.exports = {
    signinStudent, signupStudent, createGroup, searchStudents, getStudentInfo,
    editStudentInfo, changePasswordStudent, resetPasswordStudent, createStudentProfile,
    deleteGroup, editGroup, inviteStudentToGroup, viewGroupInvitesByLeader,
    viewGroupInvitesByMember, acceptGroupInviteByMember, rejectGroupInviteByMember,
    leaveGroupByMember, searchSupervisors, sendSupervisionRequest, getAllSupervisionRequests,
    viewGroupByLeader, viewGroupByMember
}