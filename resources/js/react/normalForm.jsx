import React from 'react'
import ReactDOM from 'react-dom/client'
import NormalForm from './pages/NormalForm'

if (document.getElementById('react-root')) {
  ReactDOM.createRoot(document.getElementById('react-root')).render(<NormalForm />)
}
