import { useRef, useEffect } from 'react'
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Vector3, Raycaster } from 'three'

const SCREEN_SIZE = {
  width: 1.08,  
  height: 0.86  
}

const IFRAME_PADDING = 20

const SCALE_FACTOR = 0.01  

export default function MonitorScreen() {
  const { scene, camera } = useThree()
  const cssRenderer = useRef()
  const cssScene = useRef(new THREE.Scene())
  const object = useRef()
  const mesh = useRef()
  const dimmingPlane = useRef()
  const videoTextures = useRef({})

  const controls = {
    positionX: -1.76,
    positionY: 3.34,
    positionZ: 2.6,
    rotationX: -0.08,
    rotationY: Math.PI / 2,
    rotationZ: 0,
    scale: 0.001,
  }

  useEffect(() => {
    cssRenderer.current = new CSS3DRenderer()
    cssRenderer.current.setSize(window.innerWidth, window.innerHeight)
    cssRenderer.current.domElement.style.position = 'absolute'
    cssRenderer.current.domElement.style.top = '0'
    cssRenderer.current.domElement.style.pointerEvents = 'none'
    document.getElementById('css-renderer').appendChild(cssRenderer.current.domElement)

    const container = document.createElement('div')
    container.style.width = (SCREEN_SIZE.width * 1000) + 'px'  // Convert meters to pixels
    container.style.height = (SCREEN_SIZE.height * 1000) + 'px'  // Convert meters to pixels
    container.style.opacity = '1'
    container.style.background = '#001309'

    const iframe = document.createElement('iframe')
    iframe.src = 'https://xp.lappas.be'
    iframe.style.width = (SCREEN_SIZE.width * 1000) + 'px'  // Convert meters to pixels
    iframe.style.height = (SCREEN_SIZE.height * 1000) + 'px'  // Convert meters to pixels
    iframe.style.padding = IFRAME_PADDING + 'px'
    iframe.style.boxSizing = 'border-box'
    iframe.style.opacity = '1'
    iframe.id = 'computer-screen'
    iframe.frameBorder = '0'
    iframe.style.pointerEvents = 'auto'

    container.appendChild(iframe)

    object.current = new CSS3DObject(container)
    cssScene.current.add(object.current)

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
    mesh.current.raycast = () => {} 
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
    
      raycaster.set(camera.position, worldPosition.clone().sub(camera.position).normalize())
      const intersects = raycaster.intersectObjects(scene.children, true)
    
      const distanceToScreen = camera.position.distanceTo(worldPosition)
      const isOccluded = intersects.length > 0 && intersects[0].distance < distanceToScreen
    
      const shouldBeVisible = isFacingCamera && !isOccluded
      object.current.element.style.display = shouldBeVisible ? 'block' : 'none'

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

    const animate = () => {
      requestAnimationFrame(animate)
    
      cssRenderer.current.render(cssScene.current, camera) 
      updateVisibility()
    }
    animate()

    const handleResize = () => {
      cssRenderer.current.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      scene.remove(mesh.current)
      textureMeshes.forEach(mesh => scene.remove(mesh))
      clearInterval(checkInterval) 
      cssScene.current.remove(object.current)
      if (cssRenderer.current?.domElement) {
        document.getElementById('css-renderer')?.removeChild(cssRenderer.current.domElement)
      }

      const existingIframe = document.getElementById('computer-screen')
      if (existingIframe) {
        existingIframe.remove()
      }
    }
  }, [scene, camera])

  useEffect(() => {
    if (object.current && mesh.current) {

      object.current.position.set(controls.positionX, controls.positionY, controls.positionZ)
      mesh.current.position.copy(object.current.position)

      const quaternion = new THREE.Quaternion()
      quaternion.setFromEuler(new THREE.Euler(
        controls.rotationX,
        controls.rotationY,
        controls.rotationZ,
        'YXZ'
      ))
      object.current.quaternion.copy(quaternion)
      mesh.current.quaternion.copy(quaternion)

      const scale = controls.scale
      object.current.scale.set(scale, scale, scale)
      mesh.current.scale.copy(object.current.scale)
    }
  }, [controls])

  return null
} 