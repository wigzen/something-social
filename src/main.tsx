import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { MantineProvider } from '@mantine/core'
import DataProvider from './context/DataProvider.tsx'
import AuthProvider from './context/AuthProvider.tsx'
import PostProvider from './context/PostProvider.tsx'
import UserProvider from './context/UserProvider.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AuthProvider>
        <DataProvider>
          <PostProvider>
            <UserProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </UserProvider>
          </PostProvider>
        </DataProvider>
      </AuthProvider>
    </MantineProvider>
  </React.StrictMode>
)
