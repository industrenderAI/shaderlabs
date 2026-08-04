import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

import vertexShader from '../shaders/background.vert'
import fragmentShader from '../shaders/background.frag'

export default function ShaderPlane() {
  const meshRef = useRef()
  const { size } = useThree()

  // 记录鼠标真实位置与平滑插值目标位置
  const mousePos = useRef({ x: size.width / 2, y: size.height / 2 })
  const targetMousePos = useRef({ x: size.width / 2, y: size.height / 2 })

  // 初始化 uniforms
  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(size.width, size.height) },
      u_mouse: { value: new THREE.Vector2(size.width / 2, size.height / 2) },
    }),
    []
  )

  // 监听屏幕尺寸调整
  useEffect(() => {
    if (meshRef.current) {
      uniforms.u_resolution.value.set(size.width, size.height)
    }
  }, [size, uniforms])

  // 全局鼠标移动监听（平滑缓动）
  useEffect(() => {
    const handleMouseMove = (e) => {
      targetMousePos.current.x = e.clientX
      targetMousePos.current.y = size.height - e.clientY // 翻转 Y 轴匹配 WebGL 坐标
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [size.height])

  // 每帧更新动画与鼠标插值（Lerp）
  useFrame((state) => {
    if (meshRef.current) {
      // 时间更新
      uniforms.u_time.value = state.clock.getElapsedTime()

      // 0.05 决定粘稠延迟感（越小越平滑）
      mousePos.current.x += (targetMousePos.current.x - mousePos.current.x) * 0.05
      mousePos.current.y += (targetMousePos.current.y - mousePos.current.y) * 0.05

      uniforms.u_mouse.value.set(mousePos.current.x, mousePos.current.y)
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}