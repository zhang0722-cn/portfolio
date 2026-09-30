import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { projects, type Project } from '../data/projects';
type ProjectNavItem = { id: string; label: string };

function getProjectNavItems(project: Project | undefined): ProjectNavItem[] {
  if (!project) return [];
  const items: ProjectNavItem[] = [
    { id: 'overview', label: '概览' },
    { id: 'project-intro', label: '项目简介' },
  ];
  if (project.contentImages?.length || project.gallery.length > 0) items.push({ id: 'project-gallery', label: project.contentImages?.length ? '项目内容' : '项目图集' });
  items.push({ id: 'project-role', label: '工作内容' }, { id: 'project-results', label: '项目成果' });
  if (project.endDocument) items.push({ id: 'project-document', label: '完整文档' });
  return items;
}

export default function ProjectDetail({ id }: { id: string | null }) {
  const project = projects.find((p) => String(p.id) === id);
  const index = project ? projects.findIndex((p) => p.id === project.id) : -1;
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index >= 0 && index < projects.length - 1 ? projects[index + 1] : null;

  const [lightbox, setLightbox] = useState<{ list: string[]; index: number } | null>(null);

  const navItems = getProjectNavItems(project);
  const navKey = navItems.map((item) => item.id).join('|');
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]?.target.id) setActiveSection(visible[0].target.id);
    }, { rootMargin: '-24% 0px -64% 0px', threshold: [0, 0.25, 0.5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [project?.id, navKey]);

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
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-8">
        <h1 className="display text-4xl font-bold">项目不存在</h1>
        <p style={{ color: 'var(--muted)' }}>你访问的项目详情页不存在或已被移除。</p>
        <a href="#/" className="rounded-full px-6 py-3 text-sm font-semibold" style={{ background: 'var(--accent)', color: '#fff' }}>
          ← 返回作品集
        </a>
      </div>
    );
  }

  return (
    <>
      <main className="section-shell pb-28 pt-32 xl:pr-20">
        <a href="#/" className="eyebrow inline-block mb-16">返回项目列表</a>

        <header id="overview" className="scroll-mt-28 grid gap-8 border-b pb-10 lg:grid-cols-[1fr_320px]" style={{ borderColor: 'var(--line)' }}>
          <h1 className="display text-5xl font-bold leading-[.95] md:text-8xl">{project.title}</h1>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-6"><dt style={{ color: 'var(--muted)' }}>年份</dt><dd>{project.year}</dd></div>
            <div className="flex justify-between gap-6"><dt style={{ color: 'var(--muted)' }}>角色</dt><dd>{project.role}</dd></div>
            <div className="flex justify-between gap-6"><dt style={{ color: 'var(--muted)' }}>类型</dt><dd>{project.category}</dd></div>
            {project.period && <div className="flex justify-between gap-6"><dt style={{ color: 'var(--muted)' }}>周期</dt><dd>{project.period}</dd></div>}
            {project.client && <div className="flex justify-between gap-6"><dt style={{ color: 'var(--muted)' }}>合作单位</dt><dd>{project.client}</dd></div>}
            {project.status && <div className="flex justify-between gap-6"><dt style={{ color: 'var(--muted)' }}>状态</dt><dd>{project.status}</dd></div>}
          </dl>
        </header>

        <img src={project.img} alt={project.title} className="mt-12 w-full object-cover" style={{ borderRadius: 'var(--radius-lg)', aspectRatio: project.coverRatio ?? '16/9' }} />

        <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {project.stats.map((s) => (
            <div key={s.label} className="border-t pt-5" style={{ borderColor: 'var(--line)' }}>
              <div className="text-3xl font-bold" style={{ color: 'var(--accent)', fontFamily: 'Space Grotesk' }}>{s.value}</div>
              <div className="mt-2 text-sm font-semibold">{s.label}</div>
              {s.desc && <div className="mt-1 text-xs" style={{ color: 'var(--muted)' }}>{s.desc}</div>}
            </div>
          ))}
        </div>

        <section id="project-intro" className="mt-20 scroll-mt-28">
          <h2 className="display text-2xl font-bold">项目简介</h2>
          <p className="mt-6 max-w-3xl text-[15px] leading-7" style={{ color: 'var(--muted)' }}>{project.overview}</p>
          <div className="mt-8 space-y-4">
            {project.background.map((b, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: 'var(--accent)' }} />
                <p className="text-sm leading-7" style={{ color: 'var(--muted)' }}>{b}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={project.contentImages?.length || project.gallery.length > 0 ? 'mt-20' : 'hidden'}>
          <h2 className="display text-2xl font-bold">{project.contentImages ? '项目内容' : '项目图集'}</h2>
          {project.contentImages ? (
            <>
              <p className="mt-6 text-sm leading-7" style={{ color: 'var(--muted)' }}>以下为「品牌内容」中龙虎山文旅品牌项目的实际作品展示。</p>
              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                {project.contentImages.map((g, i) => (
                  <div key={i} className="group cursor-zoom-in overflow-hidden" style={{ borderRadius: 'var(--radius-lg)' }} onClick={() => setLightbox({ list: project.contentImages!, index: i })} role="button" aria-label={`放大查看 ${project.title} 项目内容 ${i + 1}`}>
                    <img src={g} alt={`${project.title} 项目内容 ${i + 1}`} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ aspectRatio: '16/9' }} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {project.gallery.map((g, i) => (
                <div key={i} className="overflow-hidden" style={{ borderRadius: 'var(--radius-lg)' }}>
                  <img src={g} alt={`${project.title} 图 ${i + 1}`} className="h-auto w-full object-contain" />
                </div>
              ))}
            </div>
          )}
        </section>

        <section id="project-role" className="mt-20 scroll-mt-28">
          <h2 className="display text-2xl font-bold">工作内容与职责</h2>
          <div className="mt-8 border-t" style={{ borderColor: 'var(--line)' }}>
            {project.responsibilities.map((r, i) => (
              <div key={i} className="grid gap-4 border-b py-8 md:grid-cols-[240px_1fr]" style={{ borderColor: 'var(--line)' }}>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center text-sm font-bold" style={{ color: 'var(--accent)', border: '1px solid var(--line)', borderRadius: 'var(--radius-md)' }}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-lg font-semibold">{r.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {r.items.map((item, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-7" style={{ color: 'var(--muted)' }}>
                      <span style={{ color: 'var(--accent)' }}>-</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="project-results" className="mt-20 scroll-mt-28">
          <h2 className="display text-2xl font-bold">项目成果</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {project.results.map((r, i) => (
              <div key={i} className="border-t pt-5" style={{ borderColor: 'var(--line)' }}>
                <span className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>成果 {String(i + 1).padStart(2, '0')}</span>
                <p className="mt-3 text-sm leading-7" style={{ color: 'var(--muted)' }}>{r}</p>
              </div>
            ))}
          </div>
        </section>

        {project.resultsImages && (
          <section className="mt-20">
            <h2 className="display text-2xl font-bold">项目成果展示</h2>
            <p className="mt-6 text-sm leading-7" style={{ color: 'var(--muted)' }}>以下为龙虎山文旅品牌项目落地后的成果实拍展示。</p>
            <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
              {project.resultsImages.map((g, i) => (
                <div key={i} className="mb-4 cursor-zoom-in break-inside-avoid overflow-hidden" style={{ borderRadius: 'var(--radius-lg)' }} onClick={() => setLightbox({ list: project.resultsImages!, index: i })} role="button" aria-label={`放大查看 ${project.title} 成果展示 ${i + 1}`}>
                  <img src={g} alt={`${project.title} 成果展示 ${i + 1}`} className="w-full object-cover" />
                </div>
              ))}
            </div>
          </section>
        )}

        {project.endDocument && (
          <section id="project-document" className="mt-20 scroll-mt-28">
            <div className="flex flex-col gap-4 border-t pt-8 md:flex-row md:items-end md:justify-between" style={{ borderColor: 'var(--line)' }}>
              <div>
                <h2 className="display text-2xl font-bold md:text-3xl">{project.endDocument.title}</h2>
              </div>
              <a href={project.endDocument.src} target="_blank" rel="noreferrer" className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>在新窗口打开 PDF</a>
            </div>
            {project.endDocument.description && <p className="mt-5 text-sm leading-7" style={{ color: 'var(--muted)' }}>{project.endDocument.description}</p>}
            <iframe title={project.endDocument.title} src={`${project.endDocument.src}#view=FitH`} loading="lazy" className="mt-8 h-[72vh] min-h-[560px] w-full" style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)' }} />
          </section>
        )}

        <div className="mt-20 grid grid-cols-1 gap-4 border-t pt-8 md:grid-cols-2" style={{ borderColor: 'var(--line)' }}>
          {prev ? (
            <a href={`#/project/${prev.id}`} className="group block">
              <p className="eyebrow mb-3">上一个项目</p>
              <span className="text-sm font-semibold">{prev.title}</span>
            </a>
          ) : (
            <a href="#projects" className="block">
              <p className="eyebrow mb-3">上一个项目</p>
              <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>返回作品集</span>
            </a>
          )}

          {next ? (
            <a href={`#/project/${next.id}`} className="group block md:text-right">
              <p className="eyebrow mb-3">下一个项目</p>
              <span className="text-sm font-semibold">{next.title}</span>
            </a>
          ) : (
            <a href="#projects" className="block md:text-right">
              <p className="eyebrow mb-3">下一个项目</p>
              <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>返回作品集</span>
            </a>
          )}
        </div>

        <div className="mt-20 border-t pt-12 text-center" style={{ borderColor: 'var(--line)' }}>
          <h2 className="display text-3xl font-bold md:text-5xl">对这个项目感兴趣？</h2>
          <p className="mt-4" style={{ color: 'var(--muted)' }}>欢迎与我聊聊更多设计细节与创作过程。</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="#contact" className="rounded-full px-8 py-4 text-sm font-semibold" style={{ background: 'var(--accent)', color: '#fff' }}>联系我</a>
            <a href="#projects" className="rounded-full border px-8 py-4 text-sm font-semibold" style={{ borderColor: 'var(--line)' }}>更多项目</a>
          </div>
        </div>
      </main>

      <nav aria-label="项目页导航" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex">
        {navItems.map((item) => {
          const active = activeSection === item.id;
          return (
            <button key={item.id} type="button" onClick={() => { setActiveSection(item.id); document.getElementById(item.id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }); }} aria-current={active ? 'location' : undefined} className="group flex items-center justify-end gap-3">
              <span className="text-[10px] tracking-[.12em]" style={{ color: active ? 'var(--accent)' : 'var(--muted)', opacity: active ? 1 : 0.65 }}>{item.label}</span>
              <span className="h-px" style={{ width: active ? 30 : 16, background: active ? 'var(--accent)' : 'var(--line)', transition: 'all .3s var(--ease-premium)' }} />
            </button>
          );
        })}
      </nav>

      {lightbox !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          role="dialog" aria-modal="true" aria-label="项目图片放大预览" className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: 'rgba(24,24,22,0.92)', backdropFilter: 'blur(10px)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 w-11 h-11 rounded-full flex items-center justify-center z-10 transition-all duration-300"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.85)' }}
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
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.85)' }}
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
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.85)' }}
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
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)' }}
          >
            {lightbox.index + 1} / {lightbox.list.length}
          </div>
        </motion.div>
      )}
    </>
  );
}
