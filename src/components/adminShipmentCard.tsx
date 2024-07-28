import React, { useState } from 'react'
import '../components/shipmentCard.css'
import { useApi } from '../useApi'
import '../components/adminShipmentCard.css'


type Shipment = {
    recipient_name: string,
    recipient_address: string,
    status: string,
    createdAt: string,
    updatedAt: string,
    sid: number
}

type Props = {
    shipment: Shipment,
    accessToken: string
}

function statusBtnStyle(status: string): string[] {
    switch (status) {
        case "Pending":
            return ["#848484", "#000"]
        case "Processing":
            return ["#848484", "#fff"]
        case "Delivering":
            return ["#fff45e", "#fff"]
        case "Delivered":
            return ["#5ccc00", "#fff"]
        default:
            return ["", ""]
    }
}



export default function AdminShipmentCard({ shipment, accessToken }: Props) {
    const api = useApi()

    const [selectedStatusOption, setSelectedStatusOption] = useState("Processing")
    const [isExpanded, setIsExpanded] = useState(false)
    async function submitChanges(sid: number, status: string, accessToken: any) {

        await api.post("/admin/modify-shipment/", {
            sid: sid,
            status: status
        },
            {
                headers: {
                    Authorization: "Bearer " + accessToken?.accessToken
                }
            })
    }
    return (
        <div className="shipment-card" onClick={() => { setIsExpanded(!isExpanded) }}>
            <div className="top">
                <h2 className="rec-name">{shipment.recipient_name}</h2>
                <div className="status-section">
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
            <div className="bottom">
                <span className='rec-addr'>{shipment.recipient_address}</span>
            </div>
            {isExpanded ? <div className='shipment-card-expanded'>
                <hr />

                <div className="shipment-card-expanded-detail"><span className='detail-title'>Recipient name : </span><span className='detail-description'>{shipment.recipient_name}</span></div>
                <div className="shipment-card-expanded-detail"><span className='detail-title'>Recipient address : </span><span className='detail-description'>{shipment.recipient_address}</span></div>
                <div className="shipment-card-expanded-detail"><span className='detail-title'>Created at : </span><span className='detail-description'>{shipment.createdAt}</span></div>
                <div className="shipment-card-expanded-detail"><span className='detail-title'>Last updated : </span><span className='detail-description'>{shipment.updatedAt}</span></div>

            </div> : <></>}
        </div>
    )
}