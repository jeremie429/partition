import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
//import Partition from './pages/Partition'
import WarGame from './pages/WarGame'
import './App.scss'
import Contact from './pages/Contact'
import Layout from './components/Layout'
import Project from './pages/Project'

import Partition2 from './pages/Partition/index'
import Partition from './pages/Partition'
import Shorts from './pages/Partition/Shorts'
import Checkout from './components/Checkout'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { CLIENT_ID } from './tools/paypalConfig'

function App() {
  return (
    <Router>
      {/* <PayPalScriptProvider options={{ 'client-id': CLIENT_ID }}> */}
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          exact
          path="partition"
          element={
            <Layout>
              <Partition />
            </Layout>
          }
        />
        <Route exact path="shorts" element={<Shorts />} />
        <Route
          exact
          path="wargame"
          element={
            <Layout>
              <WarGame />
            </Layout>
          }
        />

        <Route
          axact
          path="about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route axact path="buy/:id" element={<Checkout />} />
        <Route
          exact
          path="contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
        <Route
          exact
          path="projects"
          element={
            <Layout>
              <Project />
            </Layout>
          }
        />
      </Routes>
      {/* </PayPalScriptProvider> */}
    </Router>
  )
}

export default App
