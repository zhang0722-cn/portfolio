import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ResumeViewer({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} role="dialog" aria-modal="true" aria-label="张浩雷的简历预览" className="fixed inset-0 z-[120]" style={{ background: 'rgba(24,24,22,0.94)' }}>
      <div className="flex h-full flex-col p-4 md:p-7">
        <div className="mb-4 flex items-center justify-between gap-4 text-white">
          <div>
            <p className="text-xs tracking-[.16em]" style={{ color: 'rgba(255,255,255,.55)' }}>RESUME</p>
            <h2 className="display mt-1 text-xl font-bold">张浩雷的简历</h2>
          </div>
          <div className="flex items-center gap-3">
            <a href="resume-zhanghaolei-2026.pdf" download="张浩雷的简历.pdf" className="rounded-full px-5 py-2.5 text-sm font-semibold" style={{ background: 'var(--accent)', color: '#fff' }}>下载 PDF</a>
            <button type="button" autoFocus onClick={onClose} aria-label="关闭简历预览" className="flex h-10 w-10 items-center justify-center rounded-full text-2xl" style={{ background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.18)', color: '#fff' }}>×</button>
          </div>
        </div>
        <iframe title="张浩雷的简历 PDF" src="resume-zhanghaolei-2026.pdf#view=FitH" className="min-h-0 flex-1 w-full" style={{ border: '1px solid rgba(255,255,255,.16)', borderRadius: 'var(--radius-lg)', background: '#fff' }} />
      </div>
    </motion.div>
  );
}