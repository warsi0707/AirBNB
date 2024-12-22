import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RecoilRoot } from 'recoil'
import AuthProvider from './context/authProvider.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <RecoilRoot>
    <div className='bg-gray-100 h-full'>
      <AuthProvider>
    <App />
    </AuthProvider>
    </div>
    </RecoilRoot>
  
  // </StrictMode>,
)
