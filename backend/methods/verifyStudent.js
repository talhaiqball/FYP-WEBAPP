function isStudentEligibleForCapstone(student) {
    // console.log(student)
    // Check if CGPA is less than 2.0
    if (student.CGPA < 2.0) {
      return false;
    }
  
    
    const failingGrades = ['U', 'W', 'F']; 
    const databaseSystemsCourse = Object.keys(student.courses).find(course => course === "Database Systems" );
    const databaseSystemsLabCourse = Object.keys(student.courses).find(course => course === "Database Systems - Lab");
    if (!databaseSystemsCourse || !databaseSystemsLabCourse || failingGrades.includes(student.courses[databaseSystemsCourse]) || failingGrades.includes(student.courses[databaseSystemsLabCourse])) {
    return false;
    }


    // Check if student has passed "Software Engineering" or "Object Oriented Analysis and Design"
    const softwareEngineeringCourse = Object.keys(student.courses).find(course => course === "Software Engineering");
    const objectOrientedAnalysisAndDesignCourse = Object.keys(student.courses).find(course => course === "Object Oriented Analysis and Design");
    const objectOrientedAnalysisAndDesignCourseLab = Object.keys(student.courses).find(course => course === "Object Oriented Analysis and Design - Lab");
 
    const passSE = softwareEngineeringCourse != null && !(failingGrades.includes(student.courses[softwareEngineeringCourse]))
    // console.log("SE:", passSE)

    const passOOAD = objectOrientedAnalysisAndDesignCourse != null && !(failingGrades.includes(student.courses[objectOrientedAnalysisAndDesignCourse]))
    // console.log("OOAD:", passOOAD)

    const passOOADL = objectOrientedAnalysisAndDesignCourseLab != null && !(failingGrades.includes(student.courses[objectOrientedAnalysisAndDesignCourseLab]))
    // console.log("OOAD LAb:", passOOADL)

    if(!(passSE || (passOOAD && passOOADL))){
        return false
    }
    
    // Check if student has more than 90 totalCH
    if (student.totalCH >= 90) {
      // console.log('if 1')
      return true;
    }
  
    // Check if student has 89 totalCH and CGPA is greater than 3.0
    if (student.totalCH == 89 && student.CGPA >= 3.0) {
      // console.log("CH = ",student.totalCH)
      return true;
    }

    // Check if student has 88 totalCH and CGPA is greater than 3.3
    if (student.totalCH == 88 && student.CGPA >= 3.3) {
      // console.log('if 3')
      return true;
    }
  
    return false;
}

const student = {
  userid: 201400135,
  name: "Hussain Amin Manj",
  totalCH: 72,
  CGPA: 2.9,
  courses: {
      "Introduction to Programming": 'A',
      "Introduction to Programming - Lab": 'B',
      "Introduction to Information and Communication Technology": 'A-',
      "Introduction to Information and Communication Technology - Lab": 'A-',
      "Composition I": 'A',
      "Calculus - I": 'B+',
      "Applied Physics": 'A-',
      "Discrete Mathematics": 'A-',
      "Object Oriented Programming": 'A',
      "Object Oriented Programming - Lab": 'A-',
      "Software Engineering": 'A',
      "Interpersonal Communication Skills": 'A',
      "Modern Physics": 'B+',
      "Islamic Studies": 'A',
      "Data Structure & Algorithms": 'A+',
      "Data Structure & Algorithms - Lab": 'A+',
      "Software Requirement Engineering": 'B+',
      "Human Computer Interaction": 'B',
      "Linear Algebra": 'A-',
      "Database Systems": 'A',
      "Database Systems - Lab": 'A',
      "Operating Systems": 'B',
      "Operating Systems - Lab": 'A',
      "Software Design & Architecture": 'A',
      "Software Design & Architecture": 'A',
      "Probability & Statistics": 'A',
      "Social Integration Program": 'B+',
      "Data Communication & Computer Networks": 'A',
      "Data Communication & Computer Networks - Lab": 'B',
      "Operations Research": 'B',
      "Business Process Engineering": 'A-',
      "Object Oriented Analysis and Design": 'A',
      "Object Oriented Analysis and Design - Lab": 'A',
      "Technical Writing": 'A',
      "Mobile Computing": 'A-',
      "Web Engineering": 'A-',
      "Information Security": 'A-',
      "Formal Methods in Software Engineering": 'B',
      "Software Quality Engineering": 'A-',
      "Professional Practices": 'A-'   
  }
}

// console.log(isStudentEligibleForCapstone(student))

module.exports=isStudentEligibleForCapstone;


