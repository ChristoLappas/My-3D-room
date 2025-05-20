// useVideoTexture.js
import { useEffect, useState } from 'react'
import * as THREE from 'three'

export function useVideoTexture(src) {
  const [texture, setTexture] = useState(null)

  useEffect(() => {
    const video = document.createElement('video')
    video.src = src
    video.crossOrigin = 'anonymous'
    video.loop = true
    video.muted = true
    video.playsInline = true
    video.autoplay = true

    video.addEventListener('loadeddata', () => {
      video.play()
      const videoTexture = new THREE.VideoTexture(video)
      videoTexture.minFilter = THREE.LinearFilter
      videoTexture.magFilter = THREE.LinearFilter
      videoTexture.format = THREE.RGBAFormat
      videoTexture.flipY = false
      setTexture(videoTexture)
    })
  }, [src])

  return texture
}

export function useStaticTexture(src) {
  const [texture, setTexture] = useState(null)

  useEffect(() => {
    const video = document.createElement('video')
    video.src = src
    video.crossOrigin = 'anonymous'
    video.loop = true
    video.muted = true
    video.playsInline = true
    video.autoplay = true

    video.addEventListener('loadeddata', () => {
      console.log('Video data loaded:', src)
      video.play().catch(error => {
        console.error('Error playing video:', error)
      })
      const videoTexture = new THREE.VideoTexture(video)
      videoTexture.minFilter = THREE.LinearFilter
      videoTexture.magFilter = THREE.LinearFilter
      videoTexture.format = THREE.RGBAFormat
      videoTexture.flipY = false
      setTexture(videoTexture)
    })

    // Cleanup function
    return () => {
      video.pause()
      video.remove()
      if (texture) {
        texture.dispose()
      }
    }
  }, [src])

  return texture
}
