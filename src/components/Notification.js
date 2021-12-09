import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Notification = ({ isError }) => {
    const message = useSelector(state=>state)
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