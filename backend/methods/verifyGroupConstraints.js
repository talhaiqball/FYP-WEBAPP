const verifyGroupConstraints = (groupProgram, oldMemberProgramsFullForm, newMemberProgramFullForm) => {

    let oldMemberPrograms = []
    for (let i = 0 ; i<oldMemberProgramsFullForm.length; i++){
        if (oldMemberProgramsFullForm.includes('Software')) {
            oldMemberPrograms.push( 'BS - SE');
        } else if (oldMemberProgramsFullForm.includes('Data')) {
            oldMemberPrograms.push( 'BS - DS');
        } else if (oldMemberProgramsFullForm.includes('Computer')) {
            oldMemberPrograms.push( 'BS - CS');
        }
    }

    let newMemberProgram = ""
    if (newMemberProgramFullForm.includes('Software')) {
        newMemberProgram = 'BS - SE';
    } else if (newMemberProgramFullForm.includes('Data')) {
        newMemberProgram = 'BS - DS';
    } else if (newMemberProgramFullForm.includes('Computer')) {
        newMemberProgram = 'BS - CS';
    }

    console.log(groupProgram, newMemberProgram, oldMemberPrograms)


    if(oldMemberPrograms.length >= 4){
        return false
    }
    if(groupProgram == "BS - DS"){
        if(newMemberProgram != "BS - DS")
            return false
    }

    if(groupProgram == "BS - SE"){
        if(newMemberProgram != "BS - SE")
            return false
    }

    if(groupProgram == "BS - CS"){
        if(newMemberProgram != "BS - CS")
            return false
    }

    if(groupProgram == "BS - SE/CS"){
        let count = 0
        for(let i=0; i<oldMemberPrograms.length; i++){
            if(newMemberProgram == oldMemberPrograms[i]){
                count++;
            }
        }
        if(count>=2){
            return false
        }
    }

    return true
}

// console.log(verifyGroupConstraints("BS - SE/CS", ["BS - SE", "BS - CS", "BS - CS"], "BS - SE"))

module.exports = verifyGroupConstraints