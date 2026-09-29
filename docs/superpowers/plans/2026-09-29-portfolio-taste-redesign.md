# Portfolio Taste Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the confirmed premium editorial redesign to the portfolio while preserving all project data, routes, contact details, and GitHub Pages deployment behavior.

**Architecture:** Keep the existing React, Vite, Tailwind, and Framer Motion structure. Establish shared visual tokens in `src/index.css`, then replace repetitive component chrome with editorial layouts that prioritize real project images and clear hierarchy.

**Tech Stack:** React 19, TypeScript, Vite 7, Tailwind CSS 4, Framer Motion, Lucide React.

**Spec:** `docs/superpowers/specs/2026-09-29-portfolio-taste-redesign-design.md`

## Global Constraints

- Keep the existing `#EA580C` accent and one light theme across the entire site.
- Do not change project routes, anchor IDs, project data, contact details, or resume content.
- Do not add runtime dependencies.
- Do not generate replacement artwork; use existing `public/` assets.
- No em-dash character in visible page copy.
- No particle canvas, infinite marquee, gradient text, decorative glow, custom cursor, or repeated double-bezel cards.
- Use `DESIGN_VARIANCE: 7`, `MOTION_INTENSITY: 6`, `VISUAL_DENSITY: 3`.
- Support `prefers-reduced-motion`.
- Mobile layouts must collapse explicitly below 768px.

---

### Task 1: Create a clean local workspace and shared visual tokens

**Files:**
- Clone to: `E:\个人网页\portfolio-editorial`
- Modify: `src/index.css`
- Verify: `package.json`, `pnpm-lock.yaml`, `vite.config.ts`

**Interfaces:**
- Consumes: existing Vite/Tailwind setup.
- Produces: CSS tokens `--paper`, `--paper-raised`, `--ink`, `--muted`, `--accent`, `--line`, `--radius-lg`, `--radius-md`, `--ease-premium`; utility classes `.section-shell`, `.eyebrow`, `.display`, `.hairline`.

- [ ] **Step 1: Clone without the broken local Git proxy**

```powershell
git -c 'http.https://github.com.proxy=' clone https://github.com/zhang0722-cn/portfolio.git 'E:\个人网页\portfolio-editorial'
Set-Location 'E:\个人网页\portfolio-editorial'
pnpm install --frozen-lockfile
```

Expected: clone succeeds and `pnpm-lock.yaml` is reported up to date.

- [ ] **Step 2: Add a static check for the first design contract**

```powershell
$required = @('--paper:', '--ink:', '--accent:', '.section-shell', '.display', 'prefers-reduced-motion')
$text = Get-Content src/index.css -Raw
$missing = $required | Where-Object { $text -notmatch [regex]::Escape($_) }
if ($missing) { throw "Missing design tokens: $($missing -join ', ')" }
```

Expected before implementation: FAIL with missing token names.

- [ ] **Step 3: Replace the token and base-style section in `src/index.css`**

```css
:root {
  --paper: #F1F0EC;
  --paper-raised: #F7F6F2;
  --ink: #181816;
  --muted: #696762;
  --accent: #EA580C;
  --line: rgba(24, 24, 24, 0.12);
  --radius-lg: 22px;
  --radius-md: 14px;
  --ease-premium: cubic-bezier(0.22, 1, 0.36, 1);
}

body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

.section-shell {
  width: min(1480px, calc(100% - 40px));
  margin-inline: auto;
}

.display {
  font-family: 'Space Grotesk', 'Noto Sans SC', sans-serif;
  letter-spacing: -0.045em;
}

.eyebrow {
  color: var(--muted);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.hairline {
  border-color: var(--line);
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 4: Run the design-token check and production build**

```powershell
$required = @('--paper:', '--ink:', '--accent:', '.section-shell', '.display', 'prefers-reduced-motion')
$text = Get-Content src/index.css -Raw
$missing = $required | Where-Object { $text -notmatch [regex]::Escape($_) }
if ($missing) { throw "Missing design tokens: $($missing -join ', ')" }
pnpm build
```

Expected: no missing tokens and Vite build exits successfully.

- [ ] **Step 5: Commit**

```powershell
git add src/index.css
git commit -m '重构作品集全局视觉变量'
```

---

### Task 2: Simplify the application shell and navigation

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/Navbar.tsx`
- Delete: `src/components/Ticker.tsx`

**Interfaces:**
- Consumes: `.section-shell`, `.display`, `.hairline` from Task 1.
- Produces: one navigation component with sections `关于`, `项目`, `技能`, `联系`; desktop and mobile menus remain available.

- [ ] **Step 1: Add a failing structural check**

```powershell
$app = Get-Content src/App.tsx -Raw
$nav = Get-Content src/components/Navbar.tsx -Raw
if ($app -match 'Ticker') { throw 'Ticker still imported' }
if ($nav -match 'animated-border|backdropFilter') { throw 'Legacy navigation chrome still present' }
```

Expected before implementation: FAIL because `Ticker` and legacy chrome exist.

- [ ] **Step 2: Remove Ticker from `src/App.tsx`**

```tsx
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ProjectDetail from './components/ProjectDetail';

type Route = { page: 'home' } | { page: 'project'; id: string | null };

function getRoute(): Route {
  const match = window.location.hash.match(/^#\/project\/([^/]+)/);
  return match ? { page: 'project', id: match[1] } : { page: 'home' };
}

export default function App() {
  const [route, setRoute] = useState<Route>(getRoute);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute());
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash.startsWith('project/')) window.scrollTo(0, 0);
      else if (hash) setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 60);
      else window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <Navbar />
      {route.page === 'project' ? <ProjectDetail id={route.id} /> : (
        <main><Hero /><About /><Projects /><Skills /><Contact /></main>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Replace `src/components/Navbar.tsx` with the thin editorial navigation**

```tsx
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const links = [
  { label: '关于', href: '#about' },
  { label: '项目', href: '#projects' },
  { label: '技能', href: '#skills' },
  { label: '联系', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="section-shell">
          <div className="flex h-[72px] items-center justify-between border-b" style={{ borderColor: scrolled ? 'var(--line)' : 'transparent', background: scrolled ? 'rgba(247,246,242,.88)' : 'transparent', backdropFilter: scrolled ? 'blur(18px)' : 'none' }}>
            <a href="#hero" className="display text-sm font-bold tracking-[.08em]">张浩雷 / ZHANG HAOLEI</a>
            <nav className="hidden items-center gap-8 md:flex">
              {links.map((link) => <a key={link.label} href={link.href} className="text-xs font-medium tracking-[.12em]" style={{ color: 'var(--muted)' }}>{link.label}</a>)}
            </nav>
            <div className="hidden items-center gap-5 md:flex">
              <span className="text-xs" style={{ color: 'var(--muted)' }}>求职中</span>
              <a href="resume-zhanghaolei.pdf" download="张浩雷的简历.pdf" className="rounded-full px-4 py-2 text-xs font-semibold" style={{ background: 'var(--accent)', color: '#fff' }}>下载简历</a>
            </div>
            <button className="md:hidden" aria-label="菜单" onClick={() => setOpen(!open)}><span className="display text-xl">{open ? '×' : '菜单'}</span></button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 flex flex-col justify-end gap-3 px-6 pb-16 md:hidden" style={{ background: 'rgba(247,246,242,.96)' }}>
          {links.map((link) => <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="display border-b py-4 text-4xl font-bold" style={{ borderColor: 'var(--line)' }}>{link.label}</a>)}
          <a href="resume-zhanghaolei.pdf" download="张浩雷的简历.pdf" className="mt-5 rounded-full px-5 py-3 text-center font-semibold" style={{ background: 'var(--accent)', color: '#fff' }}>下载简历</a>
        </motion.div>}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 4: Delete Ticker, run checks, and build**

```powershell
Remove-Item src/components/Ticker.tsx
$app = Get-Content src/App.tsx -Raw
$nav = Get-Content src/components/Navbar.tsx -Raw
if ($app -match 'Ticker') { throw 'Ticker still imported' }
if ($nav -match 'animated-border|backdropFilter') { throw 'Legacy navigation chrome still present' }
pnpm build
```

Expected: check passes and build succeeds.

- [ ] **Step 5: Commit**

```powershell
git add src/App.tsx src/components/Navbar.tsx src/components/Ticker.tsx
git commit -m '精简全站导航与页面外壳'
```

---

### Task 3: Rebuild the Hero around the real portrait

**Files:**
- Modify: `src/components/Hero.tsx`

**Interfaces:**
- Consumes: design tokens from Task 1 and navbar height of `72px`.
- Produces: `#hero` section with portrait image and CTAs linking to `#projects` and `resume-zhanghaolei.pdf`.

- [ ] **Step 1: Add a failing Hero contract check**

```powershell
$hero = Get-Content src/components/Hero.tsx -Raw
if ($hero -match 'canvas|requestAnimationFrame|Motion<|radial-gradient') { throw 'Legacy Hero effects still present' }
if ($hero -notmatch 'portrait.jpg' -or $hero -notmatch 'fetchPriority') { throw 'Portrait-led Hero missing' }
```

Expected before implementation: FAIL because the canvas and decorative gradients still exist.

- [ ] **Step 2: Replace Hero with the portrait-led asymmetric layout**

```tsx
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
          <div className="mt-14 flex gap-10 border-t pt-6" style={{ borderColor: 'var(--line)' }}>
            {[['30+', '文创延展'], ['20', '量产落地'], ['80%', '售出率']].map(([value, label]) => <div key={label}><div className="display text-2xl font-bold">{value}</div><div className="mt-1 text-xs" style={{ color: 'var(--muted)' }}>{label}</div></div>)}
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
```

- [ ] **Step 3: Run the Hero check and build**

```powershell
$hero = Get-Content src/components/Hero.tsx -Raw
if ($hero -match 'canvas|requestAnimationFrame|Motion<|radial-gradient') { throw 'Legacy Hero effects still present' }
if ($hero -notmatch 'portrait.jpg' -or $hero -notmatch 'fetchPriority') { throw 'Portrait-led Hero missing' }
pnpm build
```

Expected: check passes and build succeeds.

- [ ] **Step 4: Commit**

```powershell
git add src/components/Hero.tsx
git commit -m '重构首页为作品集编辑式首屏'
```

---

### Task 4: Rebuild About and Skills as editorial information systems

**Files:**
- Modify: `src/components/About.tsx`
- Modify: `src/components/Skills.tsx`

**Interfaces:**
- Consumes: `.section-shell`, `.eyebrow`, `.display`, `.hairline` from Task 1.
- Produces: `#about` and `#skills` sections with no repeated portrait, no six equal cards, and preserved certificate lightbox.

- [ ] **Step 1: Add failing legacy-pattern checks**

```powershell
$about = Get-Content src/components/About.tsx -Raw
$skills = Get-Content src/components/Skills.tsx -Raw
if ($about -match 'portrait.jpg|Double-Bezel|rounded-\[1\.75rem\]') { throw 'Legacy About chrome still present' }
if ($skills -match 'grid-cols-2 lg:grid-cols-3|Double-Bezel|rounded-\[1\.75rem\]') { throw 'Legacy Skills grid still present' }
```

Expected before implementation: FAIL.

- [ ] **Step 2: Replace About with a facts column and editorial timeline**

```tsx
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const facts = [
  ['教育', '长春科技学院 / 视觉传达设计'],
  ['方向', '平面设计 / 品牌设计'],
  ['城市', '江西九江'],
  ['状态', '求职中 / 一周内到岗'],
];

const experience = [
  ['2022.09 - 2026.06', '长春科技学院', '视觉传达设计本科，主修平面设计、品牌策划、字体与版式方向。'],
  ['2024', '线上速写训练', '参加为期一个月的线上密集训练，完成每日速写打卡。'],
  ['2025.06 - 2025.11', '毕业设计视觉统筹', '制定毕业设计手册排版规范，规划展区和导视系统，对接印刷供应商。'],
  ['2026.04 - 2026.05', '杭州聿书堂文化艺术有限公司', '参与禅黑体与三桥菜市场项目，完成字形、字距与制作文件输出。'],
];

function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .7 }}>{children}</motion.div>;
}

export default function About() {
  return (
    <section id="about" className="py-28 md:py-40">
      <div className="section-shell">
        <p className="eyebrow mb-12">关于我</p>
        <div className="grid gap-16 lg:grid-cols-[.65fr_1.35fr]">
          <Reveal>
            <div className="border-t" style={{ borderColor: 'var(--line)' }}>
              {facts.map(([label, value]) => <div key={label} className="grid grid-cols-[72px_1fr] border-b py-4 text-sm" style={{ borderColor: 'var(--line)' }}><span style={{ color: 'var(--muted)' }}>{label}</span><span>{value}</span></div>)}
            </div>
          </Reveal>
          <Reveal>
            <h2 className="display max-w-4xl text-4xl font-bold leading-tight md:text-6xl">用克制的视觉系统，把品牌想法变成可落地的真实物料。</h2>
            <div className="mt-14 border-t" style={{ borderColor: 'var(--line)' }}>
              {experience.map(([date, title, desc]) => <article key={date} className="grid gap-3 border-b py-6 md:grid-cols-[150px_1fr]" style={{ borderColor: 'var(--line)' }}><time className="text-xs" style={{ color: 'var(--muted)' }}>{date}</time><div><h3 className="font-semibold">{title}</h3><p className="mt-2 max-w-2xl text-sm leading-7" style={{ color: 'var(--muted)' }}>{desc}</p></div></article>)}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Replace Skills with a capability index and certificate strip**

```tsx
import { useState } from 'react';

const groups = [
  ['视觉设计', '海报、宣传物料与版式设计。', ['Photoshop', 'Illustrator', '版式设计']],
  ['品牌识别', 'Logo、标准色、辅助图形与品牌规范。', ['VI 系统', '标志设计', '导视系统']],
  ['字体设计', '字形手稿、数字化转译与字距优化。', ['Glyphs', '字形绘制', '中文字体']],
  ['版式与印刷', '画册、书籍装帧与印刷工艺管控。', ['InDesign', 'CMYK', '书籍装帧']],
  ['AI 辅助设计', 'AI 与 Photoshop 工作流和效果图输出。', ['AI + PS', '风格控制', '快速提案']],
  ['项目与协作', '供应商、规范、汇报和项目统筹。', ['多方协作', '规范制定', '商务谈判']],
];

const certificates = ['certificates/cert-01.jpg', 'certificates/cert-02.jpg', 'certificates/cert-03.jpg', 'certificates/cert-04.jpg', 'certificates/cert-05.jpg'];

export default function Skills() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="skills" className="py-28 md:py-40" style={{ background: 'var(--paper-raised)' }}>
      <div className="section-shell grid gap-16 lg:grid-cols-[.55fr_1.45fr]">
        <div><p className="eyebrow mb-6">能力范围</p><h2 className="display text-4xl font-bold md:text-6xl">从概念到成品，覆盖完整设计流程。</h2></div>
        <div className="border-t" style={{ borderColor: 'var(--line)' }}>
          {groups.map(([title, desc, tools]) => <article key={title as string} className="grid gap-4 border-b py-7 md:grid-cols-[180px_1fr]" style={{ borderColor: 'var(--line)' }}><h3 className="font-semibold">{title}</h3><div><p className="text-sm leading-7" style={{ color: 'var(--muted)' }}>{desc}</p><div className="mt-3 flex flex-wrap gap-2">{(tools as string[]).map((tool) => <span key={tool} className="text-xs" style={{ color: 'var(--accent)' }}>{tool}</span>)}</div></div></article>)}
        </div>
      </div>
      <div className="section-shell mt-20">
        <p className="eyebrow mb-5">相关证明</p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">{certificates.map((src, index) => <button key={src} onClick={() => setActive(index)} className="overflow-hidden" style={{ borderRadius: 'var(--radius-md)' }}><img src={src} alt={`相关证明 ${index + 1}`} loading="lazy" className="aspect-[4/3] w-full object-cover" /></button>)}</div>
      </div>
      {active !== null && <div className="fixed inset-0 z-[100] flex items-center justify-center p-6" style={{ background: 'rgba(24,24,22,.92)' }} onClick={() => setActive(null)}><img src={certificates[active]} alt={`相关证明 ${active + 1}`} className="max-h-[86vh] max-w-[92vw] object-contain" onClick={(event) => event.stopPropagation()} /></div>}
    </section>
  );
}
```

- [ ] **Step 4: Run pattern checks and build**

```powershell
$about = Get-Content src/components/About.tsx -Raw
$skills = Get-Content src/components/Skills.tsx -Raw
if ($about -match 'portrait.jpg|Double-Bezel|rounded-\[1\.75rem\]') { throw 'Legacy About chrome still present' }
if ($skills -match 'grid-cols-2 lg:grid-cols-3|Double-Bezel|rounded-\[1\.75rem\]') { throw 'Legacy Skills grid still present' }
pnpm build
```

Expected: checks pass and build succeeds.

- [ ] **Step 5: Commit**

```powershell
git add src/components/About.tsx src/components/Skills.tsx
git commit -m '重构关于与技能区块'
```

---

### Task 5: Rework project presentation

**Files:**
- Modify: `src/components/Projects.tsx`
- Verify: `src/data/projects.ts` remains unchanged

**Interfaces:**
- Consumes: `projects` array from `src/data/projects.ts`, project fields `id`, `title`, `category`, `tags`, `desc`, `year`, `img`, `coverRatio`.
- Produces: `#projects` section with first project full-width and later projects alternating `7:5` / `5:7`.

- [ ] **Step 1: Add a failing project-layout check**

```powershell
$file = Get-Content src/components/Projects.tsx -Raw
if ($file -match 'Double-Bezel|top-4 right-4|top-4 left-4|lg:col-span-2') { throw 'Legacy card chrome still present' }
if ($file -notmatch 'grid-cols-\[7fr_5fr\]' -or $file -notmatch 'grid-cols-\[5fr_7fr\]') { throw 'Alternating editorial grid missing' }
```

Expected before implementation: FAIL.

- [ ] **Step 2: Replace the project card with metadata outside the image**

```tsx
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const layouts = ['lg:grid-cols-1', 'lg:grid-cols-[7fr_5fr]', 'lg:grid-cols-[5fr_7fr]'];
  const imageOrder = index === 2 ? 'lg:order-2' : '';

  return (
    <motion.article ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .8, ease }} className="border-t pt-6" style={{ borderColor: 'var(--line)' }}>
      <div className={`grid grid-cols-1 items-end gap-8 ${layouts[index] ?? layouts[1]}`}>
        <a href={`#/project/${project.id}`} className={`block overflow-hidden ${imageOrder}`} style={{ borderRadius: 'var(--radius-lg)' }}>
          <img src={project.img} alt={project.title} loading="lazy" className="w-full object-cover transition-transform duration-700 hover:scale-[1.02]" style={{ aspectRatio: index === 0 ? '16/9' : project.coverRatio ?? '4/3' }} />
        </a>
        <div className="pb-2">
          <div className="flex items-center justify-between text-xs" style={{ color: 'var(--muted)' }}><span>{project.category}</span><span>{project.year}</span></div>
          <h3 className="display mt-5 text-3xl font-bold md:text-5xl">{project.title}</h3>
          <p className="mt-5 max-w-xl text-sm leading-7" style={{ color: 'var(--muted)' }}>{project.desc}</p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs" style={{ color: 'var(--accent)' }}>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <a href={`#/project/${project.id}`} className="mt-8 inline-block text-sm font-semibold" style={{ color: 'var(--accent)' }}>查看项目详情</a>
        </div>
      </div>
    </motion.article>
  );
}
```

- [ ] **Step 3: Replace the project section wrapper**

```tsx
export default function Projects() {
  return (
    <section id="projects" className="py-28 md:py-40">
      <div className="section-shell">
        <div className="mb-14 flex items-end justify-between gap-8">
          <div><p className="eyebrow mb-5">精选项目</p><h2 className="display text-4xl font-bold md:text-6xl">作品优先，信息克制。</h2></div>
          <p className="hidden max-w-sm text-sm leading-7 md:block" style={{ color: 'var(--muted)' }}>三个完整项目，覆盖品牌识别、字体设计与实际物料落地。</p>
        </div>
        <div className="space-y-20 md:space-y-28">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the project checks and build**

```powershell
$file = Get-Content src/components/Projects.tsx -Raw
if ($file -match 'Double-Bezel|top-4 right-4|top-4 left-4|lg:col-span-2') { throw 'Legacy card chrome still present' }
if ($file -notmatch 'grid-cols-\[7fr_5fr\]' -or $file -notmatch 'grid-cols-\[5fr_7fr\]') { throw 'Alternating editorial grid missing' }
pnpm build
```

Expected: checks pass and build succeeds.

- [ ] **Step 5: Commit**

```powershell
git add src/components/Projects.tsx
git commit -m '重构精选项目展陈'
```

---

### Task 6: Rework Contact and detail-page styling

**Files:**
- Modify: `src/components/Contact.tsx`
- Modify: `src/components/ProjectDetail.tsx`

**Interfaces:**
- Consumes: existing contacts, copy-to-clipboard behavior, resume link, and project detail route data.
- Produces: split contact section and detail page using the same paper, accent, typography, and radius tokens.

- [ ] **Step 1: Add failing checks for generic contact patterns**

```powershell
$contact = Get-Content src/components/Contact.tsx -Raw
if ($contact -match 'text-center|clamp\(48px,8vw,130px\)|grid-cols-2 lg:grid-cols-4') { throw 'Legacy centered Contact layout still present' }
```

Expected before implementation: FAIL.

- [ ] **Step 2: Replace the Contact main content with a split layout**

```tsx
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
    {contacts.map((item) => <a key={item.label} href={item.href} className="grid grid-cols-[90px_1fr] border-b py-5 text-sm" style={{ borderColor: 'var(--line)' }}><span style={{ color: 'var(--muted)' }}>{item.label}</span><span>{item.value}</span></a>)}
  </div>
</div>
```

- [ ] **Step 3: Normalize all remaining em-dashes**

```powershell
$projectData = 'src/data/projects.ts'
$projectDetail = 'src/components/ProjectDetail.tsx'
(Get-Content $projectData -Raw).Replace('2025.06 — 2025.11', '2025.06 - 2025.11').Replace('2026.04 — 2026.05', '2026.04 - 2026.05').Replace('设计 — 生产 — 市场', '设计 - 生产 - 市场') | Set-Content $projectData -Encoding utf8NoBOM
(Get-Content $projectDetail -Raw).Replace("?? '—'", "?? '-'").Replace('>—<', '>-<') | Set-Content $projectDetail -Encoding utf8NoBOM
if ((Get-Content $projectData, $projectDetail -Raw) -match '—') { throw 'Em-dash remains in project data or detail page' }
```

- [ ] **Step 4: Update `ProjectDetail.tsx` shared containers**

```tsx
<main className="section-shell pb-28 pt-32">
  <a href="#/" className="eyebrow inline-block mb-16">返回项目列表</a>
  <header className="grid gap-8 border-b pb-10 lg:grid-cols-[1fr_320px]" style={{ borderColor: 'var(--line)' }}>
    <h1 className="display text-5xl font-bold leading-[.95] md:text-8xl">{project.title}</h1>
    <dl className="space-y-3 text-sm">
      <div className="flex justify-between gap-6"><dt style={{ color: 'var(--muted)' }}>年份</dt><dd>{project.year}</dd></div>
      <div className="flex justify-between gap-6"><dt style={{ color: 'var(--muted)' }}>角色</dt><dd>{project.role}</dd></div>
      <div className="flex justify-between gap-6"><dt style={{ color: 'var(--muted)' }}>类型</dt><dd>{project.category}</dd></div>
    </dl>
  </header>
  <img src={project.img} alt={project.title} className="mt-12 w-full object-cover" style={{ borderRadius: 'var(--radius-lg)', aspectRatio: project.coverRatio ?? '16/9' }} />
</main>
```

- [ ] **Step 5: Run checks and build**

```powershell
$contact = Get-Content src/components/Contact.tsx -Raw
if ($contact -match 'text-center|clamp\(48px,8vw,130px\)|grid-cols-2 lg:grid-cols-4') { throw 'Legacy centered Contact layout still present' }
pnpm build
```

Expected: check passes and build succeeds.

- [ ] **Step 6: Commit**

```powershell
git add src/components/Contact.tsx src/components/ProjectDetail.tsx
git commit -m '重构联系区与项目详情页'
```

---

### Task 7: Final verification, visual QA, and deployment

**Files:**
- Verify: all modified source files
- Verify: `dist/index.html`
- Deploy: GitHub `main`

**Interfaces:**
- Consumes: all previous tasks.
- Produces: successful GitHub Pages deployment at `https://zhang0722-cn.github.io/portfolio/`.

- [ ] **Step 1: Run final source checks**

```powershell
$sources = Get-ChildItem src -Recurse -File | Get-Content -Raw
if ($sources -match 'Double-Bezel|requestAnimationFrame|animated-border|Ticker') { throw 'Legacy visual patterns remain' }
if ($sources -match '—') { throw 'Em-dash found in visible source' }
if ($sources -notmatch 'prefers-reduced-motion') { throw 'Reduced-motion support missing' }
```

Expected: no output.

- [ ] **Step 2: Build and preview**

```powershell
pnpm build
pnpm exec vite preview --host 127.0.0.1 --port 4173 --strictPort
```

In a second terminal:

```powershell
curl.exe -I http://127.0.0.1:4173/
curl.exe -I http://127.0.0.1:4173/portrait.jpg
curl.exe -I http://127.0.0.1:4173/resume-zhanghaolei.pdf
```

Expected: every request returns HTTP 200.

- [ ] **Step 3: Capture desktop and mobile screenshots**

```powershell
& 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe' --headless --disable-gpu --hide-scrollbars --window-size=1440,1100 --screenshot='E:\个人网页\portfolio-editorial-desktop.png' http://127.0.0.1:4173/
& 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe' --headless --disable-gpu --hide-scrollbars --window-size=390,844 --screenshot='E:\个人网页\portfolio-editorial-mobile.png' http://127.0.0.1:4173/
```

Expected: both PNG files exist and show no overlap, clipping, or horizontal overflow.

- [ ] **Step 4: Push to `main`**

```powershell
git push origin main
```

Expected: push succeeds using GitHub CLI credentials configured in `http.https://github.com.helper`.

- [ ] **Step 5: Wait for GitHub Actions and verify the live site**

```powershell
$run = gh run list --repo zhang0722-cn/portfolio --limit 1 --json databaseId | ConvertFrom-Json
gh run watch $run.databaseId --repo zhang0722-cn/portfolio --exit-status
curl.exe -I https://zhang0722-cn.github.io/portfolio/
```

Expected: workflow concludes successfully and the live site returns HTTP 200.

- [ ] **Step 6: Commit any QA-only corrections**

```powershell
git add src
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) { git commit -m '修正作品集移动端视觉细节' }
git push origin main
```

Expected: only commits if QA corrections were required.

---

## Self-Review

- Spec coverage: visual tokens, navigation, Hero, About, Projects, Skills, Contact, ProjectDetail, responsive behavior, accessibility, verification, deployment, and rollback are covered.
- Placeholder scan: no TBD, TODO, or deferred implementation language.
- Type consistency: all component props and data fields use names already present in `src/data/projects.ts` and existing components.