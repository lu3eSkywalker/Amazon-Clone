import React from 'react'

const JustTesting3 = () => {

  return (
    <div>
        <button onClick={() => console.log(process.env.REACT_APP_BASE_URL)}>Env variable</button>
    </div>
  )
}

export default JustTesting3