import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import GetInvolved from './pages/GetInvolved'
import Mission from './pages/Mission'
import Gallery from './pages/Gallery'
import Team from './pages/Team'

const SITE_URL = 'https://www.ecomirim.eco.br'

const PAGE_META = {
  '/': {
    pt: { title: 'EcoMirim — Educação ambiental e reciclagem nas escolas de São Paulo', description: 'Programas práticos de reciclagem e oficinas educativas para crianças do ensino fundamental em São Paulo. Contribuindo para um futuro mais sustentável.' },
    en: { title: 'EcoMirim — Environmental education and recycling in São Paulo schools', description: 'Practical recycling programs and educational workshops for elementary school children in São Paulo, building a more sustainable future.' },
  },
  '/nossa-missao': {
    pt: { title: 'Nossa Missão — EcoMirim', description: 'Conheça a missão, a metodologia e os valores do EcoMirim, projeto de educação ambiental nas escolas de São Paulo.' },
    en: { title: 'Our Mission — EcoMirim', description: 'Learn about the mission, methodology and values of EcoMirim, an environmental education project in São Paulo schools.' },
  },
  '/time': {
    pt: { title: 'Nosso Time — EcoMirim', description: 'Conheça o time do EcoMirim: Pedro Amaro, Eduardo Vilela, Arthur Piatetzky e Gabriel Bendenoun.' },
    en: { title: 'Our Team — EcoMirim', description: 'Meet the EcoMirim team: Pedro Amaro, Eduardo Vilela, Arthur Piatetzky and Gabriel Bendenoun.' },
  },
  '/se-envolver': {
    pt: { title: 'Se Envolva — EcoMirim', description: 'Descubra como participar do EcoMirim e apoiar a educação ambiental nas escolas de São Paulo.' },
    en: { title: 'Get Involved — EcoMirim', description: 'Find out how to take part in EcoMirim and support environmental education in São Paulo schools.' },
  },
  '/galeria': {
    pt: { title: 'Atividades — EcoMirim', description: 'Fotos das oficinas e atividades de educação ambiental do EcoMirim nas escolas.' },
    en: { title: 'Activities — EcoMirim', description: 'Photos of EcoMirim environmental education workshops and activities in schools.' },
  },
}

function setMeta(selector, attr, key, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute(selector.startsWith('link') ? 'href' : 'content', value)
}

function PageMeta() {
  const { pathname } = useLocation()
  const { language } = useLanguage()

  useEffect(() => {
    const page = PAGE_META[pathname] || PAGE_META['/']
    const meta = page[language] || page.pt
    document.title = meta.title
    setMeta('meta[name="description"]', 'name', 'description', meta.description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', meta.title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', meta.description)
    setMeta('link[rel="canonical"]', 'rel', 'canonical', SITE_URL + (PAGE_META[pathname] ? pathname : '/'))
  }, [pathname, language])

  return null
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <PageMeta />
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
