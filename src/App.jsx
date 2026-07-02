import { useState, useRef } from 'react'

function App() {
  const [itemName, setItemName] = useState('')
  const [referencePhoto, setReferencePhoto] = useState(null)
  const [referencePhotoName, setReferencePhotoName] = useState('')
  const [selectedBg, setSelectedBg] = useState(0)
  const [selectedPlate, setSelectedPlate] = useState(0)
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const fileInputRef = useRef(null)

  // Color Swatches for Background Selection
  const backgrounds = [
    { id: 0, name: 'Dark Slate', value: '#1e293b' },
    { id: 1, name: 'Warm Walnut', value: '#5c3d24' },
    { id: 2, name: 'White Marble', value: '#f1f5f9' },
    { id: 3, name: 'Emerald Green', value: '#0f5132' },
    { id: 4, name: 'Terracotta', value: '#b85c38' },
  ]

  // Plate Placeholders (simple shapes rendered as interactive graphics)
  const plates = [
    { 
      id: 0, 
      name: 'Classic White Circle', 
      render: () => (
        <svg viewBox="0 0 100 100" className="plate-svg">
          <circle cx="50" cy="50" r="44" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
          <circle cx="50" cy="50" r="34" fill="#fafafa" stroke="#cbd5e1" strokeWidth="1" />
        </svg>
      ) 
    },
    { 
      id: 1, 
      name: 'Matte Square Slate', 
      render: () => (
        <svg viewBox="0 0 100 100" className="plate-svg">
          <rect x="8" y="8" width="84" height="84" rx="8" fill="#334155" stroke="#1e293b" strokeWidth="2" />
          <rect x="18" y="18" width="64" height="64" rx="4" fill="#475569" stroke="#1e293b" strokeWidth="1" />
        </svg>
      ) 
    },
    { 
      id: 2, 
      name: 'Vintage Gold Rim', 
      render: () => (
        <svg viewBox="0 0 100 100" className="plate-svg">
          <circle cx="50" cy="50" r="44" fill="#fffdf5" stroke="#d97706" strokeWidth="3" />
          <circle cx="50" cy="50" r="36" fill="#fffdf5" stroke="#f59e0b" strokeWidth="1" />
        </svg>
      ) 
    },
    { 
      id: 3, 
      name: 'Obsidian Rimmed', 
      render: () => (
        <svg viewBox="0 0 100 100" className="plate-svg">
          <circle cx="50" cy="50" r="44" fill="#18181b" stroke="#27272a" strokeWidth="2" />
          <circle cx="50" cy="50" r="32" fill="#27272a" stroke="#09090b" strokeWidth="1.5" />
        </svg>
      ) 
    },
  ]

  // File drag-and-drop handlers
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.')
      return
    }
    setReferencePhotoName(file.name)
    const reader = new FileReader()
    reader.onload = (event) => {
      setReferencePhoto(event.target.result)
    }
    reader.readAsDataURL(file)
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  const removePhoto = (e) => {
    e.stopPropagation()
    setReferencePhoto(null)
    setReferencePhotoName('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // Submit/Generate Handler
  const handleGenerate = (e) => {
    e.preventDefault()
    setIsGenerating(true)
    setShowPreview(false)
    
    setTimeout(() => {
      setIsGenerating(false)
      setShowPreview(true)
    }, 1000)
  }

  return (
    <div className="app-container">
      {/* Background glass glows */}
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
            Food Photo Studio
          </span>
        </nav>
      </header>

      <main className="main-content">
        <div className="studio-intro">
          <span className="shutter-badge">AI Food Photography</span>
          <h1 className="studio-title">Food Photo Generator</h1>
          <p className="studio-subtitle">
            Configure your ingredients, choose backgrounds, plates, and generate high-fidelity food imagery.
          </p>
        </div>

        <div className="studio-layout">
          {/* Left panel: Controls form */}
          <form className="studio-form" onSubmit={handleGenerate}>
            
            {/* Section 1: Reference food photo */}
            <div className="form-group">
              <label className="section-label">1. Reference food photo</label>
              <div 
                className={`upload-zone ${dragActive ? 'active' : ''} ${referencePhoto ? 'has-file' : ''}`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={triggerFileInput}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden-file-input" 
                  accept="image/*"
                  onChange={handleFileChange} 
                />
                
                {referencePhoto ? (
                  <div className="upload-preview">
                    <img src={referencePhoto} alt="Reference Preview" className="preview-thumbnail" />
                    <div className="file-info">
                      <span className="file-name">{referencePhotoName}</span>
                      <button type="button" className="btn-remove" onClick={removePhoto}>Remove</button>
                    </div>
                  </div>
                ) : (
                  <div className="upload-prompt">
                    <div className="upload-icon">📸</div>
                    <span className="upload-title">Drag & drop your reference photo</span>
                    <span className="upload-subtitle">or click to browse from files</span>
                  </div>
                )}
              </div>
            </div>

            {/* Section 2: Item name */}
            <div className="form-group">
              <label htmlFor="item-name" className="section-label">2. Item name</label>
              <input 
                id="item-name"
                type="text" 
                className="text-input" 
                placeholder="e.g. Margherita Pizza, Chocolate Soufflé"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
              />
            </div>

            {/* Section 3: Background swatches */}
            <div className="form-group">
              <label className="section-label">3. Background</label>
              <div className="swatches-row">
                {backgrounds.map((bg) => (
                  <button
                    key={bg.id}
                    type="button"
                    className={`swatch-btn ${selectedBg === bg.id ? 'selected' : ''}`}
                    onClick={() => setSelectedBg(bg.id)}
                    aria-label={`Select background ${bg.name}`}
                  >
                    <div className="swatch-color" style={{ backgroundColor: bg.value }}></div>
                    <span className="swatch-name">{bg.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Section 4: Plate shape selectors */}
            <div className="form-group">
              <label className="section-label">4. Plate</label>
              <div className="plates-row">
                {plates.map((plate) => (
                  <button
                    key={plate.id}
                    type="button"
                    className={`plate-btn ${selectedPlate === plate.id ? 'selected' : ''}`}
                    onClick={() => setSelectedPlate(plate.id)}
                    aria-label={`Select plate style ${plate.name}`}
                  >
                    <div className="plate-shape-container">
                      {plate.render()}
                    </div>
                    <span className="plate-name">{plate.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Section 5: Prompt (optional) */}
            <div className="form-group">
              <label htmlFor="styling-instructions" className="section-label">5. Prompt (optional)</label>
              <textarea 
                id="styling-instructions"
                className="textarea-input" 
                placeholder="Add extra styling details e.g. 'scattered basil leaves, atmospheric rim lighting, steam rising, high contrast'"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
              />
            </div>

            {/* Section 6: Generate button */}
            <button 
              type="submit" 
              className={`btn-generate ${isGenerating ? 'loading' : ''}`}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <span className="mini-spinner"></span>
                  Generating...
                </>
              ) : (
                'Generate Photo'
              )}
            </button>
          </form>

          {/* Right panel: Live Preview & Result Section */}
          <div className="studio-preview-section">
            <h2 className="preview-section-title">7. Studio Preview</h2>
            <div className="preview-container">
              {isGenerating && (
                <div className="generating-overlay">
                  <div className="spinner"></div>
                  <p className="generating-text">Baking creative prompt...</p>
                </div>
              )}

              {showPreview ? (
                <div className="generated-result-box">
                  <div className="generated-placeholder-graphic">
                    <span className="graphic-icon">🍽️</span>
                    <span className="graphic-label">Generated image will appear here</span>
                  </div>
                  <div className="result-metadata">
                    <h4>{itemName || 'Untitled Dish'}</h4>
                    <p>Background: {backgrounds[selectedBg].name} | Plate: {plates[selectedPlate].name}</p>
                    {prompt && <p className="result-prompt-snippet">"{prompt}"</p>}
                  </div>
                </div>
              ) : (
                !isGenerating && (
                  <div className="empty-preview-state">
                    <div className="empty-icon">🖼️</div>
                    <p>Fill out the configuration on the left and click **Generate** to preview the food photography.</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Edit <code>src/App.jsx</code> to enhance generator features or configure real API endpoints.</p>
        <p className="copyright">&copy; {new Date().getFullYear()} Shutter List Studio. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
