import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' as const },
};

export default function ProjectDetail({ id }: { id: string | null }) {
  const project = projects.find((p) => String(p.id) === id);
  const index = project ? projects.findIndex((p) => p.id === project.id) : -1;
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index >= 0 && index < projects.length - 1 ? projects[index + 1] : null;

  const [lightbox, setLightbox] = useState<{ list: string[]; index: number } | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowLeft' && lightbox.index > 0) setLightbox({ ...lightbox, index: lightbox.index - 1 });
      if (e.key === 'ArrowRight' && lightbox.index < lightbox.list.length - 1) setLightbox({ ...lightbox, index: lightbox.index + 1 });
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-8" style={{ background: '#F2F2F0' }}>
        <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          项目不存在
        </h1>
        <p style={{ color: 'rgba(24,24,24,0.45)' }}>你访问的项目详情页不存在或已被移除。</p>
        <a
          href="#projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
          style={{ background: '#EA580C', color: '#0d0d0d' }}
        >
          ← 返回作品集
        </a>
      </div>
    );
  }

  return (
    <div className="pt-24" style={{ background: '#F2F2F0' }}>
      <div className="max-w-[1200px] mx-auto px-8">
        {/* Back */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 text-sm transition-colors duration-200 mb-10"
            style={{ color: 'rgba(24,24,24,0.4)' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(24,24,24,0.9)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(24,24,24,0.4)')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            返回作品集
          </a>
        </motion.div>

        {/* Hero */}
        <motion.div {...fadeUp} className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: 'rgba(250,250,249,0.7)',
                border: `1px solid ${project.accent}40`,
                color: project.accent,
              }}
            >
              {project.category}
            </span>
            <span
              className="text-xs font-mono px-3 py-1 rounded-full"
              style={{
                background: 'rgba(0,0,0,0.04)',
                border: '1px solid rgba(0,0,0,0.1)',
                color: 'rgba(24,24,24,0.6)',
              }}
            >
              {project.year}
            </span>
            {project.status && (
              <span
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  background: `${project.accent}10`,
                  border: `1px solid ${project.accent}25`,
                  color: project.accent,
                }}
              >
                {project.status}
              </span>
            )}
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-8"
            style={{ fontFamily: 'Space Grotesk, "PingFang SC", "Microsoft YaHei", sans-serif' }}
          >
            {project.title}
          </h1>

          {/* Meta */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
            style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
          >
            {[
              { label: '项目角色', value: project.role },
              { label: '项目周期', value: project.period ?? '—' },
              { label: '合作单位', value: project.client ?? '—' },
              { label: '项目状态', value: project.status ?? '—' },
            ].map((m) => (
              <div key={m.label} className="pt-5">
                <p className="text-xs tracking-wider mb-1.5" style={{ color: 'rgba(24,24,24,0.3)' }}>
                  {m.label}
                </p>
                <p className="text-sm font-medium leading-snug" style={{ color: 'rgba(24,24,24,0.75)' }}>
                  {m.value}
                </p>
              </div>
            ))}
          </div>

          {/* Hero image */}
          <div className="relative rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
            <img src={project.img} alt={project.title} className="w-full object-cover" style={{ aspectRatio: project.coverRatio ?? '16/9', filter: 'saturate(0.9) contrast(1.05)' }} />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(250,250,249,0.65) 0%, transparent 50%)' }}
            />
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {project.stats.map((s) => (
            <div
              key={s.label}
              className="p-6 rounded-2xl"
              style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.07)' }}
            >
              <div
                className="text-3xl font-bold mb-2"
                style={{ fontFamily: 'Space Grotesk', color: project.accent }}
              >
                {s.value}
              </div>
              <div className="text-sm font-semibold text-white mb-1">{s.label}</div>
              {s.desc && <div className="text-xs leading-relaxed" style={{ color: 'rgba(24,24,24,0.35)' }}>{s.desc}</div>}
            </div>
          ))}
        </motion.div>

        {/* Overview */}
        <motion.section {...fadeUp} transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }} className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Space Grotesk, "PingFang SC", "Microsoft YaHei", sans-serif' }}>
            项目简介
          </h2>
          <p className="text-lg leading-relaxed mb-8" style={{ color: 'rgba(24,24,24,0.6)' }}>
            {project.overview}
          </p>
          <div className="space-y-4">
            {project.background.map((b, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: project.accent }}
                />
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(24,24,24,0.45)' }}>
                  {b}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Gallery */}
        <motion.section {...fadeUp} transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }} className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: 'Space Grotesk, "PingFang SC", "Microsoft YaHei", sans-serif' }}>
            {project.contentImages ? '项目内容' : '项目图集'}
          </h2>
          {project.contentImages ? (
            <>
              <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(24,24,24,0.45)' }}>
                以下为「品牌内容」中龙虎山文旅品牌项目的实际作品展示。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.contentImages.map((g, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden group cursor-zoom-in"
                    style={{ border: '1px solid rgba(0,0,0,0.08)' }}
                    onClick={() => setLightbox({ list: project.contentImages!, index: i })}
                    role="button"
                    aria-label={`放大查看 ${project.title} 项目内容 ${i + 1}`}
                  >
                    <img
                      src={g}
                      alt={`${project.title} 项目内容 ${i + 1}`}
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ aspectRatio: '16/9', filter: 'saturate(0.9)' }}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.gallery.map((g, i) => (
                <div key={i} className="rounded-2xl overflow-hidden group" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
                  <img
                    src={g}
                    alt={`${project.title} 图 ${i + 1}`}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ aspectRatio: '4/3', filter: 'saturate(0.9)' }}
                  />
                </div>
              ))}
            </div>
          )}
        </motion.section>

        {/* Responsibilities */}
        <motion.section {...fadeUp} transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }} className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-10" style={{ fontFamily: 'Space Grotesk, "PingFang SC", "Microsoft YaHei", sans-serif' }}>
            工作内容与职责
          </h2>
          <div className="space-y-6">
            {project.responsibilities.map((r, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl"
                style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.07)' }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: `${project.accent}12`, border: `1px solid ${project.accent}25`, color: project.accent }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Space Grotesk, "PingFang SC", "Microsoft YaHei", sans-serif' }}>
                    {r.title}
                  </h3>
                </div>
                <ul className="space-y-2.5 pl-1">
                  {r.items.map((item, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed" style={{ color: 'rgba(24,24,24,0.55)' }}>
                      <span style={{ color: project.accent }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Results */}
        <motion.section {...fadeUp} transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }} className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: 'Space Grotesk, "PingFang SC", "Microsoft YaHei", sans-serif' }}>
            项目成果
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.results.map((r, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl flex flex-col gap-3"
                style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.07)' }}
              >
                <span className="text-xs font-semibold" style={{ color: project.accent }}>
                  成果 {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(24,24,24,0.55)' }}>
                  {r}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 项目成果展示 */}
        {project.resultsImages && (
          <motion.section {...fadeUp} transition={{ duration: 0.8, delay: 0.32, ease: 'easeOut' }} className="mb-20">
            <h2 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: 'Space Grotesk, "PingFang SC", "Microsoft YaHei", sans-serif' }}>
              项目成果展示
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(24,24,24,0.45)' }}>
              以下为龙虎山文旅品牌项目落地后的成果实拍展示。
            </p>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {project.resultsImages.map((g, i) => (
                <div
                  key={i}
                  className="mb-4 break-inside-avoid rounded-2xl overflow-hidden group cursor-zoom-in"
                  style={{ border: '1px solid rgba(0,0,0,0.08)' }}
                  onClick={() => setLightbox({ list: project.resultsImages!, index: i })}
                  role="button"
                  aria-label={`放大查看 ${project.title} 成果展示 ${i + 1}`}
                >
                  <img
                    src={g}
                    alt={`${project.title} 成果展示 ${i + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: 'saturate(0.9)' }}
                  />
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Prev / Next */}
        <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }} className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prev ? (
              <a
                href={`#/project/${prev.id}`}
                className="group p-6 rounded-2xl transition-all duration-300"
                style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.07)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = `${prev.accent}35`)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.07)')}
              >
                <p className="text-xs tracking-wider mb-3" style={{ color: 'rgba(24,24,24,0.3)' }}>
                  上一个项目
                </p>
                <div className="flex items-center gap-3">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: prev.accent }}>
                    <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm font-semibold text-white group-hover:text-opacity-80">{prev.title}</span>
                </div>
              </a>
            ) : (
              <a
                href="#projects"
                className="group p-6 rounded-2xl transition-all duration-300 flex flex-col justify-center"
                style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.07)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(234,88,12,0.35)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.07)')}
              >
                <p className="text-xs tracking-wider mb-3" style={{ color: 'rgba(24,24,24,0.3)' }}>
                  上一个项目
                </p>
                <span className="text-sm font-semibold" style={{ color: '#EA580C' }}>← 返回作品集</span>
              </a>
            )}

            {next ? (
              <a
                href={`#/project/${next.id}`}
                className="group p-6 rounded-2xl transition-all duration-300 md:text-right"
                style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.07)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = `${next.accent}35`)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.07)')}
              >
                <p className="text-xs tracking-wider mb-3" style={{ color: 'rgba(24,24,24,0.3)' }}>
                  下一个项目
                </p>
                <div className="flex items-center gap-3 md:justify-end">
                  <span className="text-sm font-semibold text-white group-hover:text-opacity-80">{next.title}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: next.accent }}>
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </a>
            ) : (
              <a
                href="#projects"
                className="group p-6 rounded-2xl transition-all duration-300 md:text-right flex flex-col justify-center"
                style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.07)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(234,88,12,0.35)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.07)')}
              >
                <p className="text-xs tracking-wider mb-3" style={{ color: 'rgba(24,24,24,0.3)' }}>
                  下一个项目
                </p>
                <span className="text-sm font-semibold" style={{ color: '#EA580C' }}>← 返回作品集</span>
              </a>
            )}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }} className="pb-32">
          <div
            className="rounded-3xl p-10 md:p-16 text-center"
            style={{
              background: 'radial-gradient(ellipse 80% 80% at 50% 0%, rgba(234,88,12,0.06) 0%, transparent 70%), #FFFFFF',
              border: '1px solid rgba(0,0,0,0.07)',
            }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Space Grotesk, "PingFang SC", "Microsoft YaHei", sans-serif' }}>
              对这个项目感兴趣？
            </h2>
            <p className="text-base mb-8" style={{ color: 'rgba(24,24,24,0.45)' }}>
              欢迎与我聊聊更多设计细节与创作过程。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300"
                style={{ background: '#EA580C', color: '#0d0d0d' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 14px 40px rgba(234,88,12,0.3)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                联系我
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300"
                style={{ border: '1px solid rgba(0,0,0,0.12)', color: 'rgba(24,24,24,0.65)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.3)';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(24,24,24,1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.12)';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(24,24,24,0.65)';
                }}
              >
                更多项目
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 图片放大预览 */}
      {lightbox !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: 'rgba(250,250,249,0.94)', backdropFilter: 'blur(10px)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 w-11 h-11 rounded-full flex items-center justify-center z-10 transition-all duration-300"
            style={{ background: 'rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.15)', color: 'rgba(24,24,24,0.8)' }}
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            aria-label="关闭预览"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          {lightbox.index > 0 && (
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center z-10 transition-all duration-300"
              style={{ background: 'rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.15)', color: 'rgba(24,24,24,0.8)' }}
              onClick={(e) => { e.stopPropagation(); setLightbox({ ...lightbox, index: lightbox.index - 1 }); }}
              aria-label="上一张"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          <img
            src={lightbox.list[lightbox.index]}
            alt={`${project.title} 放大预览 ${lightbox.index + 1}`}
            className="max-w-[92vw] max-h-[86vh] object-contain rounded-xl"
            style={{ boxShadow: '0 30px 90px rgba(0,0,0,0.65)' }}
            onClick={(e) => e.stopPropagation()}
          />

          {lightbox.index < lightbox.list.length - 1 && (
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center z-10 transition-all duration-300"
              style={{ background: 'rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.15)', color: 'rgba(24,24,24,0.8)' }}
              onClick={(e) => { e.stopPropagation(); setLightbox({ ...lightbox, index: lightbox.index + 1 }); }}
              aria-label="下一张"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-mono"
            style={{ background: 'rgba(250,250,249,0.7)', border: '1px solid rgba(0,0,0,0.12)', color: 'rgba(24,24,24,0.6)' }}
          >
            {lightbox.index + 1} / {lightbox.list.length}
          </div>
        </motion.div>
      )}
    </div>
  );
}