import { useEffect, useState } from 'react';

const groups = [
  ['视觉设计', '海报、宣传物料与版式设计。', ['Photoshop', 'Illustrator', '版式设计']],
  ['品牌识别', 'Logo、标准色、辅助图形与品牌规范。', ['VI 系统', '标志设计', '导视系统']],
  ['字体设计', '字形手稿、数字化转译与字距优化。', ['Glyphs', '字形绘制', '中文字体']],
  ['版式与印刷', '画册、书籍装帧与印刷工艺管控。', ['InDesign', 'CMYK', '书籍装帧']],
  ['AI 辅助设计', 'AI 与 Photoshop 工作流和效果图输出。', ['AI + PS', '风格控制', '快速提案']],
  ['项目与协作', '供应商、规范、汇报和项目统筹。', ['多方协作', '规范制定', '商务谈判']],
];

const tools = [
  ['Photoshop', '熟练'],
  ['Illustrator', '熟练'],
  ['InDesign', '熟练'],
  ['Glyphs', '熟练'],
  ['Figma', '了解'],
  ['AI 工具', '辅助'],
];

const certificates = ['certificates/certificate-01.webp', 'certificates/certificate-02.webp', 'certificates/certificate-03.webp', 'certificates/certificate-04.webp', 'certificates/certificate-05.webp'];

export default function Skills() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowLeft') setActive((cur) => (cur === null ? null : cur > 0 ? cur - 1 : cur));
      if (e.key === 'ArrowRight') setActive((cur) => (cur === null ? null : cur < certificates.length - 1 ? cur + 1 : cur));
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

  const close = () => setActive(null);
  const prev = () => setActive((cur) => (cur === null ? null : cur > 0 ? cur - 1 : cur));
  const next = () => setActive((cur) => (cur === null ? null : cur < certificates.length - 1 ? cur + 1 : cur));

  return (
    <section id="skills" className="py-20 md:py-28" style={{ background: 'var(--paper-raised)' }}>
      <div className="section-shell grid gap-10 lg:grid-cols-[.55fr_1.45fr]">
        <div><p className="eyebrow mb-6">能力范围</p><h2 className="display text-4xl font-bold md:text-6xl">完整设计流程</h2><p className="mt-5 max-w-xl text-sm leading-7" style={{ color: 'var(--muted)' }}>从品牌策略、视觉识别到字体与印刷物料，能够独立推进完整设计流程。</p></div>
        <div className="border-t" style={{ borderColor: 'var(--line)' }}>
          {groups.map(([title, desc, items]) => <article key={title as string} className="grid gap-4 border-b py-5 md:grid-cols-[180px_1fr]" style={{ borderColor: 'var(--line)' }}><h3 className="font-semibold">{title}</h3><div><p className="text-sm leading-7" style={{ color: 'var(--muted)' }}>{desc}</p><div className="mt-3 flex flex-wrap gap-2">{(items as string[]).map((tool) => <span key={tool} className="text-xs" style={{ color: 'var(--accent)' }}>{tool}</span>)}</div></div></article>)}
        </div>
      </div>

      <div className="section-shell mt-12">
        <p className="eyebrow mb-5">常用设计工具</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t border-l" style={{ borderColor: 'var(--line)' }}>
          {tools.map(([name, level]) => (
            <div key={name} className="border-b border-r p-4" style={{ borderColor: 'var(--line)' }}>
              <div className="text-sm font-semibold">{name}</div>
              <div className="mt-2 text-xs" style={{ color: 'var(--accent)' }}>{level}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-shell mt-12">
        <p className="eyebrow mb-5">相关证明</p>
        <p className="mb-6 text-sm leading-7" style={{ color: 'var(--muted)' }}>奖学金与相关证明材料，点击可放大查看。</p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {certificates.map((src, index) => (
            <button key={src} onClick={() => setActive(index)} aria-label={`放大查看相关证明 ${index + 1}`} aria-expanded={active === index} className="overflow-hidden text-left" style={{ borderRadius: 'var(--radius-md)' }}>
              <img src={src} alt={`相关证明 ${index + 1}`} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {active !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6" role="dialog" aria-modal="true" aria-label="相关证明预览" style={{ background: 'rgba(24,24,22,.92)' }} onClick={close}>
          <button className="absolute top-6 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full" aria-label="关闭预览" style={{ background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.25)', color: 'rgba(255,255,255,.85)' }} onClick={(e) => { e.stopPropagation(); close(); }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </button>

          {active > 0 && (
            <button className="absolute left-6 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full" aria-label="上一张" style={{ background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.25)', color: 'rgba(255,255,255,.85)' }} onClick={(e) => { e.stopPropagation(); prev(); }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          )}

          <img src={certificates[active]} alt={`相关证明 ${active + 1}`} className="max-h-[86vh] max-w-[92vw] object-contain" onClick={(event) => event.stopPropagation()} />

          {active < certificates.length - 1 && (
            <button className="absolute right-6 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full" aria-label="下一张" style={{ background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.25)', color: 'rgba(255,255,255,.85)' }} onClick={(e) => { e.stopPropagation(); next(); }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          )}

          <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs" style={{ background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.2)', color: 'rgba(255,255,255,.85)' }}>
            {active + 1} / {certificates.length}
          </div>
        </div>
      )}
    </section>
  );
}
