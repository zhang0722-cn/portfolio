import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const capabilities = [
  ['品牌识别', 'Logo、VI、导视与品牌规范'],
  ['字体设计', '手稿、数字化与字距优化'],
  ['物料落地', '印刷、供应商与制作文件'],
];

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-20">
      <div className="section-shell grid grid-cols-1 items-center gap-10 py-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-14 lg:py-14">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease }}>
          <p className="eyebrow mb-5">视觉传达设计 / 江西九江</p>
          <h1 className="display max-w-5xl text-[clamp(64px,11vw,176px)] font-bold leading-[.82]">
            张浩雷
          </h1>
          <div className="mt-6 max-w-2xl space-y-2 text-[15px] leading-7" style={{ color: 'var(--muted)' }}>
            <p>视觉传达设计专业本科应届生，专注品牌视觉识别、中文文字设计与可落地的商业物料。</p>
            <p>参与原创中文字体「禅黑体」开发，并完成龙虎山文旅品牌全案、三桥菜市场视觉重建等项目。</p>
          </div>
          <div className="mt-7 grid gap-3 border-t pt-5 sm:grid-cols-3" style={{ borderColor: 'var(--line)' }}>
            {capabilities.map(([title, desc]) => (
              <div key={title}>
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-1 text-xs leading-5" style={{ color: 'var(--muted)' }}>{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="rounded-full px-6 py-3 text-sm font-semibold" style={{ background: 'var(--accent)', color: '#fff' }}>查看项目</a>
            <a href="resume-zhanghaolei.pdf" download="张浩雷的简历.pdf" className="rounded-full border px-6 py-3 text-sm font-semibold" style={{ borderColor: 'var(--line)' }}>下载简历</a>
          </div>
        </motion.div>
        <motion.figure initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease }} className="relative mx-auto w-full max-w-[520px] lg:justify-self-end">
          <div className="overflow-hidden" style={{ borderRadius: 'var(--radius-lg)', background: 'var(--paper-raised)' }}>
            <img src="portrait.jpg" alt="张浩雷" className="aspect-[4/5] w-full object-cover" fetchPriority="high" />
          </div>
          <figcaption className="mt-3 flex justify-between text-xs" style={{ color: 'var(--muted)' }}><span>视觉传达设计</span><span>2026</span></figcaption>
        </motion.figure>
      </div>
    </section>
  );
}