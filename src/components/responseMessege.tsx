import React, { useEffect, useState } from 'react'

type Props = {
    message : string,
  
}

export default function ResponseMessege({message}: Props) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2500);

      

    //   close(false)
  
      return ()=> {clearTimeout(timer)} ;
    }, []);
  
    if (!visible) return null;
  
    return <span style={{color:'gray'}}>{message}</span>;
}