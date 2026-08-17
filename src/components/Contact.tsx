import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const contacts = [
  {
    label: '邮箱',
    value: 'zhang07221207@163.com',
    href: 'mailto:zhang07221207@163.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M2.5 5.5h15v10a1 1 0 01-1 1h-13a1 1 0 01-1-1v-10zm0 0l7.5 6.5 7.5-6.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: '电话',
    value: '16643075859',
    href: 'tel:16643075859',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M3 5.5A2.5 2.5 0 015.5 3h1a1 1 0 01.98.8l.6 3a1 1 0 01-.45 1.06l-1.1.73a12 12 0 005.88 5.88l.73-1.1a1 1 0 011.06-.45l3 .6a1 1 0 01.8.98v1A2.5 2.5 0 0116.5 18 13.5 13.5 0 013 5.5z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: '现居',
    value: '江西九江',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6zm0 3.5A2.5 2.5 0 1010 10.5 2.5 2.5 0 0010 5.5z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: '求职意向',
    value: '平面/品牌设计 实习生',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M3 7h14a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1zm4-3h6a1 1 0 011 1v2H6V5a1 1 0 011-1z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [copied, setCopied] = useState<string | null>(null);

  const copyText = async (text: string, key: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(168,255,120,0.06) 0%, rgba(5,5,5,0) 70%), #050505',
      }}
    >
      {/* Top border glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(168,255,120,0.3) 40%, rgba(79,195,247,0.3) 60%, transparent 100%)',
        }}
      />

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Big ambient glow orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,255,120,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1700px] mx-auto px-8 py-32 w-full">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center"
        >
          {/* Label */}
          <div className="flex justify-center mb-10">
            <span className="tag">一起合作吧</span>
          </div>

          {/* Big headline */}
          <h2
            className="text-[clamp(48px,8vw,130px)] font-bold leading-[0.9] tracking-tight mb-10"
            style={{ fontFamily: 'Space Grotesk, "PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif' }}
          >
            <span
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.4) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              期望能
            </span>
            <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #a8ff78 0%, #4fc3f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              跟您共事
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="text-lg max-w-lg mx-auto mb-3 leading-relaxed"
            style={{ color: 'rgba(240,240,240,0.4)' }}
          >
            目前正在寻找平面设计 / 品牌设计方向的实习机会，
            <br />
            一周内可到岗，期待与你的团队一起创作。
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.28, ease: 'easeOut' }}
            className="text-xs max-w-lg mx-auto mb-12 leading-relaxed"
            style={{ color: 'rgba(240,240,240,0.3)' }}
          >
            作品集整理中，面试时可携带源文件或现场展示。
          </motion.p>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.35, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <a
              href="https://mail.163.com/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300"
              style={{ background: '#a8ff78', color: '#050505' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 16px 50px rgba(168,255,120,0.35)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#050505] opacity-40 animate-pulse" />
              发邮件联系我
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M3.5 9h11M10 5l4.5 4L10 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="tel:16643075859"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300"
              style={{
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(240,240,240,0.65)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)';
                (e.currentTarget as HTMLElement).style.color = 'rgba(240,240,240,1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)';
                (e.currentTarget as HTMLElement).style.color = 'rgba(240,240,240,0.65)';
              }}
            >
              电话联系
            </a>
            <a
              href="resume-zhanghaolei.pdf"
              download="张浩雷的简历.pdf"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300"
              style={{ border: '1px solid rgba(168,255,120,0.25)', color: '#a8ff78' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(168,255,120,0.6)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(168,255,120,0.08)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(168,255,120,0.25)';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              下载简历
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v8M4 7l4 4 4-4M3 12v1h10v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>

          {/* Contact cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="group flex flex-col items-center gap-3 p-5 rounded-xl transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(168,255,120,0.25)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(168,255,120,0.05)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                <div
                  className="transition-colors duration-300"
                  style={{ color: 'rgba(240,240,240,0.4)' }}
                >
                  {c.icon}
                </div>
                <div className="text-center">
                  <p
                    className="text-xs uppercase tracking-wider mb-1"
                    style={{ color: 'rgba(240,240,240,0.3)' }}
                  >
                    {c.label}
                  </p>
                  <p
                    className="text-xs font-medium"
                    style={{ color: 'rgba(240,240,240,0.6)' }}
                  >
                    {c.value}
                  </p>
                </div>
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Footer bar */}
      <div
        className="relative z-10 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-[1700px] mx-auto px-8 py-6 flex items-center justify-between">
          <p className="text-xs" style={{ color: 'rgba(240,240,240,0.2)' }}>
            © 2026 张浩雷 · 保留所有权利
          </p>
          <div className="flex items-center gap-6">
            {[
              { name: '邮箱', value: 'zhang07221207@163.com', key: 'email', tip: '点击复制邮箱' },
              { name: '电话', value: '16643075859', key: 'tel', tip: '点击复制电话' },
            ].map((s) => (
              <button
                key={s.key}
                onClick={() => copyText(s.value, s.key)}
                title={s.tip}
                className="text-xs transition-colors duration-200 cursor-pointer"
                style={{ color: 'rgba(240,240,240,0.2)' }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = 'rgba(240,240,240,0.7)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = 'rgba(240,240,240,0.2)')
                }
              >
                {copied === s.key ? '✓ 已复制' : s.name}
              </button>
            ))}
          </div>
          <p className="text-xs" style={{ color: 'rgba(240,240,240,0.2)' }}>
            用心设计与构建 ♥
          </p>
        </div>
      </div>
    </section>
  );
}
