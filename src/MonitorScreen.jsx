import { useRef, useEffect } from 'react'
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useControls } from 'leva'
import { Vector3, Raycaster } from 'three'

const SCREEN_SIZE = {
  width: 1000,  // Converting from meters to pixels (0.8m * 1000)
  height: 720   // Converting from meters to pixels (0.98m * 1000)
}

const IFRAME_PADDING = 20

export default function MonitorScreen() {
  const { scene, camera } = useThree()
  const cssRenderer = useRef()
  const cssScene = useRef(new THREE.Scene())
  const object = useRef()
  const mesh = useRef()

  // Add Leva controls
  const controls = useControls('Monitor Screen', {
    positionX: { value: -2.11, min: -5, max: 5, step: 0.0001 },
    positionY: { value: 3.17, min: -5, max: 5, step: 0.0001 },
    positionZ: { value: 2.93, min: -5, max: 5, step: 0.0001 },
    rotationX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotationY: { value: Math.PI / 2, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotationZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    scale: { value: 0.001, min: 0.0001, max: 0.01, step: 0.0001 }
  })
  
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
    container.style.width = SCREEN_SIZE.width + 'px'
    container.style.height = SCREEN_SIZE.height + 'px'
    container.style.opacity = '1'
    container.style.background = '#000000'
    container.style.borderRadius = '30px'

    // Create iframe
    const iframe = document.createElement('iframe')
    iframe.src = 'https://subterra-bjj.be'
    iframe.style.width = SCREEN_SIZE.width + 'px'
    iframe.style.height = SCREEN_SIZE.height + 'px'
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

    const geometry = new THREE.PlaneGeometry(0.98, 0.8)
    mesh.current = new THREE.Mesh(geometry, material)
    mesh.current.raycast = () => {} // disable raycasting on the screen mesh

    mesh.current.renderOrder = -1 // Ensure it renders before other objects
    scene.add(mesh.current)

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

      // Update rotation
      object.current.rotation.set(controls.rotationX, controls.rotationY, controls.rotationZ)
      mesh.current.rotation.copy(object.current.rotation)

      // Update scale
      const scale = controls.scale
      object.current.scale.set(scale, scale, scale)
      mesh.current.scale.copy(object.current.scale)
    }
  }, [controls])

  return null
} 