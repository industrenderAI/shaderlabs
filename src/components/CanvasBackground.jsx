import { Canvas } from '@react-three/fiber'
import ShaderPlane from './ShaderPlane'

export default function CanvasBackground() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
      <Canvas
        orthographic
        camera={{ left: -1, right: 1, top: 1, bottom: -1, near: 0, far: 1 }}
        gl={{ antialias: true, pixelRatio: Math.min(window.devicePixelRatio, 2) }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  )
}