import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: '关于', href: '#about' },
  { label: '项目', href: '#projects' },
  { label: '技能', href: '#skills' },
  { label: '联系', href: '#contact' },
];

const ease = [0.32, 0.72, 0, 1] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6"
      >
        <div className="mx-auto max-w-6xl mt-4 sm:mt-5">
          <div
            className="flex items-center justify-between rounded-full pl-4 pr-2 py-2 transition-all duration-700"
            style={{
              background: scrolled ? 'rgba(5,5,5,0.72)' : 'rgba(5,5,5,0.42)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: scrolled ? '0 16px 50px rgba(0,0,0,0.5)' : '0 8px 30px rgba(0,0,0,0.25)',
            }}
          >
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-2.5 pl-2 group">
              <div className="w-8 h-8 rounded-[10px] animated-border p-[1.5px]">
                <div className="w-full h-full rounded-[9px] flex items-center justify-center" style={{ background: '#050505' }}>
                  <span className="text-[11px] font-bold text-white tracking-wide">ZH</span>
                </div>
              </div>
              <span className="hidden sm:block text-sm font-semibold tracking-[0.18em] text-white/80 group-hover:text-white transition-colors duration-500">
                作品集
              </span>
            </a>

            {/* Desktop links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative text-[13px] font-medium text-white/50 hover:text-white transition-colors duration-500 py-1 group"
                >
                  {link.label}
                  <span
                    className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    style={{ background: 'linear-gradient(90deg, #a8ff78, transparent)', transformOrigin: 'left' }}
                  />
                </a>
              ))}
            </nav>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-2">
              <a
                href="mailto:zhang07221207@163.com"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-500 active:scale-[0.97]"
                style={{ background: '#a8ff78', color: '#050505' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(168,255,120,0.35)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = 'none')}
              >
                求职中 · 欢迎联系
              </a>

              {/* Hamburger (morph to X) */}
              <button
                onClick={() => setOpen(!open)}
                aria-label="菜单"
                className="md:hidden relative w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500"
                style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}
              >
                <span className="relative block w-4 h-3.5">
                  <span
                    className="absolute left-0 top-0 w-4 h-px bg-white origin-center transition-transform duration-500"
                    style={{ transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none', transitionTimingFunction: 'var(--ease-premium)' }}
                  />
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-px bg-white transition-opacity duration-300"
                    style={{ opacity: open ? 0 : 1 }}
                  />
                  <span
                    className="absolute left-0 bottom-0 w-4 h-px bg-white origin-center transition-transform duration-500"
                    style={{ transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none', transitionTimingFunction: 'var(--ease-premium)' }}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="fixed inset-0 z-40 md:hidden flex flex-col justify-center px-10"
            style={{ background: 'rgba(5,5,5,0.92)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)' }}
            onClick={() => setOpen(false)}
          >
            <div className="space-y-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.08 * i + 0.05, ease }}
                  onClick={() => setOpen(false)}
                  className="block text-[42px] font-bold text-white/90 py-2 leading-tight"
                  style={{ fontFamily: 'Space Grotesk, "Noto Sans SC", "PingFang SC", sans-serif' }}
                >
                  <span className="text-xs align-top mr-3 font-mono" style={{ color: '#a8ff78' }}>
                    0{i + 1}
                  </span>
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="mailto:zhang07221207@163.com"
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.08 * navLinks.length + 0.1, ease }}
                onClick={() => setOpen(false)}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-500 active:scale-[0.97]"
                style={{ background: '#a8ff78', color: '#050505' }}
              >
                求职中 · 欢迎联系
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}