'use client';

import React from 'react';
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import Contacts from './components/sections/Contacts'

export default function Home() {
  return (
    <div>
      <Navbar />
      
      <div id="hero">
        <Hero />
      </div>

      <div id="projects" className="bg-gray-900 pt-16">
        <Projects />
      </div>

      <div id="contact" className="bg-gray-800 pt-16">
        <Contacts />
      </div>
    </div>
  )
}
