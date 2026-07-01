import { useState } from 'react'

function App() {
  return (
    <div className="app-container">
      {/* Background radial glows for modern design */}
      <div className="glow glow-1"></div>
      <div className="glow glow-2"></div>
      
      <header className="header">
        <div className="brand">
          <div className="aperture-icon">
            <div className="blade"></div>
            <div className="blade"></div>
            <div className="blade"></div>
            <div className="blade"></div>
            <div className="blade"></div>
          </div>
          <span className="brand-name">Shutter List</span>
        </div>
        <nav className="nav">
          <span className="nav-status">
            <span className="pulse"></span>
            Development Mode
          </span>
        </nav>
      </header>

      <main className="main-content">
        <div className="hero-section">
          <div className="shutter-badge">Vite + React Starter</div>
          <h1 className="hero-title">Shutter List</h1>
          <p className="hero-subtitle">
            A minimalist curation workspace for photographers. Organize your shots, refine your compositions, and build your ultimate visual portfolio.
          </p>
          <div className="cta-container">
            <a href="#get-started" className="btn btn-primary">
              Explore Curation
            </a>
            <a href="https://vite.dev" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Vite Docs
            </a>
          </div>
        </div>

        <section className="features-grid">
          <div className="feature-card">
            <div className="card-icon">📸</div>
            <h3>Curation Workspace</h3>
            <p>Compare, rank, and select your raw image files with fluid, high-performance interactions.</p>
          </div>
          <div className="feature-card">
            <div className="card-icon">✨</div>
            <h3>Modern Aesthetics</h3>
            <p>Built with deep dark interfaces, subtle gradients, and glassmorphism styling.</p>
          </div>
          <div className="feature-card">
            <div className="card-icon">⚡</div>
            <h3>Vite Powered</h3>
            <p>Enjoy near-instantaneous Hot Module Replacement (HMR) and optimized building blocks.</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Edit <code>src/App.jsx</code> to start building your application.</p>
        <p className="copyright">&copy; {new Date().getFullYear()} Shutter List. Designed for visual storytellers.</p>
      </footer>
    </div>
  )
}

export default App
