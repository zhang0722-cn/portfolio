import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden pt-24">
      <div className="section-shell grid min-h-[calc(100vh-6rem)] grid-cols-1 items-center gap-12 py-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease }}>
          <p className="eyebrow mb-8">视觉传达设计 / 江西九江</p>
          <h1 className="display max-w-5xl text-[clamp(64px,11vw,176px)] font-bold leading-[.82]">
            张浩雷
          </h1>
          <p className="mt-8 max-w-xl text-base leading-8" style={{ color: 'var(--muted)' }}>
            品牌视觉识别与字体设计方向本科应届生。关注品牌系统、中文文字与真实物料之间的关系。
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#projects" className="rounded-full px-6 py-3 text-sm font-semibold" style={{ background: 'var(--accent)', color: '#fff' }}>查看项目</a>
            <a href="resume-zhanghaolei.pdf" download="张浩雷的简历.pdf" className="rounded-full border px-6 py-3 text-sm font-semibold" style={{ borderColor: 'var(--line)' }}>下载简历</a>
          </div>
        </motion.div>
        <motion.figure initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease }} className="relative mx-auto w-full max-w-[520px] lg:justify-self-end">
          <div className="overflow-hidden" style={{ borderRadius: 'var(--radius-lg)', background: 'var(--paper-raised)' }}>
            <img src="portrait.jpg" alt="张浩雷" className="aspect-[4/5] w-full object-cover" fetchPriority="high" />
          </div>
          <figcaption className="mt-4 flex justify-between text-xs" style={{ color: 'var(--muted)' }}><span>视觉传达设计</span><span>2026</span></figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
