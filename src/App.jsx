import { useState } from 'react'
import CanvasBackground from './components/CanvasBackground'

export default function App() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <div className="relative w-full h-screen flex flex-col justify-between p-8 z-10 select-none">
      {/* 1. 背景 Shader Canvas */}
      <CanvasBackground />

      {/* 2. 顶部 Navbar */}
      <header className="flex justify-between items-center max-w-7xl w-full mx-auto">
        <div className="font-['Geist_Mono'] text-xl font-semibold tracking-tight">
          <span className="text-blue-400 mr-0.5">+</span>Shader<span className="text-rose-500">+</span>Labs
        </div>
        <a
          href="https://github.com/industrenderAI/shaderlabs"
          target="_blank"
          rel="noreferrer"
          className="font-['Geist_Mono'] text-sm text-gray-400 hover:text-white transition-colors duration-200"
        >
          GitHub ↗
        </a>
      </header>

      {/* 3. 中央 Hero 主内容区 */}
      <main className="max-w-2xl w-full mx-auto text-center flex flex-col items-center my-auto">
        {/* 状态 Badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-['Geist_Mono'] text-gray-300 mb-6 backdrop-blur-md">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]"></span>
          Experiment v1.0
        </div>

        {/* 主标题 */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-none mb-5 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
          +Shader+Labs Experiment+
        </h1>

        {/* 描述文案 */}
        <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-8 max-w-xl">
          Curated resources for designers and developers. Shaders, crazy pixel experiments, and business development kits.
        </p>

        {/* 邮件订阅 Form */}
        <form className="flex flex-col sm:flex-row gap-2.5 w-full max-w-md mb-4" onSubmit={handleSubmit}>
          {submitted ? (
            <div className="w-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 py-3 px-6 rounded-xl font-['Geist_Mono'] text-sm backdrop-blur-md">
              ✓ Welcome to the experiment!
            </div>
          ) : (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-zinc-900/70 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition-colors backdrop-blur-md"
              />
              <button
                type="submit"
                className="bg-white text-black font-semibold text-sm px-5 py-3 rounded-xl hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
              >
                Join Waitlist
              </button>
            </>
          )}
        </form>

        <p className="text-xs text-gray-500">
          By joining you agree to our <a href="#" className="text-gray-400 underline hover:text-white">Privacy Policy</a>.
        </p>
      </main>

      {/* 4. 页脚 Footer */}
      <footer className="text-center text-xs text-gray-600 font-['Geist_Mono']">
        © 2026 ShaderLabs. All rights reserved.
      </footer>
    </div>
  )
}