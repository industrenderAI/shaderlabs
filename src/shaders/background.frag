uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 vUv;

// --- Simplex Noise 算法库 ---
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

// 分形布朗运动 (FBM)
float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
        value += amplitude * snoise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    // 基础坐标归一化
    vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    vec2 mouse = (u_mouse - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

    // 鼠标扰动力场
    float mouseDist = length(st - mouse);
    vec2 mouseOffset = (st - mouse) * exp(-mouseDist * 3.5) * 0.3;

    // --- 域扭曲 (Domain Warping) ---
    vec2 q = vec2(0.0);
    q.x = fbm(st * 2.5 + vec2(u_time * 0.15, u_time * 0.1) + mouseOffset);
    q.y = fbm(st * 2.5 + vec2(1.0));

    vec2 r = vec2(0.0);
    r.x = fbm(st * 3.0 + 1.0 * q + vec2(1.7, 9.2) + 0.15 * u_time);
    r.y = fbm(st * 3.0 + 1.0 * q + vec2(8.3, 2.8) + 0.126 * u_time);

    float f = fbm(st * 2.0 + r + mouseOffset);

    // --- ShaderLabs 调色盘 ---
    vec3 colorDark   = vec3(0.04, 0.05, 0.08); // 深邃暗黑底色
    vec3 colorBlue   = vec3(0.12, 0.35, 0.85); // 霓虹蓝
    vec3 colorPurple = vec3(0.58, 0.15, 0.88); // 极光紫
    vec3 colorPink   = vec3(0.95, 0.25, 0.55); // 高光粉

    // 层次颜色混合
    vec3 color = mix(colorDark, colorBlue, clamp(f * f * 4.0, 0.0, 1.0));
    color = mix(color, colorPurple, clamp(length(q), 0.0, 1.0));
    color = mix(color, colorPink, clamp(length(r.x), 0.0, 1.0));

    // 高光与边缘强化
    color += pow(f, 3.0) * vec3(0.4, 0.8, 1.0) * 0.6;
    color += (0.08 / (mouseDist + 0.15)) * vec3(0.3, 0.6, 1.0); // 鼠标局部冷光

    gl_FragColor = vec4(color, 1.0);
}