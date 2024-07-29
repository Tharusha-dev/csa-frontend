import React, { useContext, useEffect, useState } from 'react'
import { useApi } from '../useApi'
import { AuthContext } from '../auth/authContext'
import { useNavigate } from 'react-router-dom'
import ProfileImage from '../components/profileImage'
import ResponseMessege from '../components/responseMessege'
import '../pages/profilePage.css'
type Props = {}


type User = {
  address: string,
  email: string,
  fname: string,
  lname: string,
  password: string,
  privilegeLevel: number
  refreshToken: string,
  uid: number
}

export default function ProfilePage({ }: Props) {

  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Error with auth provider');  // could have just done const { accessToken, setAuth } = useContext(AuthContext); but typescript keeps thowing errors
  }
  const {  setAuth } = context;

  const navigate = useNavigate()

  const api = useApi()

  const [profileInfo, setProfileInfo] = useState<User | null>()

  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState("")
  const [showResponse, setShowResponse] = useState(false)

  const [addrEditBlocked, setAddrEditBlocked] = useState(true)

  const [newAddress,setNewAddress] = useState("")

  async function logOut() {
    await api.post("/logout")
    setAuth(
        {accessToken:null,privilegeLevel:null}
    )
    navigate("/login")

}


  async function getUserInfo() {
    try {
      await api.post("/profile-info").then((res) => {
        if (res.status === 200) {
         
          setLoading(false)
          setProfileInfo(res.data.userInfo)
        }
      })
    } catch (err) {

      console.log(err)
    }
  }

  async function submitChanges(addr:string){
    try {
      api.post("/change-address",{
        "address" : addr
      }).then((res)=>{
        if(res.status === 200){
          setResponse(res.data.message)
          setShowResponse(true)
        }
      })
    }catch(err){
      console.log(err)
      setResponse("Error")
      setShowResponse(true)


    }

  }

  useEffect(() => {
    getUserInfo()

  }, [])
  return (
    <div>

    {
      loading ?
      <div className="loader"></div>
      :
      <></>
    }


      {!loading && profileInfo?
        <div className='profile-info'>
        <ProfileImage fname={profileInfo.fname} lname={profileInfo.lname}/>
          <div className="profile-detail">
            <div className="profile-detail-title">First name</div>
            <div className="profile-detail-description">{profileInfo.fname}</div>

          </div>
          <div className="profile-detail">
            <div className="profile-detail-title">Last name</div>
            <div className="profile-detail-description">{profileInfo.lname}</div>
          </div>
          <div className="profile-detail">
            <div className="profile-detail-title">Email</div>
            <div className="profile-detail-description">{profileInfo.email}</div>
          </div>
          <div className="profile-detail">
            <div className="profile-detail-title">Address</div>
            <textarea onChange={(e)=>{setNewAddress(e.target.value)}} disabled={addrEditBlocked} defaultValue={profileInfo.address}  className="profile-detail-input"></textarea>
            <br />

            {
              addrEditBlocked ? <span onClick={()=>{setAddrEditBlocked(false)}}>Edit address</span>: 
              <span onClick={()=>{
                setAddrEditBlocked(true)
                submitChanges(newAddress)
              }}>Submit</span>
            }
<br />
            {showResponse ?  <ResponseMessege message={response} /> : <></>}
           <br />

            <button className='logout-btn' onClick={()=>{logOut()}}>Log out</button>
            
          </div>
          
          
          </div> : <></>}
    </div>
  )
}