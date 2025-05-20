import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useVideoTexture, useStaticTexture } from './TvScreen'
import * as THREE from 'three'

export default function Room2(props) {
  const texture = useVideoTexture('/video/sopranos_trailer.mp4')
  const staticTexture = useStaticTexture('/video/real.mp4')
  const { nodes, materials } = useGLTF('./models/room_new_screen.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={nodes.Plane.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane002.geometry}
        material={materials.wood_1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane003.geometry}
        material={materials.wood_1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane007.geometry}
        material={materials.wood}
        position={[2.723, 0.008, -2.665]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane008.geometry}
          material={materials.wood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials.wood}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane010.geometry}
        material={materials.wood}
        position={[-1.982, 0.008, -1.056]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane004.geometry}
          material={materials.wood}
          position={[0, 0, 1.923]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane005.geometry}
          material={materials.wood}
          position={[0, 0, 1.923]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane006.geometry}
          material={materials.wood}
        />
      </mesh>
      <group position={[0.832, 0.201, 2.763]} rotation={[0, -0.066, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh.geometry}
          material={materials.Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_1.geometry}
          material={materials['Material.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle.geometry}
          material={materials.metal}
          position={[-0.057, -0.225, -0.853]}
          rotation={[0, 0.066, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle001.geometry}
          material={materials.metal}
          position={[-0.057, -0.225, -0.853]}
          rotation={[0, 0.066, 0]}
        />
        <group position={[-0.113, 0, -1.705]} rotation={[Math.PI, -0.071, Math.PI]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_2.geometry}
            material={materials.Material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_3.geometry}
            material={materials['Material.002']}
          />
        </group>
        <group position={[-0.909, 0, -0.796]} rotation={[Math.PI, -0.066, Math.PI]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_4.geometry}
            material={materials.Material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_5.geometry}
            material={materials['Material.002']}
          />
        </group>
        <group position={[0.796, 0, -0.909]} rotation={[0, 0.066, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_6.geometry}
            material={materials.Material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_7.geometry}
            material={materials['Material.002']}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane014.geometry}
          material={materials.cushion}
          position={[-0.057, 0.969, -0.853]}
          rotation={[0, 0.066, 0]}
          scale={0.748}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane015.geometry}
          material={materials.metal}
          position={[-0.057, 0.969, -0.853]}
          rotation={[0, 0.066, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane022.geometry}
          material={materials.metal}
          position={[-0.057, 0.969, -0.853]}
          rotation={[0, 0.066, 0]}
          scale={0.748}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane036.geometry}
          material={materials.cushion}
          position={[-0.057, 0.969, -0.853]}
          rotation={[0, 0.066, 0]}
          scale={0.748}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane037.geometry}
          material={materials.metal}
          position={[-0.057, 0.969, -0.853]}
          rotation={[0, 0.066, 0]}
          scale={0.748}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane016.geometry}
        material={materials.wood}
        position={[2.723, 0.008, -2.665]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane020.geometry}
        material={materials.wood}
        position={[2.723, 0.008, -2.665]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane023.geometry}
        material={materials.poster}
        position={[-3.47, 3.501, 0.79]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane024.geometry}
          material={materials.tape}
          position={[0.006, 0.814, 0.617]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane025.geometry}
          material={materials.tape}
          position={[0.006, 0.814, -0.64]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane026.geometry}
          material={materials.tape}
          position={[0.006, -0.828, -0.653]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane027.geometry}
          material={materials.tape}
          position={[0.006, -0.824, 0.637]}
        />
      </mesh>
      <group position={[2.545, 3.27, -0.077]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane030_1.geometry}
          material={materials['Material.004']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane030_2.geometry}
          material={materials.book_pages}
        />
      </group>
      <group position={[2.317, 3.267, -0.045]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane031_1.geometry}
          material={materials.cable}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane031_2.geometry}
          material={materials.book_pages}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane030.geometry}
        material={nodes.Plane030.material}
        position={[2.317, 3.267, -0.045]}
      />
      <group position={[2.093, 3.267, -0.045]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane033_1.geometry}
          material={materials['Material.003']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane033_2.geometry}
          material={materials.book_pages}
        />
      </group>
      <group position={[1.859, 3.267, -0.045]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane034_1.geometry}
          material={materials.cable}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane034_2.geometry}
          material={materials.book_pages}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane033.geometry}
        material={nodes.Plane033.material}
        position={[1.859, 3.267, -0.045]}
      />
      <group position={[1.511, 3.267, -0.045]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane036_1.geometry}
          material={materials['Material.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane036_2.geometry}
          material={materials.book_pages}
        />
      </group>
      <group position={[1.297, 3.267, -0.045]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane037_1.geometry}
          material={materials.book_cover}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane037_2.geometry}
          material={materials.book_pages}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Roundcube.geometry}
        material={materials.wood}
        position={[-0.535, 1.478, -1.065]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Roundcube001.geometry}
        material={materials.wood}
        position={[-0.535, 0.799, -1.07]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Roundcube002.geometry}
        material={materials.wood}
        position={[3.383, 1.298, -1.682]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane039.geometry}
        material={materials['Material.005']}
        position={[0.006, 0.065, -0.095]}
        rotation={[-0.003, -0.023, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle003.geometry}
          material={materials['Material.012']}
          position={[0.719, 0.216, -0.391]}
          rotation={[-0.524, 0, -Math.PI / 2]}
          scale={0.837}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle004.geometry}
          material={materials['Material.006']}
          position={[0.807, 0.216, -0.558]}
          rotation={[-0.524, 0, -Math.PI / 2]}
          scale={0.837}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.tv_screen.geometry}
          position={[0, 0, 0]}
        >
          {texture ? (
            <meshStandardMaterial 
              map={texture} 
              toneMapped={false}
              side={THREE.DoubleSide}
            />
          ) : (
            <meshStandardMaterial color="black" />
          )}
        </mesh>
        <mesh
          geometry={nodes.tv_screen.geometry}
          position={[0, 0, 0.001]} // smaller offset to prevent z-fighting
        >
          {staticTexture ? (
            <meshStandardMaterial
              map={staticTexture}
              transparent={false}
              opacity={1}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          ) : null}
        </mesh>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane018.geometry}
        material={materials.venusaur}
        position={[-1.054, 2.083, -1.232]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane038.geometry}
        material={materials['Material.008']}
        position={[-1.253, 2.083, -1.013]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane040.geometry}
        material={materials['Material.009']}
        position={[-1.206, 2.084, -1.489]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane041.geometry}
        material={materials.poster}
        position={[-3.47, 3.501, 0.79]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane042.geometry}
        material={materials['Material.014']}
        position={[-0.919, 2.084, -1.749]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane043.geometry}
        material={materials['Material.011']}
        position={[-1.401, 2.087, -1.265]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane044.geometry}
        material={materials['Material.013']}
        position={[-0.91, 2.09, -1.495]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane045.geometry}
        material={materials['Material.015']}
        position={[-3.476, 3.857, 2.417]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane046.geometry}
        material={materials.tape}
        position={[-3.475, 4.688, 3.319]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane047.geometry}
        material={materials.tape}
        position={[-3.475, 4.662, 2.152]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane048.geometry}
        material={materials.tape}
        position={[-3.475, 3.022, 2.198]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane049.geometry}
        material={materials.tape}
        position={[-3.475, 3.048, 3.353]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane050.geometry}
        material={materials['Material.007']}
        position={[-3.476, 4.114, -1.607]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane051.geometry}
        material={materials.tape}
        position={[-3.475, 4.654, -0.766]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane052.geometry}
        material={materials.tape}
        position={[-3.475, 3.137, -2.039]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane053.geometry}
        material={materials.tape}
        position={[-3.475, 3.045, -0.895]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane054.geometry}
        material={materials.tape}
        position={[-3.475, 4.751, -1.915]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mouse.geometry}
        material={materials['Material.024']}
        position={[-2.32, 2.484, 2.551]}
        rotation={[0, 1.562, 0]}
        scale={0.799}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.monitor_base.geometry}
        material={materials['Material.024']}
        position={[-2.091, 2.484, 2.589]}
        rotation={[0, 1.562, 0]}
        scale={0.799}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.keyboard.geometry}
        material={materials['Material.024']}
        position={[-2.238, 2.484, 2.588]}
        rotation={[0, 1.562, 0]}
        scale={0.799}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.computer.geometry}
        material={materials['Material.024']}
        position={[-2.091, 2.484, 2.589]}
        rotation={[0, 1.562, 0]}
        scale={0.799}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cables.geometry}
        material={materials['Material.025']}
        position={[-2.091, 2.484, 2.589]}
        rotation={[0, 1.562, 0]}
        scale={0.799}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials.wood_1}
        position={[-0.873, 3.481, -3.475]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={materials.wood_1}
        position={[-0.873, 3.481, -3.475]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={materials.window}
        position={[-0.873, 3.481, -3.475]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001_1.geometry}
        material={materials.wall}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001_2.geometry}
        material={materials.wall}
      />
    </group>
  )
}

useGLTF.preload('./models/room_new_screen.glb')
