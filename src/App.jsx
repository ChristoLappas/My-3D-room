import { Stats, OrbitControls, Environment, Html } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Room from './Room.jsx'
import Room2 from './Room2.jsx'
import MonitorScreen from './MonitorScreen.jsx'

export default function App() {
  // const gltf = useLoader(GLTFLoader, './models/room_new_screen.glb')

  return (
    <>
      <Canvas camera={{ position: [-0.5, 1, 2] }}>
        {/* <Environment files="./img/HDR_silver_and_gold_nebulae.hdr" background />
        <pointLight 
          position={[0, 7, 0]}
          intensity={30}       
          castShadow
        />  */}
        <Environment preset="city" background backgroundBlurriness={1} />
        <directionalLight position={[3.3, 1.0, 4.4]} />
        {/* <primitive object={gltf.scene} position={[0, 0, 0]} /> */}
        {/* <Room /> */}
        <Room2 />
        <MonitorScreen />
        <OrbitControls target={[0, 1, 0]} maxPolarAngle={Math.PI / 2}/>
        {/* <axesHelper args={[5]} /> */}
        {/* <Stats /> */}
      </Canvas>
      <div id="css-renderer" style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none' }} />
    </>
  )
}
