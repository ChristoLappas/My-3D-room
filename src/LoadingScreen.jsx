import React from 'react'
import { Html } from '@react-three/drei'

const LoadingScreen = () => {
  return (
    <Html center>
      <div
        style={{
          color: '#fff',
          background: '#000',
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          justifyItems: 'bottom',
          fontSize: '1.3rem'
        }}>
        <div style={{display: 'flex', alignItems: 'baseline'}}>
            <img src="img/bonfire.gif" alt="bonfire" style={{width: '80px', marginRight: '20px'}}/>
            <tt style={{}}>Loading 3D Scene...</tt>
        </div>
      </div>
    </Html>
  )
}

export default LoadingScreen
