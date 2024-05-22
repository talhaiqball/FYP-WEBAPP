const app = require('express').Router();

const { signinStudent, signupStudent, createGroup, searchStudents, getStudentInfo, editStudentInfo,
       changePasswordStudent, resetPasswordStudent, createStudentProfile, deleteGroup, editGroup,
       inviteStudentToGroup, viewGroupInvitesByLeader, viewGroupInvitesByMember, acceptGroupInviteByMember,
       rejectGroupInviteByMember, leaveGroupByMember, searchSupervisors, sendSupervisionRequest,
       getAllSupervisionRequests, viewGroupByLeader, viewGroupByMember
}
       = require('../controllers/StudentControllers')

const { signinSupervisor, signupSupervisor, getSupervisorInfo, changePasswordSupervisor,
       resetPasswordSupervisor, createSupervisorProfile, editSupervisorInfo, 
       checkAllSupervisionRequestsBySupervisor, viewSupervisionRequestWithGroupDetails,
       addCommentToSupervisionRequest, rejectSupervisionRequest, acceptSupervisionRequest
 }
       = require('../controllers/SupervisorControllers')

const { signinCoordinator, signupCoordinator, getCoordinatorInfo, editCoordinatorInfo, verifySingleStudent,
       uploadFile, viewAppliedStudentList, verifyAppliedStudentList, sendEmailController,
       registerEligibleStudents, addSupervisor, removeSupervisor, addPanelMember,
       removePanelMember, viewAllStudents, viewAllGroups, deleteFYPGroup, viewSingleGroupDetails, 
       updateFYPGroupCategory, viewAllSupervisors, viewAllPanelMembers, changePasswordCoordinator,
       resetPasswordCoordinator, removeStudent, viewTemporaryStudentList, addSupervisionSlots,
       groupAdjustmentAt3, groupAdjustmentAt5
}
       = require('../controllers/CoordinatorControllers')

const { signinPanelMember, signupPanelMember, changePasswordPanelMember, resetPasswordPanelMember,
       createPanelMemberProfile, getPanelMemberInfo, editPanelMemberInfo, checkPanelMemberProfileCompletion }
       = require('../controllers/PanelMemberControllers')

const upload = require('../middlewares/upload')

app.post('/signinStudent/:userid', signinStudent)
app.post('/signupStudent', signupStudent)
app.post('/createGroup', createGroup)
app.get('/viewGroupByLeader/:userid', viewGroupByLeader)       //change
app.get('/viewGroupByMember/:userid', viewGroupByMember)       //change
app.post('/deleteGroup', deleteGroup)
app.post('/editGroup', editGroup)
app.post('/inviteStudentToGroup', inviteStudentToGroup)
app.get('/viewGroupInvitesByLeader/:userid', viewGroupInvitesByLeader)       //change
app.get('/viewGroupInvitesByMember/:userid', viewGroupInvitesByMember)        //change
app.post('/acceptGroupInviteByMember', acceptGroupInviteByMember)
app.post('/rejectGroupInviteByMember', rejectGroupInviteByMember)
app.post('/leaveGroupByMember', leaveGroupByMember)
app.post('/searchStudents', searchStudents)
app.get('/getStudentInfo/:userid', getStudentInfo)
app.post('/editStudentInfo/:userid', editStudentInfo)
app.patch('/changePasswordStudent/:userid', changePasswordStudent)
app.patch('/resetPasswordStudent', resetPasswordStudent)
app.post('/createStudentProfile/:userid', createStudentProfile)
app.get('/searchSupervisors/:keyword', searchSupervisors)      //change
app.post('/sendSupervisionRequest', sendSupervisionRequest)
app.get('/getAllSupervisionRequests/:groupid', getAllSupervisionRequests)    //change


app.post('/signupSupervisor', signupSupervisor)
app.post('/signinSupervisor/:userid', signinSupervisor)
app.get('/getSupervisorInfo/:userid', getSupervisorInfo)
app.patch('/changePasswordSupervisor/:userid', changePasswordSupervisor)
app.patch('/resetPasswordSupervisor/:userid', resetPasswordSupervisor)
app.post('/createSupervisorProfile/:userid', createSupervisorProfile)
app.post('/editSupervisorInfo/:userid', editSupervisorInfo)
app.get('/checkAllSupervisionRequestsBySupervisor/:userid', checkAllSupervisionRequestsBySupervisor)
app.get('/viewSupervisionRequestWithGroupDetails', viewSupervisionRequestWithGroupDetails)
app.post('/addCommentToSupervisionRequest', addCommentToSupervisionRequest)
app.post('/rejectSupervisionRequest', rejectSupervisionRequest)
app.post('/acceptSupervisionRequest', acceptSupervisionRequest)


app.post('/signupCoordinator', signupCoordinator)
app.post('/signinCoordinator/:userid', signinCoordinator)
app.post('/editCoordinatorInfo/:userid', editCoordinatorInfo)
app.get('/getCoordinatorInfo/:userid', getCoordinatorInfo)
app.get('/verifySingleStudent/:userid', verifySingleStudent)
app.post('/uploadFile', upload.single('file'), uploadFile)
app.get('/viewAppliedStudentList', viewAppliedStudentList)
app.get('/verifyAppliedStudentList', verifyAppliedStudentList)
app.get('/viewTemporaryStudentList', viewTemporaryStudentList)
app.post('/sendEmail', sendEmailController)
app.post('/registerEligibleStudents', registerEligibleStudents)
app.post('/addSupervisor', addSupervisor)
app.delete('/removeSupervisor/:userid', removeSupervisor)
app.post('/addPanelMember', addPanelMember)
app.delete('/removePanelMember/:userid', removePanelMember)
app.get('/viewAllStudents', viewAllStudents)
app.get('/viewAllGroups', viewAllGroups)
app.get('/viewSingleGroupDetails/:groupid', viewSingleGroupDetails)
app.delete('/deleteFYPGroup/:groupid', deleteFYPGroup)
app.put('/updateFYPGroupCategory/:groupid', updateFYPGroupCategory)
app.get('/viewAllSupervisors', viewAllSupervisors)
app.get('/viewAllPanelMembers', viewAllPanelMembers)
app.patch('/changePasswordCoordinator/:userid', changePasswordCoordinator)
app.patch('/resetPasswordCoordinator', resetPasswordCoordinator)
app.delete('/removeStudent/:userid', removeStudent)
app.post('/addSupervisionSlots', addSupervisionSlots)
app.post('/groupAdjustmentAt3', groupAdjustmentAt3)
app.post('/groupAdjustmentAt5', groupAdjustmentAt5)


app.post('/signupPanelMember', signupPanelMember)
app.post('/signinPanelMember/:userid', signinPanelMember)
app.patch('/changePasswordPanelMember/:userid', changePasswordPanelMember)
app.patch('/resetPasswordPanelMember/:userid', resetPasswordPanelMember)
app.post('/createPanelMemberProfile/:userid', createPanelMemberProfile)
app.get('/getPanelMemberInfo/:userid', getPanelMemberInfo)
app.post('/editPanelMemberInfo/:userid', editPanelMemberInfo)
app.get('/checkPanelMemberProfileCompletion/:userid', checkPanelMemberProfileCompletion)

module.exports = app;  