const mongoose = require("mongoose")
const path = require('path');
const coordinatorSchema = require('../schemas/CoordinatorSchema')
const studentSchema = require('../schemas/StudentSchema')
const groupSchema = require('../schemas/GroupSchema')
const supervisorSchema = require('../schemas/SupervisorSchema')
const panelMemberSchema = require('../schemas/PanelMemberSchema')
const students = require("../store/StudentRecord")
const isStudentEligibleForCapstone = require('../methods/verifyStudent')
const sendEmail = require('../methods/SendEmail')
const generateRandomPassword = require('../methods/generatePassword')


const signinCoordinator = async (req, res) => {
    try {
        const { password } = req.body
        const { userid } = req.params;

        const user = await coordinatorSchema.findOne({
            userid: userid,
            password: password
        })

        if (!user) {
            return res.status(401).json({
                message: "userid or password is incorrect."
            })
        }

        res.status(200).json({
            message: "Successfully logged in.",
            coordinator: user
        })
    } catch (error) {
        console.log(error)
    }
}

const signupCoordinator = async (req, res) => {
    try {
        const { userid, name, email } = req.body
        let password = generateRandomPassword(8)
        const coordinator = new coordinatorSchema({
            userid: userid,
            name: name,
            email: email,
            password: password,
            resetPassword: false
        });

        await coordinator.save();

        let subject = "FYP Management System Login Credentials"
        let text = `Please use these credentials to Login:\nUser ID: ${userid}\nPassword: ${password}`
        sendEmail(email, subject, text)
        res.status(201).json({
            message: "User created."
        })
    } catch (err) {
        return res.status(500).send("Error creating Coordinator.");
    }
}

const getCoordinatorInfo = async (req, res) => {
    try {
        const coordinator = await coordinatorSchema.findOne({ userid: req.params.userid });
        if (!coordinator) {
            return res.status(404).json({ message: "Coordinator not found" });
        }
        res.status(200).json(coordinator);
    } catch (error) {
        console.error('Error fetching coordinator:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const editCoordinatorInfo = async (req, res) => {
    try {
        // Extract userid from request parameters
        const userid = req.params.userid;
        const { name, email } = req.body
        // console.log(`Updating coordinator with userid ${userid}: name=${name}, email=${email}`);

        // Find the coordinator in the database by userid
        const coordinator = await coordinatorSchema.findOne({ userid })
            .catch(err => console.error(err));
        // console.log('Coordinator before update:', coordinator);

        // If the coordinator is not found, return a 404 error
        if (!coordinator) {
            return res.status(404).json({ message: 'Coordinator not found' });
        }

        coordinator.name = name;
        coordinator.email = email;

        await coordinator.save();

        // console.log('Coordinator after update:', coordinator);
        res.status(200).json({
            message: 'Coordinator Updated Successfully',
            coordinator
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while updating the coordinator profile.');
    }
};

// Controller method to fetch coordinator data
// const getCoordinatorInfo = async (req, res) => {
//     try {
//         const userid = req.params.userid;
//         const coordinatorData = await coordinatorSchema.findOne({
//             userid: userid
//         });

//         if (!coordinatorData) {
//             return res.status(404).json({
//                 message: "Coordinator data not found."
//             });
//         }

//         res.status(200).send(coordinatorData);

//     } catch (error) {
//         console.error('Error fetching coordinator data:', error);
//     }
// }

const uploadFile = async (req, res) => {
    res.status(200).send("File upload Successful!")
}

const viewAppliedStudentList = async (req, res) => {
    const fs = require('fs');
    const csv = require('csv-parser');
    const results = [];

    try {
        fs.createReadStream('./files/data.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                const jsonData = JSON.stringify({ data: results }, null, 2);
                res.status(200).send(jsonData)
            });
    } catch (err) {
        res.status(404).send(err)
    }
}

const verifyAppliedStudentList = (req, res) => {
    const fs = require('fs');
    const csv = require('csv-parser');
    const results = [];
    try {
        fs.createReadStream('./files/data.csv')
            .pipe(csv())
            .on('data', (data) => {
                // console.log(data["Roll No."])
                const student = students.find(student => String(student.userid) == data['Roll No.'])
                data["isEligible"] = isStudentEligibleForCapstone(student)
                
                // console.log(data)
                results.push(data)
            })
            .on('end', () => {
                const jsonData = JSON.stringify({ data: results }, null, 2);
                res.status(200).send(jsonData)
            });
    } catch (err) {
        res.status(500).send(err)
    }
}

const viewTemporaryStudentList = async (req, res) => {
    const fs = require('fs');
    const csv = require('csv-parser');
    const results = [];

    try {
        fs.createReadStream('./files/data.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                const jsonData = JSON.stringify({ data: results }, null, 2);
                res.status(200).send(jsonData)
            });
    } catch (err) {
        res.status(404).send(err)
    }
}

const verifySingleStudent = async (req, res) => {
    try {
        const userid = req.params.userid

        const student = students.find((s) => {
            return s.userid == userid
        })

        return res.status(200).json(student)
    } catch (err) {
        return res.status(500).send("Error verifying Single Student")
    }
}

const sendEmailController = async (req, res) => {
    const { userid, subject, text } = req.body

    // console.log(userid, subject, text)
    sendEmail(userid, subject, text)

    res.status(200).send("Success")
}

const registerEligibleStudents = async (req, res) => {
    try {
        const data = req.body.data
        let count = 0

        data.forEach(async (row) => {
            let password = generateRandomPassword(8)
            const student = new studentSchema({
                userid: row.userid,
                name: row.name,
                password: password,
                email: row.userid+"@gift.edu.pk",
                program: row.program
            })

            await student.save()
                .then(count = count + 1) //no. of users created

            //Send user's credentials via email
            let subject = "FYP Management System Login Credentials"
            let text = `Please use these credentials to Login:\nUser ID: ${row.userid}\nPassword: ${password}`
            sendEmail(student.email, subject, text)
        })

        res.status(201).json({
            message: `${count} users created.`
        })
    } catch (err) {
        return res.status(500).send(err);
    }
}

const addSupervisor = async (req, res) => {
    try {
        const { userid, email, name } = req.body;
        let password = generateRandomPassword(8)

        const supervisor = new supervisorSchema({
            userid: userid,
            name: name,
            password: password,
            email: email
        })

        await supervisor.save()

        let subject = "FYP Management System Login Credentials"
        let text = `Please use these credentials to Login:\nUser ID: ${userid}\nPassword: ${password}`
        sendEmail(email, subject, text)

        res.status(201).json({
            message: `Supervisor ${userid} created!`
        })

    } catch (error) {
        res.status(500).json({
            error: {
                message: 'An error occurred while adding the Supervisor!',
                details: error.message
            }
        })
    }
}

const addSupervisionSlots = async (req, res) => {
    try {
        const { userid, slots } = req.body;

        // const updatedSupervisor = await supervisorSchema.findOneAndUpdate(
        //     { userid },
        //     { 
        //         totalSupervisionSlots: slots,
        //         availableSlots: slots - supervisor.groups.length
        //     },
        //     { new : true }
        // )

        const supervisor = await supervisorSchema.findOne({userid})
        // console.log()

        supervisor.totalSupervisionSlots = slots
        supervisor.availableSlots = slots - supervisor.groups.length

        await supervisor.save()

        res.status(201).json({
            message: `Supervisor's slots updated`,
            supervisor
        })

    } catch (error) {
        res.status(500).json({
            error: {
                message: 'An error occurred while adding the Supervision Slots!',
                details: error.message
            }
        })
    }
}

const removeSupervisor = async (req, res) => {
    try {
        const { userid } = req.params;
        const supervisor = await supervisorSchema.findOneAndDelete({ userid: userid });
        if (!supervisor) {
            return res.status(404).json({
                message: 'Supervisor not found'
            });
        }
        res.status(200).json({
            message: 'Supervisor deleted successfully',
            data: supervisor
        });
    } catch (error) {
        res.status(500).json({
            error: {
                message: 'An error occurred while removing the Supervisor!',
                details: error.message
            }
        })
    }
}

const addPanelMember = async (req, res) => {
    try {
        const { userid, email, name } = req.body;
        let password = generateRandomPassword(8)

        const panelMember = new panelMemberSchema({
            userid: userid,
            name: name,
            password: password,
            email: email
        })

        await panelMember.save()

        let subject = "FYP Management System Login Credentials"
        let text = `Please use these credentials to Login:\nUser ID: ${userid}\nPassword: ${password}`
        sendEmail(email, subject, text)

        res.status(201).json({
            message: `Panel Member ${userid} created!`
        })

    } catch (error) {
        res.status(500).json({
            error: {
                message: 'An error occurred while adding the Panel Member!',
                details: error.message
            }
        })
    }
}

const removePanelMember = async (req, res) => {
    try {
        const { userid } = req.params;
        const panelMember = await panelMemberSchema.findOneAndDelete({ userid: userid });
        if (!panelMember) {
            return res.status(404).json({
                message: `Panel Member ${userid} not found`
            });
        }
        res.status(200).json({
            message: `Panel Member ${userid} deleted successfully`,
            data: panelMember
        });
    } catch (error) {
        res.status(500).json({
            error: {
                message: 'An error occurred while removing the Panel Member!',
                details: error.message
            }
        })
    }
}

const removeStudent = async (req, res) => {
    try {
        const { userid } = req.params;
        const student = await studentSchema.findOneAndDelete({ userid: userid });
        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }
        res.status(200).json({
            message: 'Student deleted successfully',
            data: student
        });
    } catch (error) {
        res.status(500).json({
            error: {
                message: 'An error occurred while removing the Student!',
                details: error.message
            }
        })
    }
}

const viewAllStudents = async (req, res) => {
    try {
        const students = await studentSchema.find();
        res.status(200).json(students)
    } catch (error) {
        res.status(500).json({
            error: {
                message: 'An error occurred while getting all students!',
                details: error.message
            }
        })
    }
}

const viewAllSupervisors = async (req, res) => {
    try {
        const supervisors = await supervisorSchema.find();
        res.status(200).json(supervisors)
    } catch (error) {
        res.status(500).json({
            error: {
                message: 'An error occurred while getting all supervisors!',
                details: error.message
            }
        })
    }
}

const viewAllPanelMembers = async (req, res) => {
    try {
        const panelMembers = await panelMemberSchema.find();
        res.status(200).json(panelMembers)
    } catch (error) {
        res.status(500).json({
            error: {
                message: 'An error occurred while getting all panel members!',
                details: error.message
            }
        })
    }
}

const viewAllGroups = async (req, res) => {
    try {
        const groups = await groupSchema.find();
        const modifiedGroups = [];
        for (const group of groups) {
            const supervisor = await supervisorSchema.findOne({ userid: group.supervisor });
            modifiedGroups.push({
                groupid: group.groupid,
                title: group.title,
                category: group.category,
                supervisorName: supervisor ? supervisor.name : 'Unknown',
            });
        }
        res.status(200).json(modifiedGroups);
    } catch (error) {
        res.status(500).json({
            error: {
                message: 'An error occurred while getting all groups!',
                details: error.message,
            },
        });
    }
}

const viewSingleGroupDetails = async (req, res) => {
    try {
        const { groupid } = req.params;
        const group = await groupSchema.findOne({ groupid: groupid });

        // Get the names of the members
        const members = await studentSchema.find({ userid: { $in: group.members } })

        // Get the name of the supervisor
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
            group,
            members,
            supervisor
        });
    } catch (error) {
        res.status(500).json({
            error: {
                message: 'An error occurred while getting group information!',
                details: error.message,
            },
        });
    }
}

const deleteFYPGroup = async (req, res) => {
    try {
        const { groupid } = req.params;
        const group = await groupSchema.findOneAndDelete({ groupid: groupid });
        if (!group) {
            return res.status(404).json({
                message: `Group ${groupid} not found`
            });
        }
        
        // Update the supervisor associated with the group
        const supervisor = await supervisorSchema.findOne({ userid: group.supervisor });
        if (supervisor) {
            // Remove the group from the supervisor's groups array
            supervisor.groups = supervisor.groups.filter(g => g !== groupid);
            // Increment the available slots
            supervisor.availableSlots += 1;
            await supervisor.save();
        }

        await studentSchema.deleteMany({ userid: { $in: group.members } });



        res.status(200).json({
            message: `Group ${groupid} deleted successfully`,
            data: group
        });
    } catch (error) {
        res.status(500).json({
            error: {
                message: 'An error occurred while deleting the Group!',
                details: error.message
            }
        })
    }
}

const viewGroupDetails = async (req, res) => {
    try {
        const group = await groupSchema.findOne({ groupid: req.params.groupid });
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }
        res.status(200).json(group);
    } catch (error) {
        console.error('Error fetching group:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateFYPGroupCategory = async (req, res) => {
    const { groupid } = req.params;
    const { category } = req.body;

    try {
        const group = await groupSchema.findOne({ groupid });
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        group.category = category;
        await group.save();

        return res.status(200).json({ message: 'Group category updated successfully' });
    } catch (error) {
        console.error('Error updating group category:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const changePasswordCoordinator = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body
        const { userid } = req.params

        const coordinatorData = await coordinatorSchema.findOne({
            userid: userid
        })

        if (!coordinatorData) {
            return res.status(404).json({
                message: `No coordinator ${userid} found!`
            })
        }
        if (coordinatorData.password != oldPassword) {
            return res.status(500).json({
                message: "Old Password does not match!!"
            })
        }

        coordinatorData.password = newPassword
        coordinatorData.resetPassword = false

        await coordinatorData.save()

        res.json({
            message: 'Password updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: {
                message: "Unable to update the password",
                details: error.message
            }
        })
    }
}

const resetPasswordCoordinator = async (req, res) => {
    try {
        const { email } = req.body;

        const coordinator = await coordinatorSchema.findOne({
            email: email
        });

        if (!coordinator) {
            return res.status(404).json({
                message: "No coordinator found with this email!"
            });
        }

        let password = generateRandomPassword(8);
        coordinator.password = password;
        coordinator.resetPassword = true;

        await coordinator.save();

        const subject = "Password Retrieval Request";
        const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
        const text = `Dear ${coordinator.name},

You requested to retrieve your password for your account on ${baseUrl}.

Use the following details to login:
User ID: ${coordinator.userid}
Password: ${password}

Please change your password after login.

If you received this message without any action from your side, then someone else entered your email address on the ${baseUrl} webapp. Therefore, we strongly advise you to change your password immediately.`;

        sendEmail(coordinator.email, subject, text);
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

const groupAdjustmentAt3 = async (req, res) => {
    try {
        const { groupid } = req.body;
        const group = await groupSchema.findOne({groupid})

        group.complete = true;

        await group.save()

        return res.status(200).json({
            group
        })

    }catch(error){
        res.status(500).send({
            message: "Error adjusting group at 3",
            error
        })
    }
}

const groupAdjustmentAt5 = async (req, res) => {
    try {
        const { groupid, userid } = req.body;
        const group = await groupSchema.findOne({groupid})

        group.members.push(userid)
        group.complete = true;

        console.log(group.members)

        // await group.save()

        return res.status(200).json({
            group
        })

    }catch(error){
        res.status(500).send({
            message: "Error adjusting group at 3",
            error
        })
    }
}

module.exports = {
    signinCoordinator, signupCoordinator, getCoordinatorInfo, editCoordinatorInfo, 
    verifySingleStudent, uploadFile, viewAppliedStudentList, verifyAppliedStudentList,
    viewTemporaryStudentList, sendEmailController, registerEligibleStudents, addSupervisor,
    removeSupervisor, addPanelMember, removePanelMember, viewAllStudents, viewAllGroups, 
    viewSingleGroupDetails, deleteFYPGroup, viewGroupDetails, updateFYPGroupCategory, 
    viewAllSupervisors, viewAllPanelMembers, changePasswordCoordinator, resetPasswordCoordinator, 
    removeStudent, addSupervisionSlots, groupAdjustmentAt3, groupAdjustmentAt5
}