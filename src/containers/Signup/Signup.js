import React from 'react'
import {useHistory,useLocation} from "react-router-dom";

export default function Signup() {
  const history = useHistory();
  const loacation = useLocation();

  const handleClick = () => {
    history.push('/password_expired')
  }

  return (
    <div>
      <button onClick={handleClick}>dianji</button>
    </div>
  )
}
