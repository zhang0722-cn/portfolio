import { useState } from 'react';

const contacts = [
  { label: '邮箱', value: 'zhang07221207@163.com', href: 'mailto:zhang07221207@163.com' },
  { label: '电话', value: '16643075859', href: 'tel:16643075859' },
  { label: '现居', value: '浙江杭州', href: '#' },
  { label: '求职意向', value: '平面/品牌设计 助理', href: '#' },
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
      <div className="section-shell grid grid-cols-1 items-start gap-10 py-20 lg:grid-cols-[1.15fr_.85fr] lg:gap-14 lg:py-24">
        <div>
          <p className="eyebrow mb-6">联系</p>
          <p className="mt-6 max-w-2xl text-base leading-8" style={{ color: 'var(--muted)' }}>求职方向为平面设计、品牌设计或视觉设计实习生岗位，也接受品牌、字体与印刷物料相关项目合作。</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="mailto:zhang07221207@163.com" className="rounded-full px-6 py-3 font-semibold" style={{ background: 'var(--accent)', color: '#fff' }}>发送邮件</a>
            <a href="resume-zhanghaolei-2026.pdf" download="张浩雷的简历.pdf" className="rounded-full border px-6 py-3 font-semibold" style={{ borderColor: 'var(--line)' }}>下载简历</a>
          </div>
        </div>
        <div className="space-y-8">
          <div className="border-t" style={{ borderColor: 'var(--line)' }}>
            {contacts.map((item) => (
              <a key={item.label} href={item.href} className="grid grid-cols-[90px_1fr] border-b py-4 text-sm" style={{ borderColor: 'var(--line)' }}>
                <span style={{ color: 'var(--muted)' }}>{item.label}</span>
                <span>{item.value}</span>
              </a>
            ))}
          </div>
          <div className="border-t pt-6" style={{ borderColor: 'var(--line)' }}>
            <div className="flex items-start gap-5">
              <img src="wechat-qr.png" alt="张浩雷微信二维码" loading="lazy" className="h-28 w-28 shrink-0 object-contain" />
              <div>
                <p className="font-semibold">微信联系</p>
                <p className="mt-2 text-sm leading-7" style={{ color: 'var(--muted)' }}>扫码添加微信，备注求职或项目合作即可。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="section-shell flex flex-col items-start gap-4 py-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
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