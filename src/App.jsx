import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import { Workflow, Database, Bot, ArrowRight, Github, Linkedin, Mail, ChevronUp, ExternalLink } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const heroRef = useRef(null)
  const canvasRef = useRef(null)
  const skillsRef = useRef(null)
  const projectsRef = useRef(null)
  const lenisRef = useRef(null)
  const cursorRef = useRef(null)

  // Custom cursor
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

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

  // Constellation canvas animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const dpi = window.devicePixelRatio
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpi
    canvas.height = rect.height * dpi
    ctx.scale(dpi, dpi)

    const nodes = []
    const numNodes = 30

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      })
    }

    function animate() {
      ctx.clearRect(0, 0, rect.width, rect.height)
      
      // Update and draw nodes
      nodes.forEach((node, i) => {
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > rect.width) node.vx *= -1
        if (node.y < 0 || node.y > rect.height) node.vy *= -1

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = '#6366f1'
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j]
          const dx = node.x - other.x
          const dy = node.y - other.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.3 - dist / 500})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {}
  }, [])

  // GSAP animations
  useEffect(() => {
    // Hero text reveal
    gsap.from('.hero-text', {
      opacity: 0,
      x: -50,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power4.out',
    })

    // Skills stagger
    gsap.from('.skill-card', {
      scrollTrigger: {
        trigger: skillsRef.current,
        start: 'top 80%',
        end: 'bottom 60%',
        scrub: 1,
      },
      opacity: 0,
      y: 80,
      stagger: 0.2,
      ease: 'power3.out',
    })

    // Projects stagger
    gsap.from('.project-card', {
      scrollTrigger: {
        trigger: projectsRef.current,
        start: 'top 80%',
      },
      opacity: 0,
      y: 60,
      stagger: 0.3,
      ease: 'power3.out',
    })

    return () => ScrollTrigger.killAll()
  }, [])

  // Magnetic button effect
  const magneticRef = useRef(null)
  const handleMagneticHover = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    gsap.to(e.currentTarget, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMagneticLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    })
  }

  // Text scramble effect
  const scrambleText = (text) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    return text.split('').map((char) => {
      if (char === ' ') return char
      return chars[Math.floor(Math.random() * chars.length)]
    }).join('')
  }

  const skills = [
    {
      name: 'Power Automate',
      desc: 'Workflow automation',
      icon: Workflow,
      color: '#6366f1',
    },
    {
      name: 'Dataverse',
      desc: 'Data management',
      icon: Database,
      color: '#22d3ee',
    },
    {
      name: 'Copilot Studio',
      desc: 'AI agents & chatbots',
      icon: Bot,
      color: '#f472b6',
    },
  ]

  const projects = [
    {
      title: 'Enterprise Workflow Automation',
      desc: 'Automated approval processes reducing manual work by 80%',
      tech: ['Power Automate', 'Dataverse'],
    },
    {
      title: 'AI Customer Support Bot',
      desc: 'Intelligent chatbot handling 1000+ daily queries',
      tech: ['Copilot Studio', 'Power Automate'],
    },
    {
      title: 'Sales Data Dashboard',
      desc: 'Real-time analytics dashboard with automated reporting',
      tech: ['Dataverse', 'Power BI'],
    },
  ]

  return (
    <div className="min-h-screen bg-[#050507] text-[#f8fafc] overflow-x-hidden font-sans">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`fixed w-4 h-4 border-2 border-indigo-400 rounded-full pointer-events-none z-50 transition-all duration-200 ${isHovering ? 'scale-150 bg-indigo-400/20' : ''}`}
        style={{ left: 0, top: 0 }}
      />

      {/* Hero Section - Two Columns */}
      <section ref={heroRef} className="h-screen flex items-center px-4 md:px-12 relative">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto w-full items-center">
          {/* Left: Text */}
          <div className="space-y-6">
            <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-bold font-space-grotesk leading-tight">
              <span className="block text-[#f8fafc]">Ricardo</span>
              <span className="block bg-gradient-to-r from-indigo-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
                Alexandre
              </span>
            </h1>
            <p className="hero-text text-xl md:text-2xl text-[#64748b] font-light">
              Power Platform Specialist
            </p>
            <motion.a
              href="https://www.linkedin.com/in/ricardonevesalexandre/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-text inline-flex items-center gap-3 px-8 py-4 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              ref={magneticRef}
              onMouseMove={handleMagneticHover}
              onMouseOut={handleMagneticLeave}
            >
              Connect on LinkedIn
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>

          {/* Right: Constellation Canvas */}
          <div className="relative h-[400px] md:h-[500px]">
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{ background: 'transparent' }}
            />
          </div>
        </div>
      </section>

      {/* Skills Section - Hexagonal Grid */}
      <section ref={skillsRef} className="py-32 px-4 md:px-12 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold font-space-grotesk text-center mb-16"
          >
            Skills
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                className="skill-card group p-10 rounded-2xl bg-[#0f0f12] border border-white/10 hover:border-opacity-40 transition-all cursor-pointer"
                style={{ '--skill-color': skill.color }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <skill.icon
                  className="w-16 h-16 mb-6 transition-colors"
                  style={{ color: skill.color }}
                />
                <h3 className="text-2xl font-semibold mb-3 font-space-grotesk">
                  {skill.name}
                </h3>
                <p className="text-[#64748b]">{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="py-32 px-4 md:px-12 bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold font-space-grotesk text-center mb-16"
          >
            Work
          </motion.h2>
          <div className="space-y-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                className="project-card group p-8 rounded-2xl bg-[#0f0f12] border border-white/10 hover:border-indigo-400/40 transition-all cursor-pointer"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2 font-space-grotesk group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[#64748b] mb-4">{project.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 text-sm bg-indigo-500/10 text-indigo-400 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ExternalLink className="w-8 h-8 text-[#64748b] group-hover:text-indigo-400 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-8">
            Let's Connect
          </h2>
          <div className="flex justify-center gap-6 mb-8">
            <motion.a
              href="https://www.linkedin.com/in/ricardonevesalexandre/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[#0f0f12] rounded-xl hover:bg-indigo-500 transition-colors"
              whileHover={{ scale: 1.1, y: -5 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://github.com/madrigaltercena"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[#0f0f12] rounded-xl hover:bg-indigo-500 transition-colors"
              whileHover={{ scale: 1.1, y: -5 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Github className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="mailto:ricardo@example.com"
              className="p-4 bg-[#0f0f12] rounded-xl hover:bg-indigo-500 transition-colors"
              whileHover={{ scale: 1.1, y: -5 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Mail className="w-6 h-6" />
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-[#64748b] text-sm relative">
        <p>© {new Date().getFullYear()} Ricardo Alexandre. Built with Power Platform passion.</p>
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-4 p-2 bg-[#0f0f12] rounded-full hover:bg-indigo-500 transition-colors"
          whileHover={{ scale: 1.1 }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      </footer>
    </div>
  )
}

export default App
