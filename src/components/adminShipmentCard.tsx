import React, { useState } from 'react'
import '../components/shipmentCard.css'
import { useApi } from '../useApi'
import '../components/adminShipmentCard.css'
import ResponseMessege from './responseMessege'
import { Shipment } from '../types/types'


// type Shipment = {
//     recipient_name: string,
//     recipient_address: string,
//     status: string,
//     createdAt: string,
//     updatedAt: string,
//     sid: number
// }

type Props = {
    shipment: Shipment,
    accessToken: string
}





export default function AdminShipmentCard({ shipment, accessToken }: Props) {
    const api = useApi()

    const [selectedStatusOption, setSelectedStatusOption] = useState("Processing")
    const [isExpanded, setIsExpanded] = useState(false)
    const [response, setResponse] = useState("")
    const [showResponse, setShowResponse] = useState(false)

    function prepareTrackingCodeFromSid(sid: number) {
        const sidPadded = sid.toString().padStart(6, "0")
        return `csa-${sidPadded}`
      }
      

    async function submitChanges(sid: number, status: string, accessToken: any) {

        await api.post("/admin/modify-shipment/", {
            sid: sid,
            status: status
        },
        ).then((res) => {
            console.log(res)
            if (res.status === 200) {
                console.log("done")
                setResponse(res.data.message)
                setShowResponse(true)
            }
        })

            .catch((err) => { console.log(err) })
    }
    return (
        <div className="admin-shipment-card" onClick={() => { setIsExpanded(!isExpanded) }}>
            <div className="admin-top">
                <h2 className="rec-name">To : {shipment.recipient_name}</h2>
                <div className="admin-status-section">
                    <select onChange={(e) => { setSelectedStatusOption(e.target.value) }} defaultValue={shipment.status}>
                        <option value="Processing" onChange={() => { }}>Processing</option>
                        <option value="Delivering" onChange={() => { }}>Delivering</option>
                        <option value="Delivered" onChange={() => { }}>Delivered</option>
                        <option value="Pending" onChange={() => { }}>Pending</option>

                    </select>
                    <button onClick={() => { submitChanges(shipment.sid, selectedStatusOption, accessToken) }}>
                        submit
                    </button>
                </div>
            
            </div>
            <div className="admin-bottom">
                <span className='admin-addr'>{shipment.recipient_address}</span>
                {showResponse ? <ResponseMessege message={response} /> : <></>}
            </div>

            <h2>From : {shipment.sender?.fname}</h2>
            <div className="admin-addr-sid">
            <span className='admin-addr'>{shipment.sender?.address}</span>
            <span>{prepareTrackingCodeFromSid(shipment.sid)}</span>
            </div>
            {isExpanded ? <div className='admin-shipment-card-expanded'>
                <hr />

                <div className="admin-shipment-card-expanded-detail"><span className='admin-detail-title'>Recipient name : </span><span className='admin-detail-description'>{shipment.recipient_name}</span></div>
                <div className="admin-shipment-card-expanded-detail"><span className='admin-detail-title'>Recipient address : </span><span className='admin-detail-description'>{shipment.recipient_address}</span></div>
                <div className="admin-shipment-card-expanded-detail"><span className='admin-detail-title'>Created at : </span><span className='admin-detail-description'>{shipment.createdAt}</span></div>
                <div className="admin-shipment-card-expanded-detail"><span className='admin-detail-title'>Last updated : </span><span className='admin-detail-description'>{shipment.updatedAt}</span></div>

            </div> : <></>}
        </div>
    )
}