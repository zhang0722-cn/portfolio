import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const facts = [
  ['教育', '长春科技学院 / 视觉传达设计'],
  ['方向', '平面设计 / 品牌设计'],
  ['城市', '浙江杭州'],
  ['状态', '求职中 / 一周内到岗'],
];

const credentials = ['C1 机动车驾驶证'];

const extra = [
  ['出生日期', '2004.07'],
  ['兴趣爱好', '国际象棋 · 羽毛球'],
  ['到岗时间', '一周以内'],
];

const stats = [
  { value: '30+', label: '文创设计延展', desc: '3大系列海报与30个品类周边' },
  { value: '20款', label: '成功量产', desc: '对接15家厂家实现落地' },
  { value: '80%', label: '产品售出率', desc: '市场销售验证良好' },
];

const courses = [
  '平面设计',
  '品牌策划与VI设计',
  '包装设计实务',
  '版式设计研究',
  '字体设计与图形转换',
  '书籍装帧艺术',
  '招贴设计',
  '标志设计',
  '装饰图案',
  '数字图像处理',
];

const experience = [
  ['2022.09 - 2026.06', '长春科技学院', '视觉传达设计本科，主修平面设计、品牌策划、字体与版式方向。'],
  ['2024', '线上速写训练', '参加为期一个月的线上密集训练，完成每日速写打卡，提升造型能力与手绘表现力。'],
  ['2025.06 - 2025.11', '毕业设计视觉统筹', '制定《毕业设计手册排版规范》，核对28余份毕业设计材料，规划展区动线与视觉导视系统，对接3家印刷供应商实现零差错落地。'],
  ['2026.04 - 2026.05', '杭州聿书堂文化艺术有限公司', '参与「禅黑体」字体设计与「三桥菜市场」品牌视觉重建项目，使用 Glyphs 完成字模曲线调整与字距优化，输出灯牌效果图及制作文件。'],
];

const selfIntro = [
  '我是长春科技学院视觉传达设计专业本科应届毕业生，具备扎实的设计理论基础与良好的审美素养。',
  '熟练掌握 Photoshop、Illustrator、InDesign、Glyphs 等设计工具，拥有字体设计实战经验与品牌视觉全案执行能力，参与原创中文字体「禅黑体」的设计开发。',
  '性格细致沉稳，具备优秀的沟通协调与项目管理意识，善于在复杂任务中建立规范、推动协作。热爱设计行业，保持持续学习与创作热情。',
];

function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .7 }}>{children}</motion.div>;
}

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="section-shell">
        <p className="eyebrow mb-12">关于我</p>
        <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr]">
          {/* 左栏：信息事实 */}
          <Reveal>
            <div className="border-t" style={{ borderColor: 'var(--line)' }}>
              {facts.map(([label, value]) => <div key={label} className="grid grid-cols-[72px_1fr] border-b py-4 text-sm" style={{ borderColor: 'var(--line)' }}><span style={{ color: 'var(--muted)' }}>{label}</span><span>{value}</span></div>)}
            </div>
            <div className="mt-10">
              <p className="eyebrow mb-4">荣誉证书</p>
              <div className="flex flex-wrap gap-2">
                {credentials.map((c) => <span key={c} className="text-xs px-3 py-1.5" style={{ color: 'var(--accent)', border: '1px solid var(--line)', borderRadius: 'var(--radius-md)' }}>{c}</span>)}
              </div>
            </div>
            <div className="mt-10 border-t" style={{ borderColor: 'var(--line)' }}>
              <p className="eyebrow pt-4 mb-4">其他信息</p>
              {extra.map(([label, value]) => <div key={label} className="grid grid-cols-[72px_1fr] border-b py-3 text-sm" style={{ borderColor: 'var(--line)' }}><span style={{ color: 'var(--muted)' }}>{label}</span><span>{value}</span></div>)}
            </div>
          </Reveal>

          {/* 右栏：编辑式叙事 */}
          <Reveal>

            <div className="mt-8 space-y-3 text-[15px] leading-7" style={{ color: 'var(--muted)' }}>
              {selfIntro.map((p) => <p key={p}>{p}</p>)}
            </div>

            <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="border-t pt-5" style={{ borderColor: 'var(--line)' }}>
                  <div className="text-3xl font-bold" style={{ color: 'var(--accent)', fontFamily: 'Space Grotesk' }}>{s.value}</div>
                  <div className="mt-2 text-sm font-semibold">{s.label}</div>
                  <div className="mt-1 text-xs" style={{ color: 'var(--muted)' }}>{s.desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 border-t" style={{ borderColor: 'var(--line)' }}>
              {experience.map(([date, title, desc]) => <article key={date} className="grid gap-3 border-b py-5 md:grid-cols-[150px_1fr]" style={{ borderColor: 'var(--line)' }}><time className="text-xs" style={{ color: 'var(--muted)' }}>{date}</time><div><h3 className="font-semibold">{title}</h3><p className="mt-2 max-w-2xl text-sm leading-7" style={{ color: 'var(--muted)' }}>{desc}</p></div></article>)}
            </div>

            <div className="mt-10 border-t pt-6" style={{ borderColor: 'var(--line)' }}>
              <p className="eyebrow mb-5">主修课程</p>
              <div className="flex flex-wrap gap-2">
                {courses.map((c) => <span key={c} className="text-xs px-3 py-1.5" style={{ color: 'var(--muted)', border: '1px solid var(--line)', borderRadius: 'var(--radius-md)' }}>{c}</span>)}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
