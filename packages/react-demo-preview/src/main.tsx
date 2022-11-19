import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = createRoot(document.getElementById('root')!)

container.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
