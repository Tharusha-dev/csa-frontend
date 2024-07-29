import React, { useState } from 'react'
import "../components/shipmentDetails.css"
import { Shipment } from '../types/types'
import { useApi } from '../useApi'
import ResponseMessege from './responseMessege'




type Props = {
    shipment: Shipment
    closePopUp: Function
    accessToken: string

}


function prepareTrackingCodeFromSid(sid: number) {
    const sidPadded = sid.toString().padStart(6, "0")
    return `csa-${sidPadded}`
}


export default function AdminShipmentDetails({ shipment, closePopUp, accessToken }: Props) {

    const [selectedStatusOption, setSelectedStatusOption] = useState("Processing")
    const [response, setResponse] = useState("")
    const [showResponse, setShowResponse] = useState(false)
    const api = useApi()

    async function submitChanges(sid: number, status: string, accessToken: any) {

        await api.post("/admin/modify-shipment/", {
            sid: sid,
            status: status
        },
        ).then((res) => {
           
            if (res.status === 200) {
                
                setResponse(res.data.message)
                setShowResponse(true)
            }
        })

            .catch((err) => { console.log(err) })
    }




    return (
        <div className='shipment-details'>
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

            <div className="shipment-details-container">
                <h1 className="heading">
                    Shipment details
                </h1>

                <div className="shipment-card-expanded-detail"><span className='detail-title'>Senders name : </span><span className='detail-description'>{shipment.sender?.fname}</span></div>
                <div className="shipment-card-expanded-detail"><span className='detail-title'>Sender address : </span><span className='detail-description'>{shipment.sender?.address}</span></div>
                <div className="shipment-card-expanded-detail"><span className='detail-title'>Sender email : </span><span className='detail-description'>{shipment.sender?.email}</span></div>
                
                <hr />
                <div className="shipment-card-expanded-detail"><span className='detail-title'>Recipient name : </span><span className='detail-description'>{shipment.recipient_name}</span></div>
                <div className="shipment-card-expanded-detail"><span className='detail-title'>Recipient address : </span><span className='detail-description'>{shipment.recipient_address}</span></div>
                <div className="shipment-card-expanded-detail"><span className='detail-title'>Shipment status :</span><span className='detail-description'>{shipment.status}</span></div>
                <div className="shipment-card-expanded-detail"><span className='detail-title'>Created at : </span><span className='detail-description'>{shipment.createdAt}</span></div>
                <div className="shipment-card-expanded-detail"><span className='detail-title'>Last updated : </span><span className='detail-description'>{shipment.updatedAt}</span></div>
                <div className="shipment-card-expanded-detail"><span className='detail-title'>Tracking number : </span><span className='detail-description'>{prepareTrackingCodeFromSid(shipment.sid)}</span></div>

                <hr />
                <div className="admin-details-status-section">
                    <select onChange={(e) => { setSelectedStatusOption(e.target.value) }} defaultValue={shipment.status}>
                        <option value="Processing" onChange={() => { }}>Processing</option>
                        <option value="Delivering" onChange={() => { }}>Delivering</option>
                        <option value="Delivered" onChange={() => { }}>Delivered</option>
                        <option value="Pending" onChange={() => { }}>Pending</option>

                    </select>
                    <button onClick={() => { submitChanges(shipment.sid, selectedStatusOption, accessToken) }}>
                        submit
                    </button>

                {showResponse ? <ResponseMessege message={response} /> : <></>}

                </div>
            </div>
        </div>
    )
}

