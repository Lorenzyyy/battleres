// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'
// import Sinno from './sinnoh.tsx'
// import tambay from './tambay.tsx'


// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <s/>
//   </StrictMode>,
// )

import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);