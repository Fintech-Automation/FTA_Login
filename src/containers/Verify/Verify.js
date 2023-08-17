import React from 'react'
import {useHistory,useLocation} from "react-router-dom";

export default function Verify() {
  const history = useHistory();
  const loacation = useLocation();

  const handleClick = () => {
    history.push('/signup')
  }

  return (
    <div>
      <button onClick={handleClick}>dianji</button>
    </div>
  )
}
