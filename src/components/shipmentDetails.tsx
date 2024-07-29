import React, { useState } from 'react'
import "../components/shipmentDetails.css"
import { Shipment } from '../types/types'




type Props = {
    shipment: Shipment
    closePopUp: Function
}


function prepareTrackingCodeFromSid(sid: number) {
    const sidPadded = sid.toString().padStart(6, "0")
    return `csa-${sidPadded}`
}


export default function ShipmentDetails({ shipment, closePopUp }: Props) {



    return (
        <div className='shipment-details'>
            <button
                onClick={() => { console.log("test");closePopUp(false) }}
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


                <div className="shipment-card-expanded-detail"><span className='detail-title'>Recipient name : </span><span className='detail-description'>{shipment.recipient_name}</span></div>
                <div className="shipment-card-expanded-detail"><span className='detail-title'>Recipient address : </span><span className='detail-description'>{shipment.recipient_address}</span></div>
                <div className="shipment-card-expanded-detail"><span className='detail-title'>Shipment status :</span><span className='detail-description'>{shipment.status}</span></div>
                <div className="shipment-card-expanded-detail"><span className='detail-title'>Created at : </span><span className='detail-description'>{shipment.createdAt}</span></div>
                <div className="shipment-card-expanded-detail"><span className='detail-title'>Last updated : </span><span className='detail-description'>{shipment.updatedAt}</span></div>
                <div className="shipment-card-expanded-detail"><span className='detail-title'>Tracking number : </span><span className='detail-description'>{prepareTrackingCodeFromSid(shipment.sid)}</span></div>


            </div>
        </div>
    )
}

