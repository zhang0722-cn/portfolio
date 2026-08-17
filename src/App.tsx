import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ProjectDetail from './components/ProjectDetail';

type Route = { page: 'home' } | { page: 'project'; id: string | null };

function getRoute(): Route {
  const match = window.location.hash.match(/^#\/project\/([^/]+)/);
  if (match) return { page: 'project', id: match[1] };
  return { page: 'home' };
}

export default function App() {
  const [route, setRoute] = useState<Route>(getRoute);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute());
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash.startsWith('project/')) {
        window.scrollTo(0, 0);
      } else if (hash) {
        // 等首页各区块渲染后再平滑滚动到对应锚点
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
      } else {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const shell = (
    <div className="grain" style={{ background: '#050505', minHeight: '100vh' }}>
      <Navbar />
      {route.page === 'project' ? (
        <ProjectDetail id={route.id} />
      ) : (
        <main>
          <Hero />
          <Ticker />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
      )}
    </div>
  );

  return shell;
}