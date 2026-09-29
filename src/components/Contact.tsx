import { useState } from 'react';

const contacts = [
  { label: '邮箱', value: 'zhang07221207@163.com', href: 'mailto:zhang07221207@163.com' },
  { label: '电话', value: '16643075859', href: 'tel:16643075859' },
  { label: '现居', value: '江西九江', href: '#' },
  { label: '求职意向', value: '平面/品牌设计 实习生', href: '#' },
];

export default function Contact() {
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
    <section id="contact">
      <div className="section-shell grid min-h-screen grid-cols-1 items-center gap-16 py-28 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <p className="eyebrow mb-6">联系</p>
          <h2 className="display max-w-4xl text-5xl font-bold leading-[.95] md:text-8xl">有合适的岗位或项目，直接联系我。</h2>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="mailto:zhang07221207@163.com" className="rounded-full px-6 py-3 font-semibold" style={{ background: 'var(--accent)', color: '#fff' }}>发送邮件</a>
            <a href="resume-zhanghaolei.pdf" download="张浩雷的简历.pdf" className="rounded-full border px-6 py-3 font-semibold" style={{ borderColor: 'var(--line)' }}>下载简历</a>
          </div>
        </div>
        <div className="border-t" style={{ borderColor: 'var(--line)' }}>
          {contacts.map((item) => (
            <a key={item.label} href={item.href} className="grid grid-cols-[90px_1fr] border-b py-5 text-sm" style={{ borderColor: 'var(--line)' }}>
              <span style={{ color: 'var(--muted)' }}>{item.label}</span>
              <span>{item.value}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="section-shell flex items-center justify-between py-6">
          <p className="text-xs" style={{ color: 'var(--muted)' }}>© 2026 张浩雷 · 保留所有权利</p>
          <div className="flex items-center gap-6">
            {[
              { name: '邮箱', value: 'zhang07221207@163.com', key: 'email', tip: '点击复制邮箱' },
              { name: '电话', value: '16643075859', key: 'tel', tip: '点击复制电话' },
            ].map((s) => (
              <button key={s.key} onClick={() => copyText(s.value, s.key)} title={s.tip} className="text-xs cursor-pointer" style={{ color: 'var(--muted)' }}>
                {copied === s.key ? '✓ 已复制' : s.name}
              </button>
            ))}
          </div>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>用心设计与构建 ♥</p>
        </div>
      </div>
    </section>
  );
}