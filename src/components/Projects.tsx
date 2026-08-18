import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../data/projects';

const ease = [0.32, 0.72, 0, 1] as const;

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

type Project = (typeof projects)[0];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const span = project.size === 'large' ? 'lg:col-span-2' : 'lg:col-span-1';

  return (
    <motion.a
      ref={ref}
      href={`#/project/${project.id}`}
      aria-label={`查看项目详情：${project.title}`}
      initial={{ opacity: 0, y: 46 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.12, ease }}
      className={`group block ${span} cursor-pointer`}
      whileHover={{ y: -8 }}
    >
      {/* Double-Bezel 外圈层 */}
      <div
        className="p-1.5 rounded-[1.75rem] transition-all duration-700"
        style={{
          background: 'rgba(0,0,0,0.03)',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.08), 0 20px 60px rgba(0,0,0,0.35)',
          transitionTimingFunction: 'var(--ease-premium)',
        }}
      >
        {/* 内核心 */}
        <div
          className="relative rounded-[1.5rem] overflow-hidden"
          style={{ background: '#FFFFFF', boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.04)' }}
        >
          {/* Image */}
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio: project.coverRatio ?? (project.size === 'large' ? '16/9' : '4/3') }}
          >
            <img
              src={project.img}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
              style={{ filter: 'saturate(0.85) contrast(1.05)', transitionTimingFunction: 'var(--ease-premium)' }}
            />
            {/* Overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{ background: 'linear-gradient(to bottom, transparent 42%, rgba(10,10,12,0.92) 100%)' }}
            />
            {/* Year badge */}
            <div
              className="absolute top-4 right-4 text-xs font-mono px-3 py-1 rounded-full"
              style={{
                background: 'rgba(250,250,249,0.7)',
                border: '1px solid rgba(0,0,0,0.1)',
                color: 'rgba(24,24,24,0.6)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              {project.year}
            </div>
            {/* Category */}
            <div
              className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: 'rgba(250,250,249,0.7)',
                border: `1px solid ${project.accent}40`,
                color: project.accent,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              {project.category}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-7">
            <h3
              className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-opacity-90 transition-colors duration-500"
              style={{ fontFamily: 'Space Grotesk, "PingFang SC", "Microsoft YaHei", sans-serif' }}
            >
              {project.title}
            </h3>
            <p
              className="text-sm leading-relaxed mb-4 line-clamp-3"
              style={{ color: 'rgba(24,24,24,0.45)' }}
            >
              {project.desc}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            {/* Arrow link */}
            <div
              className="flex items-center gap-3 text-xs font-semibold tracking-wider transition-colors duration-500"
              style={{ color: project.accent }}
            >
              查看项目详情
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:translate-x-1"
                style={{ background: `${project.accent}14`, border: `1px solid ${project.accent}30`, transitionTimingFunction: 'var(--ease-premium)' }}
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7h9M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>

          {/* Hover accent line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
            style={{ background: project.accent, transitionTimingFunction: 'var(--ease-premium)' }}
          />
        </div>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-28 md:py-36"
      style={{
        background:
          'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(234,88,12,0.05) 0%, transparent 70%), #F2F2F0',
      }}
    >
      <div className="max-w-[1700px] mx-auto px-6 md:px-8">
        {/* Header */}
        <FadeIn>
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <span className="tag">精选作品</span>
                <div className="flex-1 h-px" style={{ background: 'rgba(0,0,0,0.06)' }} />
              </div>
              <h2
                className="text-5xl lg:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: 'Space Grotesk, "PingFang SC", "Microsoft YaHei", sans-serif' }}
              >
                精选项目
              </h2>
              <p
                className="mt-3 uppercase"
                style={{ fontFamily: 'StretchPro, sans-serif', color: '#EA580C', fontSize: 13, letterSpacing: '0.01em' }}
              >
                SELECTED PROJECTS
              </p>
            </div>
            <a
              href="#contact"
              className="hidden lg:inline-flex items-center gap-2 text-sm transition-colors duration-500"
              style={{ color: 'rgba(24,24,24,0.4)' }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = 'rgba(24,24,24,0.9)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = 'rgba(24,24,24,0.4)')
              }
            >
              查看全部项目
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </FadeIn>

        {/* Asymmetrical Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}