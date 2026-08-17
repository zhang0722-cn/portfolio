import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../data/projects';

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

type Project = (typeof projects)[0];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.a
      ref={ref}
      href={`#/project/${project.id}`}
      aria-label={`查看项目详情：${project.title}`}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer block"
      style={{
        background: '#0d1117',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      whileHover={{ y: -6 }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: project.coverRatio ?? (project.size === 'large' ? '16/9' : '4/3') }}
      >
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: 'saturate(0.85) contrast(1.05)' }}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to bottom, transparent 40%, rgba(13,17,23,0.9) 100%)`,
          }}
        />
        {/* Year badge */}
        <div
          className="absolute top-4 right-4 text-xs font-mono px-3 py-1 rounded-full"
          style={{
            background: 'rgba(8,10,15,0.7)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(240,240,240,0.6)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {project.year}
        </div>
        {/* Category */}
        <div
          className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full"
          style={{
            background: 'rgba(8,10,15,0.7)',
            border: `1px solid ${project.accent}40`,
            color: project.accent,
            backdropFilter: 'blur(8px)',
          }}
        >
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className="text-xl font-bold text-white mb-2 group-hover:text-opacity-90 transition-colors"
          style={{ fontFamily: 'Space Grotesk, "PingFang SC", "Microsoft YaHei", sans-serif' }}
        >
          {project.title}
        </h3>
        <p
          className="text-sm leading-relaxed mb-4 line-clamp-3"
          style={{ color: 'rgba(240,240,240,0.45)' }}
        >
          {project.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow link */}
        <div
          className="flex items-center gap-2 text-xs font-semibold tracking-wider transition-all duration-300"
          style={{ color: project.accent }}
        >
          查看项目详情
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              d="M2.5 7h9M8 3l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Hover accent line at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ background: project.accent }}
      />
    </motion.a>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-32"
      style={{
        background:
          'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(168,255,120,0.04) 0%, transparent 70%), #080a0f',
      }}
    >
      <div className="max-w-[1700px] mx-auto px-8">
        {/* Header */}
        <FadeIn>
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="tag">精选作品</span>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
              </div>
              <h2
                className="text-5xl lg:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: 'Space Grotesk, "PingFang SC", "Microsoft YaHei", sans-serif' }}
              >
                精选项目
              </h2>
            </div>
            <a
              href="#contact"
              className="hidden lg:inline-flex items-center gap-2 text-sm transition-colors duration-200"
              style={{ color: 'rgba(240,240,240,0.4)' }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = 'rgba(240,240,240,0.9)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = 'rgba(240,240,240,0.4)')
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

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}