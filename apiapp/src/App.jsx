import { useState } from 'react'
import './App.css'
import CatGallery from './CatGallary'





function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <CatGallery />
    </div>
  )
}

export default App
