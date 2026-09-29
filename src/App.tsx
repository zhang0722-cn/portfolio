import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ProjectDetail from './components/ProjectDetail';

type Route = { page: 'home' } | { page: 'project'; id: string | null };

function getRoute(): Route {
  const match = window.location.hash.match(/^#\/project\/([^/]+)/);
  return match ? { page: 'project', id: match[1] } : { page: 'home' };
}

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function App() {
  const [route, setRoute] = useState<Route>(getRoute);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute());
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash.startsWith('project/')) window.scrollTo(0, 0);
      else if (hash) setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' }), 60);
      else window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <Navbar />
      {route.page === 'project' ? <ProjectDetail id={route.id} /> : (
        <main><Hero /><About /><Projects /><Skills /><Contact /></main>
      )}
    </div>
  );
}
