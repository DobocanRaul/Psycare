import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LoginPage from './loginPage/LoginPage.tsx'
import RegisterPage from './registerPage/registerPage.tsx'
import NotFoundPage from './notFoundPage/notFoundPage.tsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

document.title="Psycare"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    
  </StrictMode>,
)
