import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'

import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Services from './pages/Services'
import References from './pages/References'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import AdminDashboard from './pages/AdminDashboard'
import ManageProjects from "./pages/ManageProjects";
import ManageServices from "./pages/ManageServices";
import ManageReferences from "./pages/ManageReferences";
import ManageUsers from "./pages/ManageUsers";

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
        <Route exact path="/admin" element={<AdminDashboard />} />
        <Route exact path="/admin/projects" element={<ManageProjects />} />
        <Route exact path="/admin/services" element={<ManageServices />} />
        <Route exact path="/admin/references" element={<ManageReferences />} />
        <Route exact path="/admin/users" element={<ManageUsers />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
