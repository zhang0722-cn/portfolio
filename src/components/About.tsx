import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { value: '30+', label: '文创设计延展', desc: '3大系列海报与30个品类周边', color: '#4fc3f7' },
  { value: '20款', label: '成功量产', desc: '对接15家厂家实现落地', color: '#a855f7' },
  { value: '80%', label: '产品售出率', desc: '市场销售验证良好', color: '#f472b6' },
];

const experience = [
  {
    period: '2022.09 — 2026.06',
    role: '视觉传达设计 · 本科',
    company: '长春科技学院',
    desc: '视觉传达设计专业本科，主修平面设计、品牌策划、字体与版式等方向。',
    color: '#a855f7',
  },
  {
    period: '2024',
    role: '「速写班长」线上速写训练',
    company: '线上密集训练 · 每日打卡',
    desc: '参加为期一个月的线上密集训练，完成每日速写打卡，提升造型能力与手绘表现力。',
    color: '#fb923c',
  },
  {
    period: '2025.06 — 2025.11',
    role: '毕业设计展视觉统筹与执行',
    company: '龙虎山文旅品牌项目',
    desc: '制定《毕业设计手册排版规范》，核对28余份毕业设计材料，规划展区动线与视觉导视系统，对接3家印刷供应商实现零差错落地。',
    color: '#4fc3f7',
  },
  {
    period: '2026.04 — 2026.05',
    role: '设计实习生',
    company: '杭州聿书堂文化艺术有限公司',
    desc: '参与「禅黑体」字体设计与「三桥菜市场」品牌视觉重建项目，使用 Glyphs 完成字模曲线调整与字距优化，输出灯牌效果图及制作文件。',
    color: '#a8ff78',
  },
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

export default function About() {
  return (
    <section
      id="about"
      className="relative py-32"
      style={{ background: '#050505' }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative max-w-[1700px] mx-auto px-8">
        {/* Section label */}
        <FadeIn>
          <div className="flex items-center gap-4 mb-16">
            <span className="tag">关于我</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>
        </FadeIn>

        {/* Layout: portrait left | content right */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-16 items-start">
          {/* Portrait col */}
          <FadeIn delay={0.08}>
            <div className="sticky top-24 flex flex-col gap-4">
              {/* Image card */}
              {/* Double-Bezel 外圈层 */}
              <div
                className="p-1.5 rounded-[1.75rem]"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08)',
                }}
              >
                <div
                  className="relative w-full rounded-[1.6rem] overflow-hidden"
                  style={{
                    aspectRatio: '3/4',
                    background: '#0a0a0c',
                    boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.04)',
                  }}
                >
                <img
                  src="portrait.jpg"
                  alt="张浩雷的照片"
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(15%) contrast(1.06)' }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.05) 55%, transparent 100%)',
                  }}
                />
                {/* Name badge */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-bold text-xl" style={{ fontFamily: 'Space Grotesk' }}>
                    张浩雷
                  </p>
                  <p className="text-xs tracking-wider uppercase mt-1" style={{ color: '#a8ff78' }}>
                    平面设计 · 品牌设计 实习生
                  </p>
                </div>
                {/* Top-right corner badge */}
                <div
                  className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full font-mono"
                  style={{
                    background: 'rgba(5,5,5,0.7)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.5)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  江西九江
                </div>
                </div>
              </div>

              {/* Contact card */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: '#0a0a0c',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#8a8f9e' }}>
                  联系方式
                </p>
                <div className="space-y-1">
                  {[
                    { icon: '✉', text: 'zhang07221207@163.com', href: 'mailto:zhang07221207@163.com' },
                    { icon: '📞', text: '16643075859', href: 'tel:16643075859' },
                    { icon: '📍', text: '江西九江', href: '#' },
                    { icon: '💼', text: '实习生 · 平面/品牌设计', href: '#' },
                  ].map((item) => (
                    <a
                      key={item.text}
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200"
                      style={{ color: 'rgba(240,240,240,0.45)' }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = 'rgba(240,240,240,1)';
                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = 'rgba(240,240,240,0.45)';
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                      }}
                    >
                      <span>{item.icon}</span>
                      <span>{item.text}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* 荣誉证书 */}
              <div className="rounded-xl p-5" style={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#8a8f9e' }}>
                  荣誉证书
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="tag">C1 机动车驾驶证</span>
                </div>
              </div>

              {/* 其他信息 */}
              <div className="rounded-xl p-5" style={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#8a8f9e' }}>
                  其他信息
                </p>
                <div className="space-y-2.5 text-sm" style={{ color: 'rgba(240,240,240,0.55)' }}>
                  <div className="flex items-center justify-between">
                    <span style={{ color: 'rgba(240,240,240,0.35)' }}>出生日期</span>
                    <span className="font-medium" style={{ color: 'rgba(240,240,240,0.75)' }}>2004.07</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: 'rgba(240,240,240,0.35)' }}>兴趣爱好</span>
                    <span className="font-medium" style={{ color: 'rgba(240,240,240,0.75)' }}>国际象棋 · 羽毛球</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: 'rgba(240,240,240,0.35)' }}>到岗时间</span>
                    <span className="font-medium" style={{ color: 'rgba(240,240,240,0.75)' }}>一周以内</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Content col */}
          <div className="flex flex-col gap-14">
            {/* Headline + bio */}
            <FadeIn delay={0.14}>
              <div>
                <h2
                  className="text-4xl xl:text-5xl font-bold leading-tight mb-8"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  <span className="text-white">设计师、创作者，</span>
                  <br />
                  <span style={{ color: 'rgba(240,240,240,0.3)' }}>也是品牌的</span>
                  <span
                    style={{
                      background: 'linear-gradient(90deg, #a8ff78, #4fc3f7)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    策略思考者。
                  </span>
                </h2>
                <div className="space-y-4 text-[15px] leading-relaxed" style={{ color: 'rgba(240,240,240,0.48)' }}>
                  <p>
                    我是长春科技学院视觉传达设计专业本科应届毕业生，具备扎实的设计理论基础与良好的审美素养。
                  </p>
                  <p>
                    熟练掌握 Photoshop、Illustrator、InDesign、Glyphs 等设计工具，拥有字体设计实战经验
                    与品牌视觉全案执行能力，参与原创中文字体「禅黑体」的设计开发。
                  </p>
                  <p>
                    性格细致沉稳，具备优秀的沟通协调与项目管理意识，善于在复杂任务中建立规范、推动协作。
                    热爱设计行业，保持持续学习与创作热情。
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Stats */}
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="relative p-5 rounded-xl overflow-hidden group transition-all duration-300"
                    style={{
                      background: '#0a0a0c',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${s.color}30`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                    }}
                  >
                    <div
                      className="text-3xl font-bold mb-1.5"
                      style={{
                        fontFamily: 'Space Grotesk',
                        color: s.color,
                      }}
                    >
                      {s.value}
                    </div>
                    <div className="text-xs font-semibold text-white mb-1">{s.label}</div>
                    <div className="text-xs" style={{ color: 'rgba(240,240,240,0.3)' }}>
                      {s.desc}
                    </div>
                    {/* Bottom accent */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                      style={{ background: s.color }}
                    />
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Experience timeline */}
            <FadeIn delay={0.28}>
              <div>
                <p className="text-xs uppercase tracking-widest mb-8" style={{ color: '#8a8f9e' }}>
                  教育背景与经历
                </p>
                <div className="space-y-0">
                  {experience.map((exp, i) => (
                    <div key={i} className="relative flex gap-6 pb-10 last:pb-0 group">
                      {i < experience.length - 1 && (
                        <div
                          className="absolute left-[4px] top-5 bottom-0 w-px"
                          style={{ background: 'rgba(255,255,255,0.06)' }}
                        />
                      )}
                      {/* Dot */}
                      <div className="flex-shrink-0 mt-1.5 relative z-10">
                        <div
                          className="w-2.5 h-2.5 rounded-full border-2 transition-all duration-300"
                          style={{
                            borderColor: exp.color,
                            background: '#050505',
                          }}
                        />
                      </div>
                      {/* Body */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 mb-2">
                          <div>
                            <h4 className="text-sm font-bold text-white">{exp.role}</h4>
                            <p className="text-xs font-medium mt-0.5" style={{ color: exp.color }}>
                              {exp.company}
                            </p>
                          </div>
                          <span
                            className="text-xs font-mono px-2.5 py-1 rounded-md flex-shrink-0"
                            style={{
                              background: 'rgba(255,255,255,0.04)',
                              border: '1px solid rgba(255,255,255,0.07)',
                              color: 'rgba(240,240,240,0.35)',
                            }}
                          >
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,240,240,0.42)' }}>
                          {exp.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* 主修课程 */}
            <FadeIn delay={0.34}>
              <div>
                <p className="text-xs uppercase tracking-widest mb-6" style={{ color: '#8a8f9e' }}>
                  主修课程
                </p>
                <div className="flex flex-wrap gap-2">
                  {['平面设计', '品牌策划与VI设计', '包装设计实务', '版式设计研究', '字体设计与图形转换', '书籍装帧艺术', '招贴设计', '标志设计', '装饰图案', '数字图像处理'].map((c) => (
                    <span key={c} className="tag">{c}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
