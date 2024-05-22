const mongoose = require("mongoose")
const panelMemberSchema = require('../schemas/PanelMemberSchema');
const generateRandomPassword = require('../methods/generatePassword')
const sendEmail = require('../methods/SendEmail')


const signinPanelMember = async (req, res) => {
    try {
        const {password } = req.body
        const userid = req.params.userid;
 
        const user = await panelMemberSchema.findOne({
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

const signupPanelMember = async (req, res) => {
    try {
        const {userid, name, password, email } = req.body
        
        const panelMember = new panelMemberSchema({
            userid: userid,
            name: name,
            password: password,
            email: email
          });
          
          await panelMember.save();

          res.status(201).json({
            message: "User created."
        })
    }catch(err){
        return res.status(500).send("Error creating Supervisor.");
    }
}

const changePasswordPanelMember = async (req, res) => {
    try{
        const {oldPassword, newPassword} = req.body
        const {userid} = req.params

        const panelMemberData = await panelMemberSchema.findOne({
            userid: userid
        })

        if(!panelMemberData){
            return res.status(404).json({
                message: `No panel member ${userid} found!`
            })
        }
        if(panelMemberData.password != oldPassword){
            return res.status(500).json({
                message: "Old Password does not match!!"
            })
        }

        panelMemberData.password = newPassword
        panelMemberData.resetPassword = false

        await panelMemberData.save()

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

const resetPasswordPanelMember = async (req, res) => {
    try{
        const {userid} = req.params

        const panelMember = await panelMemberSchema.findOne({
            userid : userid
        })

        if(!panelMember){
            return res.status(404).json({
                message: "No panel member found with this id!"
            })
        }

        let password = generateRandomPassword(8)
        panelMember.password = password
        panelMember.resetPassword = true

        await panelMember.save()

        const subject = "Password Reset Successful"
        const text = `Use the updated password to login to your system:\n
        User Id: ${panelMember.userid}\n"Password: ${password}`
        sendEmail(panelMember.email, subject, text)

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

const createPanelMemberProfile = async (req, res) => {
    try{
        const {freeslots, domain} = req.body;
        const {userid} = req.params;

        // Find the Panel Member document in the database
        const updatedPanelMember = await panelMemberSchema.findOneAndUpdate(
            { userid },
            {
            domain,
            freeslots
            },
            { new: true }
        );

        if (!updatedPanelMember) {
            return res.status(404).json({
            error: {
                message: "Not Found",
                details: "Panel Member not found",
            },
            });
        }
  
        res.status(200).json({
            message: "Panel Member updated successfully",
            panelMember: updatedPanelMember,
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

const getPanelMemberInfo = async (req, res) => {
    try {
        const userid = req.params.userid;
 
        const panelMemberData = await panelMemberSchema.findOne({
            userid: userid
        })
        // console.log(panelMemberData)
        if (!panelMemberData) {
            return res.status(404).json({
                message: "NO user found!!."
            })
        }
  
        res.status(200).send(panelMemberData)
    } catch (error) {
        res.status(404).json({
            message: "Panel member not found",
            error: error.message
        })
    }
}

const editPanelMemberInfo = async (req, res) => {
    try{
        const {freeslots, domain} = req.body;
        const {userid} = req.params;

        // Find the Panel Member document in the database
        const updatedPanelMember = await panelMemberSchema.findOneAndUpdate(
            { userid },
            {
            domain,
            freeslots
            },
            { new: true }
        );

        if (!updatedPanelMember) {
            return res.status(404).json({
            error: {
                message: "Not Found",
                details: "Panel Member not found",
            },
            });
        }
  
        res.status(200).json({
            message: "Panel Member updated successfully",
            panelMember: updatedPanelMember,
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

const checkPanelMemberProfileCompletion = async (req, res) => {
    const userid = req.params.userid;

    try {
        const panelMember = await panelMemberSchema.findOne({ userid: userid });

        if (!panelMember) {
            return res.status(404).json({ error: 'Panel member not found' });
        }

        if (panelMember.domain !== null || (panelMember.freeslots && panelMember.freeslots.length > 0)) {
            return res.status(200).json({ profileCompleted: true });
        } else {
            return res.status(200).json({ profileCompleted: false });
        }
    } catch (error) {
        console.error('Error checking user profile completion:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
};


module.exports = {signinPanelMember, signupPanelMember, changePasswordPanelMember, resetPasswordPanelMember,
    createPanelMemberProfile, getPanelMemberInfo, editPanelMemberInfo,checkPanelMemberProfileCompletion}