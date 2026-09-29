import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    type Particle = { x: number; y: number; vx: number; vy: number; r: number; alpha: number };
    const particles: Particle[] = Array.from({ length: 90 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.1 + 0.2,
      alpha: Math.random() * 0.35 + 0.08,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(234,88,12,${p.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(234,88,12,${0.055 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative flex items-center justify-start min-h-screen overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 100% 70% at 60% 10%, rgba(79,195,247,0.06) 0%, rgba(250,250,249,0) 65%), #F2F2F0',
      }}
    >
      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.65 }} />

      {/* Large background watermark text */}
      <div
        className="absolute right-0 bottom-0 select-none pointer-events-none leading-none font-bold tracking-tighter"
        style={{
          fontSize: 'clamp(160px, 22vw, 380px)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(0,0,0,0.03)',
          fontFamily: 'Space Grotesk, "PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
          lineHeight: 0.85,
          userSelect: 'none',
        }}
      >
        设计
      </div>

      {/* Ambient glows */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%', left: '55%', width: 700, height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,195,247,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          transform: 'translate(-50%,-50%)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: '70%', left: '15%', width: 400, height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(234,88,12,0.06) 0%, transparent 70%)',
          filter: 'blur(50px)',
          transform: 'translate(-50%,-50%)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-[1700px] w-full mx-auto px-8 pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-end">
          {/* Left: headline block */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="tag">✦ &nbsp;平面设计 · 品牌设计</span>
              <span
                className="text-xs font-mono"
                style={{ color: 'rgba(24,24,24,0.2)' }}
              >
                江西九江
              </span>
            </motion.div>

            {/* Name + role */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
              className="mb-8"
            >
              <h2
                className="text-3xl md:text-4xl font-bold text-white leading-tight"
                style={{ fontFamily: 'Space Grotesk, "PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif' }}
              >
                张浩雷
              </h2>
              <p className="mt-2 text-sm font-semibold tracking-wide" style={{ color: '#EA580C' }}>
                视觉传达设计 · 本科应届 · 平面 / 品牌设计方向
              </p>
            </motion.div>


            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
              className="mt-12 flex items-center gap-4"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full text-sm font-semibold transition-all duration-500 active:scale-[0.98]"
                style={{ background: '#EA580C', color: '#0d0d0d' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 44px rgba(234,88,12,0.35)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                查看我的作品
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:translate-x-0.5 group-active:scale-95"
                  style={{ background: 'rgba(250,250,249,0.12)', transitionTimingFunction: 'var(--ease-premium)' }}
                >
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full text-sm font-semibold transition-all duration-500 active:scale-[0.98]"
                style={{ border: '1px solid rgba(0,0,0,0.14)', color: 'rgba(24,24,24,0.7)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.32)';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(24,24,24,1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.14)';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(24,24,24,0.7)';
                }}
              >
                联系我
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:translate-x-0.5 group-active:scale-95"
                  style={{ background: 'rgba(0,0,0,0.06)', transitionTimingFunction: 'var(--ease-premium)' }}
                >
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </motion.div>
          </div>

          {/* Right: description + stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="flex flex-col gap-8 pb-2"
          >
            {/* Description */}
            <p
              className="text-base leading-relaxed"
              style={{ color: 'rgba(24,24,24,0.4)', fontFamily: 'Inter, sans-serif' }}
            >
              视觉传达设计专业本科应届毕业生，擅长品牌视觉识别系统（VI）构建与定制化字体设计，
              追求精准、克制、有文化内涵的设计表达。
            </p>

            {/* Stats */}
            <div
              className="grid grid-cols-2 gap-4 pt-6"
              style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
            >
              {[
                { value: '30+', label: '文创延展' },
                { value: '20', label: '量产落地' },
                { value: '80%', label: '售出率' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span
                    className="text-2xl font-bold"
                    style={{
                      fontFamily: 'Space Grotesk',
                      background: 'linear-gradient(90deg, #EA580C, #EA580C)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {s.value}
                  </span>
                  <span className="text-xs tracking-wider uppercase" style={{ color: 'rgba(24,24,24,0.3)' }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Available badge */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl self-start"
              style={{
                background: 'rgba(234,88,12,0.06)',
                border: '1px solid rgba(234,88,12,0.18)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-pulse" />
              <span className="text-xs font-medium" style={{ color: '#EA580C' }}>
                求职中 · 一周内到岗
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(0,0,0,0.18)' }}>
          向下滚动
        </span>
        <motion.div
          className="w-px h-10 origin-top"
          style={{ background: 'linear-gradient(to bottom, rgba(234,88,12,0.5), transparent)' }}
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
