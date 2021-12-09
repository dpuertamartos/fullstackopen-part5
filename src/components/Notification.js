import React from 'react'
import { useSelector } from 'react-redux'

const Notification = ({ isError }) => {
    const message = useSelector(state=>state.notifications)
    if (message === null) {
      return null
    }
    else if (message !== null && isError === null){
      return (
        <div className="notification">
          {message}
        </div>
      )
    }
    return (
      <div className="error">
        {message}
      </div>
    )
  }

export default Notification