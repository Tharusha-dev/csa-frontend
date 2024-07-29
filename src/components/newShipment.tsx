import React, { useState } from 'react'
import "../components/newShipment.css"
import { useApi } from '../useApi'


type Props = {
    accessToken: string
    closePopUp: Function
}

export default function NewShipment({ accessToken: accesToken, closePopUp }: Props) {

    const [resName, setResName] = useState("")
    const [resAddr, setResAddr] = useState("")
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState("")

    const api = useApi()

    async function submitDetails(resName: string, resAddr: string) {
        setLoading(true)
        console.log(accesToken)



        await api.post("/new-shipment", {

            "recipient_name": resName,
            "recipient_address": resAddr,
        }, 



        ).then((res) => {
            setLoading(false)
            if (res.status === 200) {

                setResponse(res.data.message)
                console.log(res)

            }
        }


        )
    }

    return (
        <div className='new-shipment'>
            <button
                onClick={() => { closePopUp(false) }}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: '#666',
                    transition: 'color 0.3s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#000'}
                onMouseOut={(e) => e.currentTarget.style.color = '#666'}
            >
                &#x2715;
            </button>

            <div className="new-shipment-container">
                <h1 className="heading">
                    Add new courier
                </h1>
                <span className="field-name">Rec Name : </span>
                <input onChange={(e) => {
                    setResName(e.target.value)
                }} type="text" name="" id="" className="field-input" />

                <span className="field-name">Res addr : </span>
                <input onChange={(e) => {
                    setResAddr(e.target.value)
                }} type="text" name="" id="" className="field-input" />

                <button onClick={(e) => {
                    submitDetails(resName, resAddr)
                }} className="submit-button">
                    Submit
                </button>
                {loading ?
                    <div className="loader"></div> : <></>

                }

                {response != "" ? <span className='response'>{response}</span> : <></>}

            </div>
        </div>
    )
}

