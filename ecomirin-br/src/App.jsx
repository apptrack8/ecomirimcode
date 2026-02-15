import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import GetInvolved from './pages/GetInvolved'
import Mission from './pages/Mission'
import Gallery from './pages/Gallery'
import Team from './pages/Team'

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/se-envolver" element={<GetInvolved />} />
              <Route path="/nossa-missao" element={<Mission />} />
              <Route path="/galeria" element={<Gallery />} />
              <Route path="/time" element={<Team />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App
