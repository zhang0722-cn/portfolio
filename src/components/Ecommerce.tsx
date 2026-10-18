import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ResponsiveImage from './ResponsiveImage';

type Artwork = {
  src: string;
  title: string;
  meta: string;
  alt: string;
  span: string;
  sizes: string;
};

const campaignArtworks: Artwork[] = [
  {
    src: 'ecommerce/ecommerce-campaign-kv.jpeg',
    title: '活动横幅 KV',
    meta: '活动主视觉 · 16:9',
    alt: '黄色背景的披萨促销活动横幅',
    span: 'lg:col-span-8',
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 67vw',
  },
  {
    src: 'ecommerce/ecommerce-promo-poster.jpeg',
    title: '促销活动页',
    meta: '下单转化 · 9:16',
    alt: '黄色背景的披萨促销活动页面，展示价格与下单按钮',
    span: 'lg:col-span-4',
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  },
];

const onlineArtworks: Artwork[] = [
  {
    src: 'ecommerce/ecommerce-product-poster.jpeg',
    title: '新品食欲海报',
    meta: '产品视觉 · 9:16',
    alt: '披萨与虾、牛油果等食材组合的新品竖版海报',
    span: 'lg:col-span-3',
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
  },
  {
    src: 'ecommerce/ecommerce-detail-screen.jpeg',
    title: '商品详情首屏',
    meta: '电商详情 · 9:16',
    alt: '展示披萨卖点与配料的商品详情页首屏',
    span: 'lg:col-span-3',
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
  },
  {
    src: 'ecommerce/ecommerce-mobile-store.jpeg',
    title: '外卖活动页',
    meta: '移动端转化 · 9:16',
    alt: '披萨外卖活动页面设计',
    span: 'lg:col-span-3',
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
  },
  {
    src: 'ecommerce/ecommerce-short-video.jpeg',
    title: '短视频封面',
    meta: '内容传播 · 9:16',
    alt: '披萨产品短视频竖版封面',
    span: 'lg:col-span-3',
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
  },
];

const touchpointArtworks: Artwork[] = [
  {
    src: 'ecommerce/ecommerce-packaging.jpeg',
    title: '外带包装',
    meta: '包装应用 · 4:3',
    alt: '披萨外卖盒、手提袋和纸张组成的包装展示',
    span: 'lg:col-span-6',
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw',
  },
  {
    src: 'ecommerce/ecommerce-coupon-a.jpeg',
    title: '优惠兑换卡',
    meta: '促销物料 · 3:2',
    alt: '披萨品牌优惠兑换卡设计',
    span: 'lg:col-span-3',
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
  },
  {
    src: 'ecommerce/ecommerce-flyer.jpeg',
    title: '纸质宣传单',
    meta: '印刷物料 · 7:10',
    alt: '包含披萨产品、品牌信息与二维码的纸质宣传单',
    span: 'lg:col-span-3',
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
  },
];

function ArtworkFigure({ artwork, index }: { artwork: Artwork; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-70px' });

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.05 }}
      className={artwork.span}
    >
      <div className="group overflow-hidden" style={{ background: 'var(--paper)', borderRadius: 'var(--radius-lg)' }}>
        <ResponsiveImage
          src={artwork.src}
          sizes={artwork.sizes}
          alt={artwork.alt}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.015]"
        />
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-4 border-t pt-3" style={{ borderColor: 'var(--line)' }}>
        <span className="text-sm font-semibold">{artwork.title}</span>
        <span className="text-xs whitespace-nowrap" style={{ color: 'var(--muted)' }}>{artwork.meta}</span>
      </figcaption>
    </motion.figure>
  );
}

function ArtworkGroup({ label, artworks }: { label: string; artworks: Artwork[] }) {
  return (
    <div className="mt-20">
      <div className="mb-7 flex items-center gap-4">
        <p className="eyebrow">{label}</p>
        <div className="h-px flex-1" style={{ background: 'var(--line)' }} />
      </div>
      <div className="grid grid-cols-1 items-start gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-12">
        {artworks.map((artwork, index) => <ArtworkFigure key={artwork.src} artwork={artwork} index={index} />)}
      </div>
    </div>
  );
}

export default function Ecommerce() {
  return (
    <main className="min-h-screen pb-28 pt-32 md:pt-36" style={{ background: 'var(--paper-raised)' }}>
      <div className="section-shell">
        <a href="#projects" className="eyebrow mb-12 inline-block">← 返回精选项目</a>
        <header className="grid gap-8 border-b pb-8 lg:grid-cols-[1fr_420px]" style={{ borderColor: 'var(--line)' }}>
          <div>
            <p className="eyebrow mb-5">电商视觉 / CONCEPT CASE</p>
            <h2 className="display max-w-4xl text-4xl font-bold leading-[.95] md:text-7xl">从一张披萨主视觉，<br />延展到每个下单触点。</h2>
          </div>
          <div className="self-end">
            <p className="text-sm leading-7" style={{ color: 'var(--muted)' }}>围绕披萨新品整理首页横幅、促销内容、商品详情与外带物料。明亮的芝士黄、番茄红和大字号产品文案建立识别，再依据横幅、手机页面与印刷物料的比例调整信息层级。</p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs" style={{ color: 'var(--accent)' }}>
              <span>品牌概念</span><span>活动转化</span><span>线上线下延展</span>
            </div>
          </div>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.45fr_.55fr]">
          <figure>
            <div className="overflow-hidden" style={{ background: '#e9dfd1', borderRadius: 'var(--radius-lg)' }}>
              <ResponsiveImage src="ecommerce/ecommerce-hero-kv.jpeg" sizes="(max-width: 1024px) 100vw, 65vw" alt="披萨新品首页横幅主视觉，展示促销信息和披萨产品" fetchPriority="high" className="block h-auto w-full" />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-4 border-t pt-3" style={{ borderColor: 'var(--line)' }}>
              <span className="text-sm font-semibold">首页横幅 KV</span>
              <span className="text-xs" style={{ color: 'var(--muted)' }}>首屏主视觉 · 16:9</span>
            </figcaption>
          </figure>
          <aside className="flex flex-col justify-between border-t pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0" style={{ borderColor: 'var(--line)' }}>
            <div>
              <span className="text-xs" style={{ color: 'var(--accent)' }}>01 / 视觉方向</span>
              <p className="mt-4 text-lg leading-8">热辣、饱满，一眼看见食欲。</p>
              <p className="mt-3 text-sm leading-7" style={{ color: 'var(--muted)' }}>突出拉丝芝士和馅料卖点，让产品、优惠与下单信息在不同触点里保持清晰。</p>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-4 border-t pt-5 text-xs" style={{ borderColor: 'var(--line)' }}>
              <div><dt style={{ color: 'var(--muted)' }}>视觉应用</dt><dd className="mt-2 text-2xl font-bold" style={{ fontFamily: 'Space Grotesk' }}>10</dd></div>
              <div><dt style={{ color: 'var(--muted)' }}>画面比例</dt><dd className="mt-2 text-2xl font-bold" style={{ fontFamily: 'Space Grotesk' }}>5</dd></div>
            </dl>
          </aside>
        </div>

        <ArtworkGroup label="02 / 活动与转化" artworks={campaignArtworks} />
        <ArtworkGroup label="03 / 线上内容" artworks={onlineArtworks} />
        <ArtworkGroup label="04 / 包装与物料" artworks={touchpointArtworks} />

        <div className="mt-16 flex flex-col gap-4 border-t pt-5 text-xs sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}>
          <span>电商视觉概念提案 · 即梦素材整理</span>
          <span>适用于首页、活动页、外卖包装与印刷物料</span>
        </div>
      </div>
    </main>
  );
}
