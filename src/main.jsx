import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './router/router.jsx';
import './i18n/i18n';
import AuthProvider from './providers/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <div className='font-sans'>
    <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </StrictMode>
  </div>
)
