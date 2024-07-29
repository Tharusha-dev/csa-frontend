import React, { useState, useContext, useEffect } from 'react'
import { useApi } from '../useApi'
import { AuthContext } from '../auth/authContext'
import AdminShipmentCard from '../components/adminShipmentCard'
import '../pages/adminDashboard.css'
import { Shipment } from '../types/types'
import { useNavigate } from 'react-router-dom'
// import ShipmentDetails from '../components/shipmentDetails'
import AdminShipmentDetails from '../components/adminShipmentDetails'
import SearchIcon from '../components/searchIcon'

type Props = {}

export default function AdminDashboard({ }: Props) {


  const [shipments, setShipments] = useState<Shipment[]>([])



  const navigate = useNavigate()


  const [shipmentSearch, setShipmentSearch] = useState("")
  const [searchingResponse, setSearchingResponse] = useState("")
  const [shipingDetails, setShippingDetails] = useState<Shipment | null>(null)
  const [shipingDetailsOpen, setShippingDetailsOpen] = useState(false)

  async function findShipment(trackingCode: string) {
 


    try {
      const sid = parseInt(trackingCode.split("-")[1])

      

      await api.post("/admin/shipping-details", {
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

      

        }else {
          setSearchingResponse("Invalid tracking number or you dont have access")
        }
      })

    } catch (err) {
      console.log(err)
      setSearchingResponse("Invalid tracking number or you dont have access")
    }




  }


  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Error with auth provider');  // could have just done const { accessToken, setAuth } = useContext(AuthContext); but typescript keeps thowing errors
  }
  const { accessToken, privilegeLevel } = context;
  const api = useApi()

  const [selectedStatusOption, setSelectedStatusOption] = useState("Processing")

  useEffect(() => {
    getAllShipments()
  }, [])


  async function getAllShipments() {

    await api.get("/admin/all-shipments",


    ).then((res) => {
      if (res.status === 200) {
       
        setShipments(res.data.shipments)

      }
    }


    ).catch((err) => {
      if (err.response.status === 403) {
        console.log(err)
      }
    })
  }

  return (
    <div className='admin-dashboard'>
      
      <div className="header">

        <div className="search-outer">
          <div className="search">
            <input type="text" className="searchTerm" onChange={(e) => { setShipmentSearch(e.target.value) }} placeholder="Enter tracking code to track an order ..." />
            <button onClick={() => { findShipment(shipmentSearch) }} type="submit" className="searchButton">
              <SearchIcon />
            </button>
          </div>
          <span>{searchingResponse}</span>
        </div>
        <button className="btn" onClick={()=>{navigate("/dashboard")}}>User dashboard</button>
      </div>
      <div className="admin-shipments">
        {


          shipments.length != 0 && accessToken ?

            shipments.map(shipment =>
              <AdminShipmentCard key={shipment.sid} shipment={shipment} accessToken={accessToken} />

            )

            : <></>
        }
      </div>

      {shipingDetails && accessToken && shipingDetailsOpen  ? <AdminShipmentDetails shipment={shipingDetails} closePopUp={setShippingDetailsOpen} accessToken={accessToken}/> : <></>}

    </div>
  )
}