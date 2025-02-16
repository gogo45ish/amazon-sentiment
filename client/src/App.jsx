import { useState } from 'react'
import './App.css'
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className='flex flex-col min-h-screen'>
      <ToastContainer />
      <main className='flex-grow'>
        <Navbar />
        <Hero />
      </main>
      <Footer />

    </div>
  )
}

export default App
