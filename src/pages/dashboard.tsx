import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { useApi } from '../useApi'
import { AuthContext } from '../auth/authContext'
import NewShipment from '../components/newShipment'
import { useNavigate } from 'react-router-dom'
import ShipmentCard from '../components/shipmentCard'

import '../pages/dashboard.css'

type Props = {}

export default function Dashboard({ }: Props) {
    //@ts-ignore
    const { accessToken, setAccessToken } = useContext(AuthContext)
    //@ts-ignore
    const [shipments, setShipments]: any = useState([])

    const [isNewShipmentOpen, setIsNewShipmentOpen] = useState(false)

    const [responseGot, setResponseGot] = useState(false)

    const [shipmentSearch, setShipmentSearch] = useState("")


    const api = useApi()
    const navigate = useNavigate()

    async function getAllShipments() {
        console.log(accessToken)
        await api.get("/all-shipments",
            {
                headers: {
                    Authorization: "Bearer " + accessToken?.accessToken
                }
            }

        ).then((res) => {
            if (res.status === 200) {
                //@ts-ignore
                setShipments(res.data.shipments)
                console.log(accessToken)
                setResponseGot(true)
            }
        }


        ).catch((err) => {
            if (err.response.status === 403) {
                navigate("/login")
            }
        })
    }

    async function findShipment(trackingCode: string) {
        const sid = parseInt(trackingCode.split("-")[1])

        console.log(sid)





        try {
            await api.post("/shipping-details", {
                "sid": sid
            },

                {
                    headers: {
                        Authorization: "Bearer " + accessToken?.accessToken
                    }
                }
            ).then((res) => {
                if (res.status === 200) {
                    console.log(res)

                }
            })

        } catch (err) {
            console.log(err)
        }




    }

    async function logOut() {
        await api.post("/logout")
        setAccessToken(null)
        navigate("/login")

    }

    useEffect(() => {
        getAllShipments()
    }, [])

    return (
        <div className="dashboard">
            <div className="header">
              
                <div className="search">
                    <input type="text" className="searchTerm" onChange={(e) => { setShipmentSearch(e.target.value) }} placeholder="Enter tracking code to track your order ..." />
                    <button onClick={() => { console.log("test"); findShipment(shipmentSearch) }} type="submit" className="searchButton">
                        <i className="fa fa-search"></i>
                    </button>
                </div>

                <div className="header-btns">
                    <button className='btn' onClick={() => {
                        setIsNewShipmentOpen(!isNewShipmentOpen)
                    }}>New Shipment</button>

                    {responseGot && accessToken.privilegeLevel > 0 ? <button className='btn' onClick={() => { navigate("/admin-panel") }}>Admin panel</button> : <></>}

                </div>



            </div>
            <div className='shipments-title'>
                <h1>Shipments</h1>

            </div>

            <div className="shipments">
                {

                    //@ts-ignore
                    shipments.length != 0 ?
                        //@ts-ignore

                        shipments.map(shipment =>
                            <ShipmentCard shipment={shipment} key={shipment.sid} />
                        )

                        : <></>
                }

            </div>




            {isNewShipmentOpen ? <NewShipment accessToken={accessToken.accessToken} getAllShipment={getAllShipments} closePopUp={setIsNewShipmentOpen} /> : <></>}



            <button className="logout" onClick={() => {
                logOut()
            }}>
                Logout
            </button>






        </div>

    )
}