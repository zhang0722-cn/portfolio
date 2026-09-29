import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../data/projects';

const ease = [0.32, 0.72, 0, 1] as const;

type Project = (typeof projects)[0];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const layouts = ['lg:grid-cols-1', 'lg:grid-cols-[7fr_5fr]', 'lg:grid-cols-[5fr_7fr]'];
  const imageOrder = index === 2 ? 'lg:order-2' : '';

  return (
    <motion.article ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .8, ease }} className="border-t pt-6" style={{ borderColor: 'var(--line)' }}>
      <div className={`grid grid-cols-1 items-end gap-8 ${layouts[index] ?? layouts[1]}`}>
        <a href={`#/project/${project.id}`} className={`block overflow-hidden ${imageOrder}`} style={{ borderRadius: 'var(--radius-lg)' }}>
          <img src={project.img} alt={project.title} loading="lazy" className="w-full object-cover transition-transform duration-700 hover:scale-[1.02]" style={{ aspectRatio: index === 0 ? '16/9' : project.coverRatio ?? '4/3' }} />
        </a>
        <div className="pb-2">
          <div className="flex items-center justify-between text-xs" style={{ color: 'var(--muted)' }}><span>{project.category}</span><span>{project.year}</span></div>
          <h3 className="display mt-5 text-3xl font-bold md:text-5xl">{project.title}</h3>
          <p className="mt-5 max-w-xl text-sm leading-7" style={{ color: 'var(--muted)' }}>{project.desc}</p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs" style={{ color: 'var(--accent)' }}>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <a href={`#/project/${project.id}`} className="mt-8 inline-block text-sm font-semibold" style={{ color: 'var(--accent)' }}>查看项目详情</a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 md:py-40">
      <div className="section-shell">
        <div className="mb-14 flex items-end justify-between gap-8">
          <div><p className="eyebrow mb-5">精选项目</p><h2 className="display text-4xl font-bold md:text-6xl">作品优先，信息克制。</h2></div>
          <p className="hidden max-w-sm text-sm leading-7 md:block" style={{ color: 'var(--muted)' }}>三个完整项目，覆盖品牌识别、字体设计与实际物料落地。</p>
        </div>
        <div className="space-y-20 md:space-y-28">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div>
      </div>
    </section>
  );
}