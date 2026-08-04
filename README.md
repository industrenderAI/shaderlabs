# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.


```bash
my-shader-bg/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/              // 静态资源（如纹理图片）
│   ├── components/
│   │   ├── CanvasBackground.jsx  // 包含 Canvas 的容器组件
│   │   └── ShaderPlane.jsx       // Shader 核心渲染平面组件
│   ├── shaders/
│   │   ├── background.vert  // 顶点着色器文件 (GLSL)
│   │   └── background.frag  // 片元着色器文件 (GLSL)
│   ├── App.jsx              // 页面 UI 与布局
│   ├── index.css            // 全屏基础样式
│   └── main.jsx             // 应用入口
├── index.html
├── package.json
└── vite.config.js           // 配置 GLSL 插件

```