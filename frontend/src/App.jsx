import React from 'react'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Success from './pages/PaymentSuccess'

export default function App(){
  const [route, setRoute] = React.useState('home')
  React.useEffect(()=>{
    const h = (e)=>{ setRoute(window.location.hash.replace('#','') || 'home') }
    window.addEventListener('hashchange', h)
    h()
    return ()=> window.removeEventListener('hashchange', h)
  },[])
  return (
    <div className="app">
      <nav className="nav">
        <a href="#home">Home</a>
        <a href="#dashboard">Dashboard</a>
        <a href="#success">Payment</a>
      </nav>
      <main className="main">
        {route==='home' && <Home />}
        {route==='dashboard' && <Dashboard />}
        {route==='success' && <Success />}
      </main>
    </div>
  )
}
