import { useRef, useEffect } from 'react'
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useControls } from 'leva'
import { Vector3, Raycaster } from 'three'

const SCREEN_SIZE = {
  width: 1.08,  // Reduced to meters (typical monitor width)
  height: 0.86  // Reduced to meters (typical monitor height)
}

const IFRAME_PADDING = 20

// Scale factor for depth offset
const SCALE_FACTOR = 0.01  // Dramatically reduced for 3D scene

export default function MonitorScreen() {
  const { scene, camera } = useThree()
  const cssRenderer = useRef()
  const cssScene = useRef(new THREE.Scene())
  const object = useRef()
  const mesh = useRef()
  const dimmingPlane = useRef()
  const videoTextures = useRef({})

  // Add Leva controls
  const controls = useControls('Monitor Screen', {
    positionX: { value: -1.76, min: -5, max: 5, step: 0.00001 },
    positionY: { value: 4.34, min: -5, max: 5, step: 0.00001 },
    positionZ: { value: 2.6, min: -5, max: 5, step: 0.00001 },
    rotationX: { value: -0.08, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotationY: { value: Math.PI / 2, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotationZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    scale: { value: 0.001, min: 0.0001, max: 0.01, step: 0.0001 }
  })

  // Function to get video textures
  const getVideoTextures = (videoId) => {
    const video = document.getElementById(videoId)
    if (!video) {
      setTimeout(() => {
        getVideoTextures(videoId)
      }, 100)
    } else {
      // Ensure video is playing
      if (video.paused) {
        video.play().catch(error => {
          console.error(`Error playing video ${videoId}:`, error)
        })
      }
      
      const texture = new THREE.VideoTexture(video)
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.format = THREE.RGBFormat
      videoTextures.current[videoId] = texture
    }
  }

  // Function to add texture layer
  const addTextureLayer = (texture, blendingMode, opacity, offset) => {
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      blending: blendingMode,
      side: THREE.DoubleSide,
      opacity,
      transparent: true,
      depthWrite: false,  // Don't write to depth buffer
      depthTest: true,    // Still test depth with other objects
    })

    const geometry = new THREE.PlaneGeometry(1.08, 0.86)
    const mesh = new THREE.Mesh(geometry, material)

    // Copy position and apply the depth offset
    const position = new THREE.Vector3(
      controls.positionX,
      controls.positionY,
      controls.positionZ + (offset * 0.001)
    )
    mesh.position.copy(position)

    // Copy rotation using quaternions for proper rotation order
    const quaternion = new THREE.Quaternion()
    quaternion.setFromEuler(new THREE.Euler(
      controls.rotationX,
      controls.rotationY,
      controls.rotationZ,
      'YXZ'  // Order matters: Y first, then X, then Z
    ))
    mesh.quaternion.copy(quaternion)

    // Add to scene
    scene.add(mesh)
    return mesh
  }

  // Function to create enclosing plane
  const createEnclosingPlane = (plane) => {
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      color: 0x48493f,
    })

    const geometry = new THREE.PlaneGeometry(plane.size.x, plane.size.y)
    const mesh = new THREE.Mesh(geometry, material)

    mesh.position.copy(plane.position)
    mesh.rotation.copy(plane.rotation)

    scene.add(mesh)
  }

  // Function to create texture layers
  const createTextureLayers = () => {
    // Get video textures
    getVideoTextures('video-1')
    getVideoTextures('video-2')

    // Define texture layers with adjusted offsets
    const layers = {
      smudge: {
        texture: new THREE.TextureLoader().load('/textures/smudges.jpg'),
        blending: THREE.AdditiveBlending,
        opacity: 0.12,
        offset: 0.024,
      },
      innerShadow: {
        texture: new THREE.TextureLoader().load('/textures/shadow-compressed.png'),
        blending: THREE.NormalBlending,
        opacity: 1,
        offset: 0.005,
      },
      video: {
        texture: videoTextures.current['video-1'] || new THREE.Texture(),
        blending: THREE.AdditiveBlending,
        opacity: 0.5,
        offset: 0.01,
      },
      video2: {
        texture: videoTextures.current['video-2'] || new THREE.Texture(),
        blending: THREE.AdditiveBlending,
        opacity: 0.1,
        offset: 0.015,
      },
    }

    let maxOffset = -1
    const textureMeshes = []

    // Add texture layers
    for (const layer of Object.values(layers)) {
      const offset = layer.offset * SCALE_FACTOR
      const mesh = addTextureLayer(layer.texture, layer.blending, layer.opacity, offset)
      textureMeshes.push(mesh)
      if (offset > maxOffset) maxOffset = offset
    }

    // Update video textures when they become available
    const updateVideoTextures = () => {
      if (videoTextures.current['video-1']) {
        const video1Mesh = textureMeshes[2]  // video layer
        video1Mesh.material.map = videoTextures.current['video-1']
        video1Mesh.material.needsUpdate = true
        video1Mesh.material.map.needsUpdate = true
      }
      if (videoTextures.current['video-2']) {
        const video2Mesh = textureMeshes[3]  // video2 layer
        video2Mesh.material.map = videoTextures.current['video-2']
        video2Mesh.material.needsUpdate = true
        video2Mesh.material.map.needsUpdate = true
      }
    }

    // Check for video textures periodically
    const checkInterval = setInterval(updateVideoTextures, 100)

    // Clear interval on cleanup
    return { maxOffset, textureMeshes, checkInterval }
  }

  // Function to create enclosing planes
  const createEnclosingPlanes = (maxOffset) => {
    const planes = {
      left: {
        size: new THREE.Vector2(maxOffset, SCREEN_SIZE.height),
        position: new THREE.Vector3(
          controls.positionX - SCREEN_SIZE.width / 2,
          controls.positionY,
          controls.positionZ + maxOffset / 2
        ),
        rotation: new THREE.Euler(0, Math.PI / 2, 0),
      },
      right: {
        size: new THREE.Vector2(maxOffset, SCREEN_SIZE.height),
        position: new THREE.Vector3(
          controls.positionX + SCREEN_SIZE.width / 2,
          controls.positionY,
          controls.positionZ + maxOffset / 2
        ),
        rotation: new THREE.Euler(0, Math.PI / 2, 0),
      },
      top: {
        size: new THREE.Vector2(SCREEN_SIZE.width, maxOffset),
        position: new THREE.Vector3(
          controls.positionX,
          controls.positionY + SCREEN_SIZE.height / 2,
          controls.positionZ + maxOffset / 2
        ),
        rotation: new THREE.Euler(Math.PI / 2, 0, 0),
      },
      bottom: {
        size: new THREE.Vector2(SCREEN_SIZE.width, maxOffset),
        position: new THREE.Vector3(
          controls.positionX,
          controls.positionY - SCREEN_SIZE.height / 2,
          controls.positionZ + maxOffset / 2
        ),
        rotation: new THREE.Euler(Math.PI / 2, 0, 0),
      },
    }

    // for (const plane of Object.values(planes)) {
    //   createEnclosingPlane(plane)
    // }
  }

  // Function to create perspective dimmer
  // const createPerspectiveDimmer = (maxOffset) => {
  //   const material = new THREE.MeshBasicMaterial({
  //     side: THREE.DoubleSide,
  //     color: 0x000000,
  //     transparent: true,
  //     blending: THREE.AdditiveBlending,
  //   })

  //   const geometry = new THREE.PlaneGeometry(SCREEN_SIZE.width, SCREEN_SIZE.height)
  //   const mesh = new THREE.Mesh(geometry, material)

  //   mesh.position.set(
  //     controls.positionX,
  //     controls.positionY,
  //     controls.positionZ + maxOffset - 5
  //   )

  //   mesh.rotation.set(controls.rotationX, controls.rotationY, controls.rotationZ)

  //   dimmingPlane.current = mesh
  //   scene.add(mesh)
  // }

  useEffect(() => {
    // Set up CSS3D renderer
    cssRenderer.current = new CSS3DRenderer()
    cssRenderer.current.setSize(window.innerWidth, window.innerHeight)
    cssRenderer.current.domElement.style.position = 'absolute'
    cssRenderer.current.domElement.style.top = '0'
    cssRenderer.current.domElement.style.pointerEvents = 'none'
    document.getElementById('css-renderer').appendChild(cssRenderer.current.domElement)

    // Create container for iframe
    const container = document.createElement('div')
    container.style.width = (SCREEN_SIZE.width * 1000) + 'px'  // Convert meters to pixels
    container.style.height = (SCREEN_SIZE.height * 1000) + 'px'  // Convert meters to pixels
    container.style.opacity = '1'
    container.style.background = '#000000'
    container.style.borderRadius = '30px'

    // Create iframe
    const iframe = document.createElement('iframe')
    iframe.src = 'https://subterra-bjj.be'
    iframe.style.width = (SCREEN_SIZE.width * 1000) + 'px'  // Convert meters to pixels
    iframe.style.height = (SCREEN_SIZE.height * 1000) + 'px'  // Convert meters to pixels
    iframe.style.padding = IFRAME_PADDING + 'px'
    iframe.style.boxSizing = 'border-box'
    iframe.style.opacity = '1'
    iframe.id = 'computer-screen'
    iframe.frameBorder = '0'
    iframe.style.pointerEvents = 'auto'
    iframe.style.borderRadius = '30px'

    // Add iframe to container
    container.appendChild(iframe)

    // Create CSS3D object
    object.current = new CSS3DObject(container)
    cssScene.current.add(object.current)

    // Create GL plane for proper occlusion
    const material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      opacity: 1,
      transparent: false,
      side: THREE.DoubleSide,
      blending: THREE.NoBlending,
      depthTest: true,
      depthWrite: true
    })

    const geometry = new THREE.PlaneGeometry(0.9, 0.68)
    mesh.current = new THREE.Mesh(geometry, material)
    mesh.current.raycast = () => {} // disable raycasting on the screen mesh
    scene.add(mesh.current)

    // Create texture layers and get max offset
    const { maxOffset, textureMeshes, checkInterval } = createTextureLayers()
    
    // Create enclosing planes
    createEnclosingPlanes(maxOffset)
    
    // Create perspective dimmer
    // createPerspectiveDimmer(maxOffset)

    const cameraToIframe = new Vector3()
    const iframeNormal = new Vector3(0, 0, 1)
    const worldPosition = new Vector3()
    const raycaster = new Raycaster()
    
    function updateVisibility() {
      if (!object.current || !camera || !scene) return
    
      object.current.getWorldPosition(worldPosition)
      cameraToIframe.subVectors(camera.position, worldPosition).normalize()
    
      const normalWorld = iframeNormal.clone().applyQuaternion(object.current.quaternion)
      const dot = normalWorld.dot(cameraToIframe)
    
      const isFacingCamera = dot > 0
    
      // Now raycast to check for occlusion
      raycaster.set(camera.position, worldPosition.clone().sub(camera.position).normalize())
      const intersects = raycaster.intersectObjects(scene.children, true)
    
      const distanceToScreen = camera.position.distanceTo(worldPosition)
      const isOccluded = intersects.length > 0 && intersects[0].distance < distanceToScreen
    
      // Final visibility logic
      const shouldBeVisible = isFacingCamera && !isOccluded
      object.current.element.style.display = shouldBeVisible ? 'block' : 'none'

      // Update dimming plane opacity
      if (dimmingPlane.current) {
        const planeNormal = new THREE.Vector3(0, 0, 1)
        const viewVector = new THREE.Vector3()
        viewVector.copy(camera.position)
        viewVector.sub(dimmingPlane.current.position)
        viewVector.normalize()

        const dot = viewVector.dot(planeNormal)
        const distance = camera.position.distanceTo(dimmingPlane.current.position)
        const opacity = 1 / (distance / 10000)
        const DIM_FACTOR = 0.7

        dimmingPlane.current.material.opacity = (1 - opacity) * DIM_FACTOR + (1 - dot) * DIM_FACTOR
      }
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
    
      // Update CSS3D rendering
      cssRenderer.current.render(cssScene.current, camera) 
      updateVisibility()
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      cssRenderer.current.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      scene.remove(mesh.current)
      textureMeshes.forEach(mesh => scene.remove(mesh))
      clearInterval(checkInterval)  // Clear the video texture check interval
      cssScene.current.remove(object.current)
      if (cssRenderer.current?.domElement) {
        document.getElementById('css-renderer')?.removeChild(cssRenderer.current.domElement)
      }
      // Clean up any existing iframes
      const existingIframe = document.getElementById('computer-screen')
      if (existingIframe) {
        existingIframe.remove()
      }
    }
  }, [scene, camera])

  // Update position, rotation and scale based on controls
  useEffect(() => {
    if (object.current && mesh.current) {
      // Update position
      object.current.position.set(controls.positionX, controls.positionY, controls.positionZ)
      mesh.current.position.copy(object.current.position)

      // Update rotation using quaternions for proper rotation order
      const quaternion = new THREE.Quaternion()
      quaternion.setFromEuler(new THREE.Euler(
        controls.rotationX,
        controls.rotationY,
        controls.rotationZ,
        'YXZ'  // Order matters: Y first, then X, then Z
      ))
      object.current.quaternion.copy(quaternion)
      mesh.current.quaternion.copy(quaternion)

      // Update scale
      const scale = controls.scale
      object.current.scale.set(scale, scale, scale)
      mesh.current.scale.copy(object.current.scale)
    }
  }, [controls])

  return null
} 