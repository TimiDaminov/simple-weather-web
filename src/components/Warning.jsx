import React from 'react'

const Warning = () => {
  return (
     <h1 style={{ textAlign: "center", marginTop: "50px", color: "#fff" }}>
          No city selected!
      </h1>
  )
}

export default React.memo(Warning)