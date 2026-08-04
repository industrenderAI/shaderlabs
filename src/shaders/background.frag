uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 vUv;

void main() {
  // 归一化坐标并修正宽高比
  vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
  vec2 mouse = (u_mouse - 0.5 * u_resolution.xy) / u_resolution.y;

  // 鼠标交互光晕计算
  float dist = length(st - mouse);
  float mouseGlow = 0.12 / (dist + 0.25);

  // 流体波浪算法
  float wave1 = sin(st.x * 3.5 + u_time * 0.8) * 0.5 + 0.5;
  float wave2 = cos(st.y * 4.0 - u_time * 0.6) * 0.5 + 0.5;
  float wave3 = sin((st.x + st.y) * 2.5 + u_time * 0.4);

  // 渐变色彩定义
  vec3 colorDark = vec3(0.04, 0.05, 0.12); // 深蓝背景
  vec3 colorPrimary = vec3(0.85, 0.2, 0.55); // 霓虹粉
  vec3 colorAccent = vec3(0.1, 0.8, 0.75); // 翡翠青

  vec3 finalColor = mix(colorDark, colorPrimary, wave1 * wave2);
  finalColor = mix(finalColor, colorAccent, wave3 * 0.5 + 0.5);
  finalColor += mouseGlow * vec3(0.3, 0.6, 1.0); // 融入鼠标位置淡蓝光晕

  gl_FragColor = vec4(finalColor, 1.0);
}