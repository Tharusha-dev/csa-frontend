import React from 'react'
import '../components/profilePicture.css'

type Props = {
    fname:string,
    lname:string
}

export default function ProfileImage({fname,lname}: Props) {
    
      const firstNameInitial = fname ? fname[0] : "";
      const lastNameInitial = lname ? lname[0] : "";
    
      return (
        <span className="user-profile-image">
          {firstNameInitial}
          {lastNameInitial}
        </span>
      );
}