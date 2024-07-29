import React, { useState } from 'react'
import { useApi } from '../useApi'

import "../pages/loginPage.css"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../auth/authContext'
import { useContext } from 'react';


export default function LoginPage() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Error with auth provider');  // could have just done const { accessToken, setAuth } = useContext(AuthContext); but typescript keeps thowing errors
  }
  const {  setAuth } = context;


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [response,setResponse] = useState("")

  const navigate = useNavigate()
  const api = useApi()

  async function submitDetails(email: string, password: string) {



    await api.post("/login", {
      "username": email,
      "password": password
    },

   
    ).then((res) => {
      if (res.status === 200) {
        let accessToken:string  = res.data.accessToken
        let privilegeLevel:number = res.data.privilegeLevel
        console.log(privilegeLevel)
        setAuth({accessToken,privilegeLevel})

        navigate("/dashboard")
        console.log(res.data.accessToken)
        console.log(accessToken)

      }
    }).catch((err)=>{
      setResponse(err.response.data)
    })
  }



  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="heading">
          Log In
        </h1>
        <span className="field-name">Email : </span>
        <input onChange={(e) => {
          setEmail(e.target.value)
        }} type="text" name="" id="" className="field-input" />
        <hr />
        <span className="field-name">Password : </span>
        <input onChange={(e) => {
          setPassword(e.target.value)
        }} type="password" name="" id="" className="field-input" />

        <button onClick={(e) => {
          submitDetails(email, password)
        }} className="login-submit-button">
          Sign In
        </button>
      </div>

      {response}

    </div>
  )
}
