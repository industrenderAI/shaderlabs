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
    <div className="main-container">
      {/* 1. 背景 WebGL Shader Canvas */}
      <CanvasBackground />

      {/* 2. 顶部 Navigation Bar */}
      <header className="navbar">
        <div className="logo">
          <span className="logo-symbol">+</span>Shader<span className="logo-highlight">+</span>Labs
        </div>
        <a
          href="https://github.com/industrenderAI/shaderlabs"
          target="_blank"
          rel="noreferrer"
          className="github-link"
        >
          GitHub ↗
        </a>
      </header>

      {/* 3. 中央 Hero 主内容区 */}
      <main className="hero-content">
        <div className="badge">
          <span className="badge-dot"></span> Experiment v1.0
        </div>

        <h1 className="hero-title">
          +Shader+Labs Experiment+
        </h1>

        <p className="hero-description">
          Curated resources for designers and developers. Shaders, crazy pixel experiments, and business development kits.
        </p>

        {/* 邮件订阅 Form */}
        <form className="subscribe-form" onSubmit={handleSubmit}>
          {submitted ? (
            <div className="success-msg">✓ Welcome to the experiment!</div>
          ) : (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="subscribe-input"
              />
              <button type="submit" className="subscribe-btn">
                Join Waitlist
              </button>
            </>
          )}
        </form>

        <p className="privacy-note">
          By joining you agree to our <a href="#">Privacy Policy</a>.
        </p>
      </main>

      {/* 4. 页脚 Footer */}
      <footer className="footer">
        <span>© 2026 ShaderLabs. All rights reserved.</span>
      </footer>
    </div>
  )
}