import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { useApi } from '../useApi'
import { AuthContext } from '../auth/authContext'
import NewShipment from '../components/newShipment'
import { useNavigate } from 'react-router-dom'
import ShipmentCard from '../components/shipmentCard'
import ShipmentDetails from '../components/shipmentDetails'
import { Shipment } from '../types/types'

import '../pages/dashboard.css'

import SearchIcon from '../components/searchIcon'

type Props = {}

export default function Dashboard({ }: Props) {

    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('Error with auth provider');  // could have just done const { accessToken, setAuth } = useContext(AuthContext); but typescript keeps thowing errors
    }
    const { accessToken, privilegeLevel } = context;

    const [shipments, setShipments] = useState<Shipment[]>([])

    const [isNewShipmentOpen, setIsNewShipmentOpen] = useState(false)

    const [responseGot, setResponseGot] = useState(false)


    const [shipmentSearch, setShipmentSearch] = useState("")


    const [searchingResponse, setSearchingResponse] = useState("")
    const [shipingDetails, setShippingDetails] = useState<Shipment | null>(null)
    const [shipingDetailsOpen, setShippingDetailsOpen] = useState(false)



    const api = useApi()
    const navigate = useNavigate()

    async function getAllShipments() {

        await api.get("/all-shipments",
            {

            }

        ).then((res) => {
            if (res.status === 200) {

                setShipments(res.data.shipments)
            
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







        try {
            await api.post("/shipping-details", {
                "sid": sid
            },


            ).then((res) => {

                if (res.status === 200) {
                    if (res.data.shipment === null) {
                        setSearchingResponse("No tracking data avaiable")
                    } else {
                        setShippingDetails(res.data.shipment)
                        setShippingDetailsOpen(true)
                    }
                   

                }

                setResponseGot(true)
            })

        } catch (err) {
            console.log(err)
            setSearchingResponse("Invalid tracking number or you dont have access")
          
        }




    }



    useEffect(() => {
        getAllShipments()
    }, [])

    return (
        <div className="dashboard">
            <div className="header">

                <div className="search-outer">
                    <div className="search">
                        <input type="text" className="searchTerm" onChange={(e) => { setShipmentSearch(e.target.value) }} placeholder="Enter tracking code to track your order ..." />
                        <button onClick={() => { findShipment(shipmentSearch) }} type="submit" className="searchButton">
                            <SearchIcon />

                        </button>
                    </div>
                    {searchingResponse}
                </div>



                <div className="header-btns">
                    <button className='btn' onClick={() => {
                        setIsNewShipmentOpen(!isNewShipmentOpen)
                    }}>New Shipment</button>

                    <button className='btn' onClick={() => { navigate("/profile") }}>Edit profile</button>
                    {responseGot && privilegeLevel && privilegeLevel > 0 ? <button className='btn' onClick={() => { navigate("/admin-panel") }}>Admin panel</button> : <></>}

                </div>



            </div>
            <div className='shipments-title'>
                <h1>Shipments</h1>

            </div>

            <div className="shipments">
                {


                    shipments.length != 0 ?


                        shipments.map(shipment =>
                            <ShipmentCard shipment={shipment} key={shipment.sid} />
                        )

                        : <></>
                }

            </div>




            {accessToken && isNewShipmentOpen ? <NewShipment accessToken={accessToken} closePopUp={setIsNewShipmentOpen} /> : <></>}
            {shipingDetails && accessToken && shipingDetailsOpen ? <ShipmentDetails shipment={shipingDetails} closePopUp={setShippingDetailsOpen} /> : <></>}









        </div>

    )
}