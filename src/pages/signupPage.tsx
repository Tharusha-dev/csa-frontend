import React, { useState } from 'react'
import bcrypt from 'bcryptjs'
// import api from '../axios'
import { useApi } from '../useApi'

import "../pages/signupPage.css"
import { useNavigate } from 'react-router-dom'

export default function SignupPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [addrs, setAddrs] = useState("")


    const [response, setResponse] = useState("")
    const navigate = useNavigate()
    const api = useApi()



    async function submitDetails(firstName: string, lastName: string, email: string, password: string, address:string) {



        await api.post("/signup", {
            "firstName": firstName,
            "lastName": lastName,
            "username": email,
            "password": password,
            "address":address
        }).then((res) => {
            setResponse(res.data)

            if (res.status === 200) {
                navigate("/login")
            }

        })
    }



    return (
        <div className="signup-page">
            <div className="signup-container">
                <h1 className="heading">
                    Sign Up
                </h1>
                <span className="field-name">First Name : </span>
                <input onChange={(e) => {
                    setFname(e.target.value)
                }} type="text" name="" id="" className="field-input" />

                <span className="field-name">Last Name : </span>
                <input onChange={(e) => {
                    setLname(e.target.value)
                }} type="text" name="" id="" className="field-input" />
                <span className="field-name">Address : </span>
                <input onChange={(e) => {
                    setAddrs(e.target.value)
                }} type="text" name="" id="" className="field-input" />

                <span className="field-name">Email (username): </span>
                <input onChange={(e) => {
                    setEmail(e.target.value)
                }} type="text" name="" id="" className="field-input" />
                <span className="field-name">Password : </span>
                <input onChange={(e) => {
                    setPassword(e.target.value)
                }} type="password" name="" id="" className="field-input" />

                <button onClick={(e) => {
                    submitDetails(fname, lname, email, password,addrs)
                }} className="submit-button">

                </button>
            </div>

            {response != "" ? <span>{response}</span> : ""}

        </div>


    )
}
