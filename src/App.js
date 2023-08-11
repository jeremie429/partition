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

function App() {
  return (
    <Router>
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
    </Router>
  )
}

export default App
