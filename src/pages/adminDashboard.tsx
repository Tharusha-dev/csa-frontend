import React, { useState, useContext, useEffect } from 'react'
import { useApi } from '../useApi'
import { AuthContext } from '../auth/authContext'
import AdminShipmentCard from '../components/adminShipmentCard'
import '../pages/adminDashboard.css'


type Props = {}

export default function AdminDashboard({}: Props) {
    
    //@ts-ignore
    const [shipments,setShipments]:ReactNode = useState([])
    //@ts-ignore
    
    const { accessToken, setAccessToken } = useContext(AuthContext)
    const api = useApi()

    const [selectedStatusOption,setSelectedStatusOption] = useState("Processing")

    useEffect(()=>{
        getAllShipments()
    },[])

    async function submitChanges(sid:number,status:string){
        await api.post("/admin/modify-shipment/",{
            sid:sid,
            status:status
        },
        {
            headers: {
              Authorization: "Bearer " + accessToken?.accessToken
            }
          })
    }

    async function getAllShipments(){
        console.log(accessToken)
        await api.get("/admin/all-shipments",
            {
                headers: {
                  Authorization: "Bearer " + accessToken?.accessToken
                }
              }

        ).then((res)=>{
          if(res.status === 200){
            //@ts-ignore
            setShipments(res.data.shipments)
            
          }
        }
    
    
    ).catch((err)=>{
        if(err.response.status === 403) {
          console.log(err)
        }
    })
    }
    
  return (
    <div className='dashboard'>
      <div className="shipments">
      {
        
        //@ts-ignore
        shipments.length != 0 ?
        //@ts-ignore
        shipments.map(shipment => 
          <AdminShipmentCard  key={shipment.sid} shipment={shipment} accessToken={accessToken}/>
             
            )
            
        : <></>
        }
      </div>

 
    </div>
  )
}