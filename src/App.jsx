import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import GalleryIndexPage from './pages/GalleryIndexPage'
import GalleryDetailPage from './pages/GalleryDetailPage'
import TermsPage from './pages/TermsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryIndexPage />} />
          <Route path="/gallery/:slug" element={<GalleryDetailPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
