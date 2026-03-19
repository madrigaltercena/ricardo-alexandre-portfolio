import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import Particles from 'react-tsparticles'
import { loadSlim } from '@tsparticles/slim'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const heroRef = useRef(null)
  const nameRef = useRef(null)
  const skillsRef = useRef(null)
  const lenisRef = useRef(null)

  // Smooth scroll setup
  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
    })

    function raf(time) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenisRef.current?.destroy()
  }, [])

  // GSAP animations
  useEffect(() => {
    // Hero text reveal
    if (nameRef.current) {
      gsap.from(nameRef.current.children, {
        opacity: 0,
        y: 100,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power4.out',
      })
    }

    // Skills cards stagger
    gsap.from('.skill-card', {
      scrollTrigger: {
        trigger: skillsRef.current,
        start: 'top 80%',
        end: 'bottom 60%',
        scrub: 1,
      },
      opacity: 0,
      y: 80,
      rotationX: -15,
      stagger: 0.2,
      ease: 'power3.out',
    })

    // Aurora gradient animation
    gsap.to('.aurora-gradient', {
      backgroundPosition: '200% 50%',
      duration: 10,
      repeat: -1,
      ease: 'none',
    })

    return () => ScrollTrigger.killAll()
  }, [])

  // 3D tilt effect on mouse move
  const handleCardHover = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
  }

  const handleCardLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
  }

  // Particle config
  const particlesInit = async (engine) => {
    await loadSlim(engine)
  }

  const particlesOptions = {
    background: { color: 'transparent' },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'bubble' },
        resize: true,
      },
      modes: {
        bubble: { distance: 200, size: 3, duration: 2, opacity: 0.3 },
      },
    },
    particles: {
      color: { value: '#6366f1' },
      links: {
        color: '#6366f1',
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: 'bounce',
        random: true,
        speed: 0.5,
        straight: false,
      },
      number: {
        density: { enable: true, area: 800 },
        value: 80,
      },
      opacity: { value: 0.3 },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  }

  return (
    <div className="min-h-screen bg-background text-text overflow-x-hidden">
      {/* Animated Aurora Background */}
      <div className="fixed inset-0 aurora-gradient opacity-30 pointer-events-none" />
      
      {/* Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="h-screen flex flex-col justify-center items-center px-4 relative z-10">
        <div ref={nameRef} className="text-center overflow-hidden">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            <span className="inline-block bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Ricardo
            </span>
            {' '}
            <span className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              Alexandre
            </span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-2xl md:text-3xl text-textMuted font-light"
          >
            Power Platform Specialist
          </motion.p>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-textMuted rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-textMuted rounded-full animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-32 px-4 md:px-12 max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="glass-card p-12 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10"
        >
          <h2 className="text-4xl font-bold text-text mb-8 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            About
          </h2>
          <p className="text-lg text-textMuted leading-relaxed">
            Power Platform experience since 2021, helping clients unblock blockers, 
            implement quick solutions, and architect Power Platform projects.
          </p>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-32 px-4 md:px-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-text mb-16 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
          >
            Skills
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Power Automate */}
            <motion.div 
              className="skill-card glass-card p-10 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-indigo-400/40 transition-all cursor-pointer"
              onMouseMove={handleCardHover}
              onMouseLeave={handleCardLeave}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-5xl mb-6 text-indigo-400">⚡</div>
              <h3 className="text-2xl font-semibold text-text mb-3">Power Automate</h3>
              <p className="text-textMuted">Workflow automation</p>
            </motion.div>

            {/* Dataverse */}
            <motion.div 
              className="skill-card glass-card p-10 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all cursor-pointer"
              onMouseMove={handleCardHover}
              onMouseLeave={handleCardLeave}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-5xl mb-6 text-cyan-400">🗄️</div>
              <h3 className="text-2xl font-semibold text-text mb-3">Dataverse</h3>
              <p className="text-textMuted">Data management</p>
            </motion.div>

            {/* Copilot Studio */}
            <motion.div 
              className="skill-card glass-card p-10 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-purple-400/40 transition-all cursor-pointer"
              onMouseMove={handleCardHover}
              onMouseLeave={handleCardLeave}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-5xl mb-6 text-purple-400">🤖</div>
              <h3 className="text-2xl font-semibold text-text mb-3">Copilot Studio</h3>
              <p className="text-textMuted">AI agents & chatbots</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-text mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Contact
          </h2>
          <motion.a 
            href="https://www.linkedin.com/in/ricardonevesalexandre/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-5 bg-gradient-to-r from-indigo-500 to-cyan-500 text-text font-semibold rounded-xl hover:from-indigo-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-indigo-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Connect on LinkedIn
          </motion.a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-textMuted text-sm relative z-10">
        <p>© {new Date().getFullYear()} Ricardo Alexandre</p>
      </footer>
    </div>
  )
}

export default App
