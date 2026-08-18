import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const skillGroups = [
  {
    icon: '◈',
    title: '视觉设计',
    color: '#EA580C',
    desc: '以精准的审美和克制的表达，完成海报、宣传物料与版式设计——从排版到色彩，每个细节都在叙事。',
    skills: ['Photoshop', 'Illustrator', '海报设计', '版式设计', '色彩校正'],
  },
  {
    icon: '⬡',
    title: '品牌识别',
    color: '#EA580C',
    desc: '从Logo、标准色、辅助图形到品牌规范，构建统一且富有文化内涵的品牌识别系统（VI），并推动物料落地。',
    skills: ['VI 系统', '标志设计', '导视系统', '品牌规范', '触点延展'],
  },
  {
    icon: '◎',
    title: '字体设计',
    color: '#EA580C',
    desc: '参与原创中文字体设计开发，熟练使用 Glyphs 完成字形手稿绘制、数字化转译与字距优化，兼顾气质调性与阅读舒适度。',
    skills: ['Glyphs', '字形绘制', '字距优化', '中文字体', '字体设计'],
  },
  {
    icon: '⬟',
    title: '版式与印刷',
    color: '#EA580C',
    desc: '画册排版、书籍装帧与印刷工艺管控，从版式规范到色彩管理（CMYK），确保设计在实物层面的准确还原。',
    skills: ['InDesign', '书籍装帧', '印刷工艺', 'CMYK 色彩管理', '画册编辑'],
  },
  {
    icon: '◐',
    title: 'AI 辅助设计',
    color: '#EA580C',
    desc: '将 AI + PS 工作流整合进设计提案与落地环节，快速输出灯牌效果图与制作文件，提升效率与还原度。',
    skills: ['AI + PS', '效果图输出', '快速提案', '风格控制'],
  },
  {
    icon: '◻',
    title: '项目与协作',
    color: '#EA580C',
    desc: '善于在复杂任务中建立规范、推动协作，具备供应商对接、价格谈判与项目统筹意识，保障设计项目高质量落地。',
    skills: ['供应商对接', '多方协作', '规范制定', '商务谈判', '方案汇报'],
  },
];

const certificates = [
  'certificates/cert-01.jpg',
  'certificates/cert-02.jpg',
  'certificates/cert-03.jpg',
  'certificates/cert-04.jpg',
  'certificates/cert-05.jpg',
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, delay, ease: [0.32, 0.72, 0, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SkillCard({
  group,
  index,
}: {
  group: (typeof skillGroups)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.32, 0.72, 0, 1] }}
      className="group"
      whileHover={{ y: -6 }}
    >
      {/* Double-Bezel 外圈层 */}
      <div
        className="p-1.5 rounded-[1.75rem]"
        style={{
          background: 'rgba(0,0,0,0.03)',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.08)',
        }}
      >
        <div
          className="relative p-8 rounded-[1.5rem] flex flex-col gap-5 transition-colors duration-700 cursor-default overflow-hidden"
          style={{ background: '#FFFFFF', boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.04)' }}
        >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold transition-all duration-300"
        style={{
          background: `${group.color}12`,
          border: `1px solid ${group.color}25`,
          color: group.color,
        }}
      >
        {group.icon}
      </div>

      {/* Title */}
      <div>
        <h3
          className="text-lg font-bold text-white mb-2"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {group.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(24,24,24,0.45)' }}>
          {group.desc}
        </p>
      </div>

      {/* Skills list */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="text-xs px-3 py-1 rounded-full font-medium transition-all duration-300"
            style={{
              background: `${group.color}10`,
              border: `1px solid ${group.color}20`,
              color: group.color,
            }}
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${group.color}06 0%, transparent 70%)`,
        }}
      />
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [cert, setCert] = useState<number | null>(null);

  useEffect(() => {
    if (cert === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCert(null);
      if (e.key === 'ArrowLeft' && cert > 0) setCert(cert - 1);
      if (e.key === 'ArrowRight' && cert < certificates.length - 1) setCert(cert + 1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [cert]);

  return (
    <section
      id="skills"
      className="relative py-32"
      style={{ background: '#F2F2F0' }}
    >
      {/* Decorative horizontal line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(234,88,12,0.2), transparent)' }}
      />

      <div className="max-w-[1700px] mx-auto px-8">
        {/* Header */}
        <FadeIn>
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <span className="tag">核心能力</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(0,0,0,0.06)' }} />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <h2
                className="text-5xl lg:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                个人优势
              </h2>
              <p
                className="mt-3 uppercase"
                style={{ fontFamily: 'StretchPro, sans-serif', color: '#EA580C', fontSize: 12, letterSpacing: '0.01em' }}
              >
                PERSONAL STRENGTHS
                </p>
              </div>
              <p
                className="hidden lg:block max-w-sm text-sm leading-relaxed text-right"
                style={{ color: 'rgba(24,24,24,0.35)' }}
              >
                横跨视觉、品牌、AI设计的复合型能力，
                <br />
                用系统性思维解决复杂设计问题。
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.title} group={group} index={i} />
          ))}
        </div>

        {/* Tool logos row */}
        <FadeIn delay={0.3}>
          <div
            className="mt-16 p-8 rounded-2xl flex flex-wrap items-center justify-between gap-6"
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(0,0,0,0.07)',
            }}
          >
            <p className="text-xs uppercase tracking-widest" style={{ color: '#6B7280' }}>
              常用设计工具
            </p>
            <div className="flex flex-wrap gap-6 items-center">
              {[
                {
                  name: 'Photoshop',
                  level: '熟练',
                  icon: (
                    <svg viewBox="0 0 128 128" width="18" height="18" aria-hidden="true">
                      <path fill="#31A8FF" fillRule="evenodd" d="M22.666 1.6C10.133 1.6 0 11.734 0 24.268v79.464C0 116.266 10.133 126.4 22.666 126.4h82.668c12.533 0 22.666-10.134 22.666-22.668V24.268C128 11.734 117.867 1.6 105.334 1.6H22.666zm23.201 31.734c4.373 0 8 .532 10.986 1.652A19.05 19.05 0 0 1 64 39.361a16.976 16.976 0 0 1 3.894 6.079c.8 2.24 1.225 4.533 1.225 6.933 0 4.587-1.066 8.373-3.2 11.36-2.132 2.986-5.118 5.227-8.585 6.507-3.627 1.334-7.627 1.813-12 1.813-1.28 0-2.135 0-2.668-.053-.533-.053-1.28-.053-2.293-.053v17.12c.053.373-.213.694-.586.747H29.44c-.426 0-.638-.215-.638-.695V34.24c0-.373.16-.588.533-.588.907 0 1.76 0 2.986-.052 1.28-.054 2.613-.052 4.053-.106 1.44-.053 2.987-.054 4.64-.107 1.654-.054 3.254-.053 4.854-.053zm1.19 10.504a18.68 18.68 0 0 0-.817.002c-1.386 0-2.613.001-3.627.055-1.066-.054-1.812-.001-2.185.052v17.92c.746.054 1.438.106 2.078.106h2.828c2.08 0 4.16-.32 6.133-.96 1.707-.48 3.2-1.494 4.373-2.827 1.12-1.334 1.654-3.146 1.654-5.493a8.776 8.776 0 0 0-1.226-4.746c-.907-1.386-2.188-2.454-3.735-3.04-1.727-.7-3.576-1.033-5.476-1.07zm44.73 2.723c2.187 0 4.427.158 6.613.478 1.6.213 3.146.642 4.586 1.229.214.053.427.265.533.478.054.213.108.427.108.64v8.694a.655.655 0 0 1-.266.533c-.48.107-.747.107-.96 0-1.6-.853-3.308-1.439-5.122-1.812-1.973-.427-3.946-.695-5.972-.695-1.067-.054-2.188.108-3.201.374-.694.16-1.28.534-1.653 1.067-.266.427-.426.96-.426 1.44s.214.96.534 1.386c.48.587 1.119 1.068 1.812 1.442a48.8 48.8 0 0 0 3.787 1.757c2.88.96 5.653 2.295 8.213 3.895 1.76 1.12 3.2 2.614 4.213 4.427a11.509 11.509 0 0 1 1.228 5.493 12.412 12.412 0 0 1-2.082 7.093 13.362 13.362 0 0 1-5.972 4.746c-2.614 1.12-5.814 1.707-9.654 1.707-2.454 0-4.852-.213-7.252-.693a21.51 21.51 0 0 1-5.44-1.707c-.373-.213-.641-.587-.588-1.014V78.24c0-.16.053-.374.213-.48.16-.107.32-.052.48.054a22.83 22.83 0 0 0 6.614 2.614c2.027.533 4.161.799 6.295.799 2.026 0 3.466-.267 4.426-.747.853-.373 1.439-1.28 1.439-2.24 0-.746-.426-1.441-1.28-2.135-.853-.693-2.613-1.492-5.226-2.505a32.638 32.638 0 0 1-7.574-3.84 13.81 13.81 0 0 1-4.053-4.533 11.44 11.44 0 0 1-1.226-5.44c0-2.293.639-4.48 1.812-6.453 1.333-2.133 3.308-3.84 5.602-4.906 2.506-1.28 5.652-1.867 9.44-1.867z" />
                    </svg>
                  ),
                },
                {
                  name: 'Illustrator',
                  level: '熟练',
                  icon: (
                    <svg viewBox="0 0 128 128" width="18" height="18" aria-hidden="true">
                      <path fill="#FF9A00" fillRule="evenodd" d="M105.33 1.6H22.67A22.64 22.64 0 0 0 0 24.27v79.46a22.64 22.64 0 0 0 22.67 22.67h82.66A22.64 22.64 0 0 0 128 103.73V24.27A22.64 22.64 0 0 0 105.33 1.6Zm-27.09 88H67.09a.82.82 0 0 1-.85-.59l-4.37-12.74H42L38 88.8a.93.93 0 0 1-1 .75H27c-.58 0-.74-.32-.58-1l17.1-49.4c.16-.54.32-1.12.53-1.76a18.14 18.14 0 0 0 .32-3.47.54.54 0 0 1 .43-.59h13.81c.43 0 .64.16.7.43l19.46 54.93c.16.59 0 .86-.53.86Zm18.4-.6c0 .59-.21.85-.69.85H85.49a.75.75 0 0 1-.8-.85V47.89c0-.53.22-.74.7-.74H96c.48 0 .69.26.69.74Zm-1.12-48.2a6.3 6.3 0 0 1-4.85 1.87 6.61 6.61 0 0 1-4.75-1.87 6.87 6.87 0 0 1-1.81-4.91A6.23 6.23 0 0 1 86 31.15a6.8 6.8 0 0 1 4.74-1.87 6.4 6.4 0 0 1 4.86 1.87 6.75 6.75 0 0 1 1.76 4.74 6.76 6.76 0 0 1-1.84 4.91ZM58.67 65.44H45.12c.8-2.24 1.6-4.75 2.35-7.47s1.65-5.33 2.45-7.89a64.65 64.65 0 0 0 1.81-6.88h.11c.37 1.28.75 2.67 1.17 4.16s.91 3.09 1.44 4.75 1 3.25 1.55 4.9 1 3.15 1.44 4.59.91 2.72 1.23 3.84Z" />
                    </svg>
                  ),
                },
                {
                  name: 'InDesign',
                  level: '熟练',
                  icon: (
                    <span
                      className="inline-flex items-center justify-center rounded-[5px] font-bold flex-shrink-0"
                      style={{ width: 18, height: 18, background: '#FF3366', color: '#141414', fontSize: 8.5, letterSpacing: '-0.5px' }}
                    >
                      Id
                    </span>
                  ),
                },
                {
                  name: 'Glyphs',
                  level: '熟练',
                  icon: (
                    <span
                      className="inline-flex items-center justify-center rounded-[5px] font-bold flex-shrink-0"
                      style={{ width: 18, height: 18, background: '#1e293b', border: '1px solid rgba(0,0,0,0.25)', color: '#e2e8f0', fontSize: 11 }}
                    >
                      G
                    </span>
                  ),
                },
                {
                  name: 'Figma',
                  level: '了解',
                  icon: (
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                      <circle cx="8" cy="4" r="4" fill="#F24E1E" />
                      <circle cx="16" cy="4" r="4" fill="#FF7262" />
                      <circle cx="8" cy="12" r="4" fill="#A259FF" />
                      <circle cx="16" cy="12" r="4" fill="#1ABCFE" />
                      <circle cx="8" cy="20" r="4" fill="#0ACF83" />
                    </svg>
                  ),
                },
                {
                  name: 'AI 工具',
                  level: '辅助',
                  icon: <Sparkles size={16} style={{ color: '#EA580C' }} strokeWidth={2} />,
                },
              ].map((tool) => (
                <span
                  key={tool.name}
                  className="flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                  style={{ color: 'rgba(24,24,24,0.3)' }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = 'rgba(24,24,24,0.9)')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = 'rgba(24,24,24,0.3)')
                  }
                >
                  {tool.icon}
                  {tool.name}
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: 'rgba(234,88,12,0.08)',
                      border: '1px solid rgba(234,88,12,0.22)',
                      color: '#EA580C',
                    }}
                  >
                    {tool.level}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* 相关证明 */}
        <FadeIn delay={0.35}>
          <div className="mt-16">
            <div className="flex items-center gap-4 mb-3">
              <p className="text-xs uppercase tracking-widest" style={{ color: '#6B7280' }}>
                相关证明
              </p>
              <div className="flex-1 h-px" style={{ background: 'rgba(0,0,0,0.06)' }} />
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(24,24,24,0.35)' }}>
              奖学金与相关证明材料，点击可放大查看。
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {certificates.map((c, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden group cursor-zoom-in"
                  style={{ border: '1px solid rgba(0,0,0,0.08)' }}
                  onClick={() => setCert(i)}
                  role="button"
                  aria-label={`放大查看相关证明 ${i + 1}`}
                >
                  <img
                    src={c}
                    alt={`相关证明 ${i + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: 'saturate(0.9)' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* 证明放大预览 */}
      {cert !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: 'rgba(250,250,249,0.94)', backdropFilter: 'blur(10px)' }}
          onClick={() => setCert(null)}
        >
          <button
            className="absolute top-6 right-6 w-11 h-11 rounded-full flex items-center justify-center z-10 transition-all duration-300"
            style={{ background: 'rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.15)', color: 'rgba(24,24,24,0.8)' }}
            onClick={(e) => { e.stopPropagation(); setCert(null); }}
            aria-label="关闭预览"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          {cert > 0 && (
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center z-10 transition-all duration-300"
              style={{ background: 'rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.15)', color: 'rgba(24,24,24,0.8)' }}
              onClick={(e) => { e.stopPropagation(); setCert(cert - 1); }}
              aria-label="上一张"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          <img
            src={certificates[cert]}
            alt={`相关证明 ${cert + 1}`}
            className="max-w-[92vw] max-h-[86vh] object-contain rounded-xl"
            style={{ boxShadow: '0 30px 90px rgba(0,0,0,0.65)' }}
            onClick={(e) => e.stopPropagation()}
          />

          {cert < certificates.length - 1 && (
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center z-10 transition-all duration-300"
              style={{ background: 'rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.15)', color: 'rgba(24,24,24,0.8)' }}
              onClick={(e) => { e.stopPropagation(); setCert(cert + 1); }}
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
            {cert + 1} / {certificates.length}
          </div>
        </motion.div>
      )}
    </section>
  );
}
