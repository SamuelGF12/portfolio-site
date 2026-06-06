import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'

import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Services from './pages/Services'
import References from './pages/References'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/projects" element={<Projects />} />
        <Route exact path="/services" element={<Services />} />
        <Route exact path="/references" element={<References />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
