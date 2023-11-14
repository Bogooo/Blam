import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App'
import './index.css'

const root = document.getElementById('root')
const element = ReactDom.createRoot(root)
element.render(<App/>)
