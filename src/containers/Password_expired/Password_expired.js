import React from 'react'
import {useHistory,useLocation} from "react-router-dom";

export default function PasswordExpired() {
  const history = useHistory();
  const loacation = useLocation();

  const handleClick = () => {
    history.push('/not-found')
  }

  return (
    <div>
      <button onClick={handleClick}>dianji</button>
    </div>
  )
}
