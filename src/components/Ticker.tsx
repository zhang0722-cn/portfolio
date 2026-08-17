import { motion } from 'framer-motion';

const items = [
  '平面设计',
  '✦',
  '品牌设计',
  '✦',
  'VI系统',
  '✦',
  '字体设计',
  '✦',
  '包装设计',
  '✦',
  '版式设计',
  '✦',
  '招贴设计',
  '✦',
  '书籍装帧',
  '✦',
  'Photoshop',
  '✦',
  'Illustrator',
  '✦',
  'InDesign',
  '✦',
  'Glyphs',
  '✦',
  'Figma',
  '✦',
];

export default function Ticker() {
  const doubled = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden py-4"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(255,255,255,0.015)',
      }}
    >
      {/* Fade masks */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #050505, transparent)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #050505, transparent)' }}
      />

      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-xs font-medium tracking-widest uppercase flex-shrink-0"
            style={{
              color: item === '✦' ? '#a8ff78' : 'rgba(240,240,240,0.25)',
              fontSize: item === '✦' ? '8px' : undefined,
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
