import { Stats, OrbitControls, Environment } from '@react-three/drei'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import Room from './Room.jsx'
import MonitorScreen from './MonitorScreen.jsx'
import { useState, useRef } from 'react'
import * as THREE from 'three'

function useSmoothQuaternionLerp(targetQuaternion, lerpFactor = 0.05) {
  const { camera } = useThree()
  const tempQuat = new THREE.Quaternion()

  useFrame(() => {
    tempQuat.copy(camera.quaternion)
    tempQuat.slerp(targetQuaternion, lerpFactor)
    camera.quaternion.copy(tempQuat)
  })
}

function CameraController({ isFixedCamera }) {
  const { camera } = useThree()

  const monitorPosition = new THREE.Vector3(-0.75, 3.34, 2.6)
  const monitorEuler = new THREE.Euler(0, 1.55, 0, 'XYZ')
  const monitorQuaternion = new THREE.Quaternion().setFromEuler(monitorEuler)

  useFrame(() => {
    if (isFixedCamera) {
      camera.position.lerp(monitorPosition, 0.05)
    }
  })

  useSmoothQuaternionLerp(isFixedCamera ? monitorQuaternion : camera.quaternion, 0.05)

  return null
}

export default function App() {
  const [isFixedCamera, setIsFixedCamera] = useState(false)

  const initialCameraPosition = [5, 5, 8]

  const initialTarget = [0, 3, 0]

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1000,
          cursor: 'pointer',
          color: 'white',
          backgroundColor: 'black',
          padding: '5px',
          fontSize: '16px',
          fontFamily: 'Arial',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        }}
        onClick={() => setIsFixedCamera(!isFixedCamera)}
      >
        <tt>{isFixedCamera ? 'Click to free camera' : 'Click to view monitor'}</tt>
      </div>

      <Canvas camera={{ position: initialCameraPosition, fov: 50 }}>
        <CameraController isFixedCamera={isFixedCamera} />
        <Environment preset="city" background backgroundBlurriness={1} />
        <directionalLight position={[3.3, 1.0, 4.4]} />
        <Room />
        <MonitorScreen />
        <OrbitControls
          target={new THREE.Vector3(...initialTarget)}
          maxPolarAngle={Math.PI / 2}
          // minDistance={0.5} 
          maxDistance={20}
          enableDamping={true}   
          dampingFactor={0.1}
          enabled={!isFixedCamera}
        />
      </Canvas>

      <div id="css-renderer" style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none' }} />
    </>
  )
}
