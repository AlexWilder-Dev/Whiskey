import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { NowProvider } from './lib/now';
import { Top, BottomNav } from './components/Nav';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Drinks } from './pages/Drinks';
import { Whiskey } from './pages/Whiskey';
import { Music } from './pages/Music';
import { Visit } from './pages/Visit';

const titles: Record<string, string> = {
  '/': "The Whiskey Tumbler | Brixton's Irish cocktail bar, 401 Coldharbour Lane",
  '/drinks': 'House menu | The Whiskey Tumbler, Brixton',
  '/whiskey': 'The whiskey list | The Whiskey Tumbler, Brixton',
  '/music': 'Blues, trad and GAA | The Whiskey Tumbler, Brixton',
  '/find-us': 'Find us | The Whiskey Tumbler, 401 Coldharbour Lane',
};

export function App() {
  const location = useLocation();

  useEffect(() => {
    document.title = titles[location.pathname] ?? titles['/'];
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <NowProvider>
        <a className="skip" href="#content" onClick={(e) => { e.preventDefault(); document.getElementById('content')?.focus(); }}>
          Skip to content
        </a>
        <Top />
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            id="content"
            tabIndex={-1}
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ outline: 'none' }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/drinks" element={<Drinks />} />
              <Route path="/whiskey" element={<Whiskey />} />
              <Route path="/music" element={<Music />} />
              <Route path="/find-us" element={<Visit />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
          </motion.main>
        </AnimatePresence>
        <BottomNav />
      </NowProvider>
    </MotionConfig>
  );
}
