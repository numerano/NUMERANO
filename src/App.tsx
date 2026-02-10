import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Activities from './pages/Activities';
import Faculty from './pages/Faculty';
import Members from './pages/Members';
import Feedback from './pages/Feedback';
import BrainBuffPage from './pages/BrainBuffPage';
import { motion, useScroll, useSpring } from 'framer-motion';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-numerano-accent origin-left z-50"
        style={{ scaleX }}
      />

      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <>
              <section id="home"><Home /></section>
              <section id="activities"><Activities /></section>
              <section id="faculty"><Faculty /></section>
              <section id="members"><Members /></section>
              <section id="feedback"><Feedback /></section>
            </>
          } />
          <Route path="/brainbuff" element={<BrainBuffPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
