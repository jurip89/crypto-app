import React from 'react'
import { NavBar,Footer, Loader, Services, Transactions, Welcome } from './components'

import './App.css'

function App() {
  

  return (
    <div className="min-h-screen">
       <div className="gradient-bg-welcome">
      <NavBar/>
      <Welcome/>
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  )
}

export default App
