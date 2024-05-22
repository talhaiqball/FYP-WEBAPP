import React, { useEffect, useState } from 'react'
import axios from 'axios'

const PracAPI = () => {

    const url = "http://localhost:3000/"
    const [email, setemail] = useState()
    const [password, setPassword] = useState()

    const getstudentinfo = async(userid) =>{
        const result = await axios(`http://localhost:3001/getStudentInfo/${userid}`)
        console.log("result is ", result.data )
        const {email ,name, password} = result.data
        console.log(email, password, name)
        setemail(email)
        setPassword(password)
    }

    useEffect(() =>{
        getstudentinfo(201400146)
    }, [])

  return (
    <div>
      <h1>{email}</h1>
      <h2>{password}</h2>
    </div>
  )
}

export default PracAPI;
