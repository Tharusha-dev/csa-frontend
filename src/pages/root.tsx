import React, { useEffect, useContext } from 'react'
import { useApi } from '../useApi'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../auth/authContext'


type Props = {}

export default function Root({ }: Props) {
    

    const api = useApi()
    const navigate = useNavigate()

    useEffect(() => {

        async function verifyUser() {
            await api.post("/verify", {},
                {
                  
                }

            ).then((res) => {


                if (res.status === 200) {
                    navigate("/dashboard")
                }
            }).catch((err) => {
                if (err.response.status === 403) {
                    navigate("/login")
                }
            })

        }

        verifyUser()


    }, [])



    return (
        <div></div>
    )
}