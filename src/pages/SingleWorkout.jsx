import React from 'react'
import { useNavigate } from 'react-router-dom'

const SingleWorkout = () => {

    const navigate = useNavigate()
  return (
    <div>
        <button onClick={()=>navigate(-1)}>Go Back</button>
        <div>single workout</div>
    </div>
  )
}

export default SingleWorkout
