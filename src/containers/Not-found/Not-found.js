import React from 'react'
import {useHistory,useLocation} from "react-router-dom";

export default function NotFound() {
  const history = useHistory();
  const loacation = useLocation();

  const handleClick = () => {
    history.push('/enroll')
  }

  return (
    <div>
      <button onClick={handleClick}>dianji</button>
    </div>
  )
}
