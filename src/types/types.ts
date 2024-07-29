

export type User = {
    uid :number
  email:string,
  fname: string,
  lname :String,
  address: string
  password:string
  privilegeLevel:number
  refreshToken:string

}

export type Shipment = {
    recipient_name: string,
    recipient_address: string,
    status: string,
    createdAt: string,
    updatedAt: string,
    sender?: User
    sid: number
  }
  