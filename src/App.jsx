import { motion } from 'framer-motion'

function App() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center px-4">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-text mb-4">
            Ricardo Alexandre
          </h1>
          <p className="text-2xl md:text-3xl text-primary font-light">
            Power Platform Specialist
          </p>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 md:px-12 max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-bold text-text mb-8">About</h2>
          <p className="text-lg text-textMuted leading-relaxed">
            Power Platform experience since 2021, helping clients unblock blockers, 
            implement quick solutions, and architect Power Platform projects.
          </p>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-4 md:px-12 bg-background/50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-text mb-12 text-center">Skills</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Power Automate */}
            <motion.div 
              variants={fadeInUp}
              className="p-8 border border-primary/20 rounded-xl bg-background/50 hover:border-primary/40 transition-colors"
            >
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-text mb-2">Power Automate</h3>
              <p className="text-textMuted">Workflow automation</p>
            </motion.div>

            {/* Dataverse */}
            <motion.div 
              variants={fadeInUp}
              className="p-8 border border-secondary/20 rounded-xl bg-background/50 hover:border-secondary/40 transition-colors"
            >
              <div className="text-4xl mb-4">🗄️</div>
              <h3 className="text-xl font-semibold text-text mb-2">Dataverse</h3>
              <p className="text-textMuted">Data management</p>
            </motion.div>

            {/* Copilot Studio */}
            <motion.div 
              variants={fadeInUp}
              className="p-8 border border-primary/20 rounded-xl bg-background/50 hover:border-primary/40 transition-colors"
            >
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-text mb-2">Copilot Studio</h3>
              <p className="text-textMuted">AI agents & chatbots</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-4 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-bold text-text mb-8">Contact</h2>
          <a 
            href="https://www.linkedin.com/in/ricardonevesalexandre/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-primary text-text font-semibold rounded-lg hover:bg-primary/80 transition-colors"
          >
            Connect on LinkedIn
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-textMuted text-sm">
        <p>© {new Date().getFullYear()} Ricardo Alexandre</p>
      </footer>
    </div>
  )
}

export default App
