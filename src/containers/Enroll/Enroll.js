import React from 'react'
import {useHistory,useLocation} from "react-router-dom";

export default function Enroll() {
  const history = useHistory();
  const loacation = useLocation();

  const handleClick = () => {
    history.push('/login')
  }

  return (
    <div>
      <button onClick={handleClick}>dianji</button>
    </div>
  )
}
