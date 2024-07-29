import React, { useState } from 'react'
import '../components/shipmentCard.css'

type Shipment = {
  recipient_name: string,
  recipient_address: string,
  status: string,
  createdAt: string,
  updatedAt: string,
  sid: number
}

type Props = {
  shipment: Shipment
}

function statusBtnStyle(status: string): string[] {
  switch (status) {
    case "Pending":
      return ["#848484", "#000"]
    case "Processing":
      return ["#848484", "#fff"]
    case "Delivering":
      return ["#fff45e", "#686865"]
    case "Delivered":
      return ["#5ccc00", "#fff"]
    default:
      return ["", ""]
  }
}

function prepareTrackingCodeFromSid(sid: number) {
  const sidPadded = sid.toString().padStart(6, "0")
  return `csa-${sidPadded}`
}

export default function ShipmentCard({ shipment }: Props) {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <div className="shipment-card" onClick={() => { setIsExpanded(!isExpanded) }}>
      <div className="top">
        <h2 className="rec-name">{shipment.recipient_name}</h2>
        <span className='status' style={{ backgroundColor: statusBtnStyle(shipment.status)[0], color: statusBtnStyle(shipment.status)[1] }}>{shipment.status}</span>
      </div>
      <div className="bottom">
        <span className='rec-addr'>{prepareTrackingCodeFromSid(shipment.sid)}</span>
      </div>
      {isExpanded ? <div className='shipment-card-expanded'>
        <hr />

        <div className="shipment-card-expanded-detail"><span className='detail-title'>Recipient name : </span><span className='detail-description'>{shipment.recipient_name}</span></div>
        <div className="shipment-card-expanded-detail"><span className='detail-title'>Recipient address : </span><span className='detail-description'>{shipment.recipient_address}</span></div>
        <div className="shipment-card-expanded-detail"><span className='detail-title'>Shipment status :</span><span className='detail-description'>{shipment.status}</span></div>
        <div className="shipment-card-expanded-detail"><span className='detail-title'>Created at : </span><span className='detail-description'>{shipment.createdAt}</span></div>
        <div className="shipment-card-expanded-detail"><span className='detail-title'>Last updated : </span><span className='detail-description'>{shipment.updatedAt}</span></div>
        <div className="shipment-card-expanded-detail"><span className='detail-title'>Tracking number : </span><span className='detail-description'>{prepareTrackingCodeFromSid(shipment.sid)}</span></div>

      </div> : <></>}
    </div>
  )
}