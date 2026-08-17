import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { label: '关于', href: '#about' },
  { label: '项目', href: '#projects' },
  { label: '技能', href: '#skills' },
  { label: '联系', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className="transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(8, 10, 15, 0.88)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}
      >
        <div className="mx-auto px-8 max-w-[1700px]">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-md animated-border p-[1.5px]">
                <div
                  className="w-full h-full rounded-md flex items-center justify-center"
                  style={{ background: '#080a0f' }}
                >
                  <span className="text-[10px] font-bold text-white">ZH</span>
                </div>
              </div>
              <span className="text-sm font-semibold tracking-widest text-white transition-opacity group-hover:opacity-100 opacity-80">
                作品集
              </span>
            </a>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: 'rgba(240,240,240,0.55)' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = 'rgba(240,240,240,1)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'rgba(240,240,240,0.55)')
                  }
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <a
              href="mailto:zhang07221207@163.com"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300"
              style={{
                border: '1px solid rgba(168,255,120,0.35)',
                color: '#a8ff78',
                background: 'rgba(168,255,120,0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(168,255,120,0.14)';
                e.currentTarget.style.borderColor = 'rgba(168,255,120,0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(168,255,120,0.06)';
                e.currentTarget.style.borderColor = 'rgba(168,255,120,0.35)';
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#a8ff78] animate-pulse" />
              求职中 · 欢迎联系
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
}