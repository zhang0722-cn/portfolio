import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const links = [
  { label: '关于', href: '#about' },
  { label: '项目', href: '#projects' },
  { label: '技能', href: '#skills' },
  { label: '联系', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="section-shell">
          <div className="flex h-[72px] items-center justify-between border-b" style={{ borderColor: scrolled ? 'var(--line)' : 'transparent', background: scrolled ? 'rgba(247,246,242,.88)' : 'transparent', backdropFilter: scrolled ? 'blur(18px)' : 'none' }}>
            <a href="#hero" className="display text-sm font-bold tracking-[.08em]">张浩雷 / ZHANG HAOLEI</a>
            <nav className="hidden items-center gap-8 md:flex">
              {links.map((link) => <a key={link.label} href={link.href} className="text-xs font-medium tracking-[.12em]" style={{ color: 'var(--muted)' }}>{link.label}</a>)}
            </nav>
            <div className="hidden items-center gap-5 md:flex">
              <span className="text-xs" style={{ color: 'var(--muted)' }}>求职中</span>
              <a href="resume-zhanghaolei.pdf" download="张浩雷的简历.pdf" className="rounded-full px-4 py-2 text-xs font-semibold" style={{ background: 'var(--accent)', color: '#fff' }}>下载简历</a>
            </div>
            <button className="md:hidden" aria-label="菜单" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}><span className="display text-xl">{open ? '×' : '菜单'}</span></button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && <motion.div id="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 flex flex-col justify-end gap-3 px-6 pb-16 md:hidden" style={{ background: 'rgba(247,246,242,.96)' }}>
          {links.map((link) => <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="display border-b py-4 text-4xl font-bold" style={{ borderColor: 'var(--line)' }}>{link.label}</a>)}
          <a href="resume-zhanghaolei.pdf" download="张浩雷的简历.pdf" className="mt-5 rounded-full px-5 py-3 text-center font-semibold" style={{ background: 'var(--accent)', color: '#fff' }}>下载简历</a>
        </motion.div>}
      </AnimatePresence>
    </>
  );
}
