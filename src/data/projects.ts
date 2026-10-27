export type Project = {
  id: number;
  title: string;
  category: string;
  tags: string[];
  desc: string;
  year: string;
  img: string;
  accent: string;
  size: 'large' | 'small';
  coverRatio?: string;
  contentImages?: string[];
  resultsImages?: string[];
  motionGallery?: { src: string; poster: string; alt: string; caption: string }[];
  client?: string;
  role: string;
  cardTitle?: string;
  status?: string;
  period?: string;
  overview: string;
  background: string[];
  responsibilities: { title: string; items: string[] }[];
  results: string[];
  gallery: string[];
  endDocument?: { src: string; title: string; description?: string };
  stats: { value: string; label: string; desc?: string }[];
};

export const projects: Project[] = [
  {
    id: 1,
    title: '龙虎山文旅品牌视觉形象设计',
    cardTitle: '项目一',
    category: '品牌设计',
    tags: ['VI 系统', 'Logo 设计', '文创产品'],
    desc: '以江西龙虎山道教文化为核心，从0到1打造完整品牌视觉形象，延展30个品类文创设计，推动20款量产，平均售出率80%。',
    year: '2025',
    img: 'longhushan-cover.webp',
    accent: '#EA580C',
    size: 'large',
    client: '江西龙虎山文旅（毕业设计）',
    role: '独立设计师 / 项目负责人',
    status: '已落地 · 市场验证良好',
    period: '2025.06 - 2025.11',
    overview:
      '以江西龙虎山道教文化为核心，从0到1打造完整的品牌视觉形象，并延展至文创产品设计、生产及市场销售，实现设计商业价值的闭环验证。',
    background: [
      '深入调研道教文化与龙虎山地域特色，提炼出具有辨识度的视觉语言与品牌气质。',
      '围绕“文化转译 + 商业落地”的目标，将抽象的道教文化符号系统化、产品化。',
      '从品牌策略到量产销售，完整验证“设计 - 生产 - 市场”的闭环链路。',
    ],
    responsibilities: [
      {
        title: '品牌核心体系构建',
        items: [
          '独立完成品牌 Logo、标准色、辅助图形、品牌字体等 VI 基础系统设计',
          '确保整套视觉语言统一且富有文化内涵，兼顾现代审美与传统元素',
        ],
      },
      {
        title: '视觉物料延展',
        items: [
          '基于 VI 体系设计 3 大系列品牌海报招贴',
          '完成 30 个品类文创周边的延展设计，涵盖包装、旅游纪念品、文具等',
          '体现设计系统性与跨媒介应用能力',
        ],
      },
      {
        title: '供应链落地推动',
        items: [
          '与 15 家生产厂家对接，跟进打样、调色、材质选择等环节',
          '成功推动其中 20 个品类设计方案实现量产',
          '确保设计在实物层面的准确还原',
        ],
      },
      {
        title: '市场销售验证',
        items: [
          '协调学校进行产品销售，通过设计吸引力与用户口碑驱动转化',
          '20 个品类整体售出率达 80%，其中数款产品上市后快速售罄',
        ],
      },
    ],
    results: [
      '完成一套完整的文旅品牌 VI 系统，成功延展至 30 款设计、20 款量产',
      '市场销售验证良好，20 款产品平均售出率达 80%',
      '完整的设计流程、落地实物及销售数据已整理入个人作品集',
    ],
    resultsImages: [
      'longhushan-results/results-01.webp',
      'longhushan-results/results-02.webp',
      'longhushan-results/results-03.webp',
      'longhushan-results/results-04.webp',
      'longhushan-results/results-05.webp',
    ],
    contentImages: [
      'longhushan-content/content-01.webp',
      'longhushan-content/content-02.webp',
      'longhushan-content/content-03.webp',
      'longhushan-content/content-04.webp',
      'longhushan-content/content-05.webp',
      'longhushan-content/content-06.webp',
      'longhushan-content/content-07.webp',
      'longhushan-content/content-08.webp',
    ],
    endDocument: {
      src: 'visual-zhanghaolei-web.pdf',
      title: '主题设计综合实训答辩手册',
      description: '完整 74 页作品集文档，可在页面内浏览或下载查看。',
    },
    gallery: [
      'longhushan-cover.webp',
      'portfolio-gallery/longhushan-gallery-01.webp',
      'portfolio-gallery/longhushan-gallery-02.webp',
    ],
    stats: [
      { value: '30 款', label: '文创延展', desc: '3 大系列海报 + 30 品类周边' },
      { value: '20 款', label: '成功量产', desc: '对接 15 家厂家实现落地' },
      { value: '80%', label: '平均售出率', desc: '市场销售验证良好' },
      { value: '0→1', label: '品牌体系', desc: '从策略到落地完整闭环' },
    ],
  },
  {
    id: 2,
    title: '「禅黑体」中文字体辅助设计',
    cardTitle: '项目二',
    category: '字体设计',
    tags: ['Glyphs', '字距优化', '中文字体'],
    desc: '参与原创中文字体「禅黑体」设计开发，负责汉字字形手稿绘制与数字化转译，使用 Glyphs 完成字模曲线调整与字距优化。',
    year: '2026',
    img: 'chanheiti-cover.webp',
    coverRatio: '16/9',
    accent: '#EA580C',
    size: 'small',
    client: '杭州聿书堂文化艺术有限公司',
    role: '字体设计实习生（参与开发）',
    status: '设计进行中 · 尚未正式发布',
    period: '2026.04 - 2026.05',
    overview:
      '参与一套原创中文字体的设计开发，负责部分汉字字形的手稿绘制与数字化转译，用 Glyphs 完成字模曲线调整与字距优化，打磨字体在不同排版场景中的气质调性与阅读舒适度。',
    background: [
      '从手稿出发，探索兼具现代感与禅意的黑体笔画气质。',
      '在“字形个性”与“阅读舒适”之间反复取舍，建立统一的笔画风格。',
      '通过字距与字重的系统化调整，保证字体在多场景下的稳定表现。',
    ],
    responsibilities: [
      {
        title: '字形设计与数字化转译',
        items: [
          '负责部分汉字字形的手稿绘制，把控笔画结构与视觉重心',
          '完成手稿到数字字形的转译，保证曲线质量与轮廓精度',
        ],
      },
      {
        title: 'Glyphs 字模调整',
        items: [
          '使用 Glyphs 完成字模曲线调整与字距（Kerning）优化',
          '统一字体笔画风格与视觉重心，保证整体气质一致',
        ],
      },
      {
        title: '排版场景验证',
        items: [
          '在不同字号与排版场景中测试阅读舒适度',
          '协同团队持续迭代，兼顾气质调性与功能需求',
        ],
      },
    ],
    results: [
      '完成一批汉字字形的手稿绘制与数字化转译',
      '通过 Glyphs 完成字模曲线与字距的系统化优化',
      '项目设计进行中，尚未正式发布',
    ],
    gallery: [],
    stats: [
      { value: 'Glyphs', label: '核心工具', desc: '曲线调整与字距优化' },
      { value: '手稿→数字', label: '工作流', desc: '字形手稿数字化转译' },
      { value: '多场景', label: '排版验证', desc: '气质调性与阅读舒适' },
      { value: '未发布', label: '项目状态', desc: '设计进行中' },
    ],
  },
  {
    id: 3,
    title: '「三桥菜市场」品牌视觉重建',
    cardTitle: '项目三',
    category: '视觉设计',
    tags: ['灯牌设计', '品类标识', 'AI + PS'],
    desc: '实地调研梳理摊位视觉痛点，统一品类灯牌字体、色彩、尺寸规范，分品类配色帮助消费者快速定位目标摊位。',
    year: '2026',
    img: 'sanqiao-cover.webp',
    accent: '#EA580C',
    size: 'small',
    coverRatio: '1188 / 343',
    client: '杭州聿书堂文化艺术有限公司',
    role: '设计实习生',
    status: '方案已完成 · 后续落地情况不详',
    period: '2026.04 - 2026.05',
    overview:
      '通过实地调研梳理菜市场的视觉痛点，为各摊位设计品类标识灯牌，统一字体、色彩、尺寸规范，并用颜色区分品类，帮助消费者快速定位目标摊位。',
    background: [
      '前期实地调研发现：各摊位灯牌材质、色彩、字体杂乱无统一规范。',
      '品类信息（蔬菜、牛肉、水产等）辨识度低，消费者难以快速定位目标摊位。',
      '目标是建立一套清晰、统一、可复制的品类灯牌视觉系统。',
    ],
    responsibilities: [
      {
        title: '实地调研与痛点梳理',
        items: [
          '走访市场，梳理灯牌材质、色彩、字体的混乱现状',
          '识别品类信息辨识度低、消费者定位困难等核心问题',
        ],
      },
      {
        title: '品类灯牌系统设计',
        items: [
          '为各摊位设计品类标识灯牌，标注蔬菜、牛肉、水产等商品类别',
          '统一灯牌的字体、色彩、尺寸规范，形成整体视觉感',
          '对不同品类做颜色区分（蔬菜区绿色系、肉类区红色系）',
        ],
      },
      {
        title: '效果图与制作输出',
        items: [
          '使用 AI + PS 输出灯牌效果图及制作文件',
          '确保方案可直接交付生产制作',
        ],
      },
    ],
    results: [
      '完成一套统一的品类灯牌视觉规范与分色系统',
      '输出全部摊位灯牌效果图及制作文件',
      '因实习期满离职，后续落地情况不详',
    ],
    gallery: [],
    stats: [
      { value: '实地调研', label: '发现问题', desc: '梳理摊位视觉痛点' },
      { value: '分色系统', label: '品类区分', desc: '蔬菜绿 / 肉类红' },
      { value: '统一规范', label: '灯牌标准', desc: '字体 / 色彩 / 尺寸' },
      { value: 'AI + PS', label: '效果输出', desc: '效果图与制作文件' },
    ],
  },
  {
    id: 4,
    title: '「团小冰」儿童冰淇淋品牌提案',
    cardTitle: '项目四',
    category: '品牌设计',
    tags: ['品牌理念', 'Logo 设计', '手绘包装', 'IP 视觉'],
    desc: '以儿童涂鸦为核心视觉语言，为街角儿童冰淇淋品牌构建轻松、亲民的品牌识别，并延展至产品包装、店铺物料与主题周边。',
    year: '2026',
    img: 'tuanbing/tuanbing-01.jpg',
    coverRatio: '16/9',
    accent: '#EA580C',
    size: 'small',
    role: '全案设计师',
    status: '概念方案',
    period: '两周',
    overview:
      '「团小冰」以街角平价冰淇淋为定位，提出一个为儿童保留自由表达的空间：不追求精致标准与高价体验，而以现挖冰淇淋、孩子的涂鸦和白纸杯传递真实、轻松的童年快乐。',
    background: [
      '在标准化、精致化的商业街景中，为儿童提供一个可以自在停留和表达的轻松角落。',
      '以“孩子的涂鸦”作为品牌视觉语言，让手绘笔触成为区别于成人世界规整视觉的识别特征。',
      '将亲民、简单的消费体验转译为直观的产品和店铺视觉触点。',
    ],
    responsibilities: [
      {
        title: '品牌理念与识别设计',
        items: [
          '围绕“把孩子的杰作捧在手心”梳理品牌表达与核心口号',
          '完成「团小冰」中文字标及中英文品牌视觉方向',
          '以天空蓝、淡黄色和手绘笔触建立品牌标准色与辅助视觉语言',
        ],
      },
      {
        title: 'IP 形象与包装延展',
        items: [
          '设计冰淇淋角色及儿童涂鸦风格的图形应用',
          '将手绘视觉延展到冰淇淋杯、手提袋和主题周边',
          '通过角色、涂鸦和包装信息保持不同物料间的统一性',
        ],
      },
      {
        title: '店铺与产品信息物料',
        items: [
          '设计店铺招牌、欢迎指引及空间提示物料',
          '为口味和价格信息设计手写风格展示画面',
          '形成覆盖品牌识别、产品包装和店铺触点的概念视觉方案',
        ],
      },
    ],
    results: [
      '完成「团小冰」儿童冰淇淋品牌概念及视觉识别方向',
      '形成包含字标、标准色、手绘 IP、包装、招牌和产品信息物料的延展方案',
      '本项目为概念提案，素材未说明实际落地或经营数据',
    ],
    gallery: [
      'tuanbing/tuanbing-02.jpg',
      'tuanbing/tuanbing-03.jpg',
      'tuanbing/tuanbing-04.jpg',
      'tuanbing/tuanbing-05.jpg',
      'tuanbing/tuanbing-06.jpg',
      'tuanbing/tuanbing-07.jpg',
      'tuanbing/tuanbing-08.jpg',
    ],
    motionGallery: [
      { src: 'tuanbing/motion/playground.gif', poster: 'tuanbing/motion/playground-poster.webp', alt: '儿童涂鸦角色在游乐场中玩耍的循环动画', caption: '涂鸦游乐场' },
      { src: 'tuanbing/motion/green-chick.gif', poster: 'tuanbing/motion/green-chick-poster.webp', alt: '绿色小鸡角色在弹簧座椅上摇摆的动画', caption: '绿色小鸡弹簧摇摇乐' },
      { src: 'tuanbing/motion/orange-plane.gif', poster: 'tuanbing/motion/orange-plane-poster.webp', alt: '儿童涂鸦角色乘坐橙色飞机弹簧骑乘玩具的动画', caption: '橙色飞机弹簧骑乘' },
      { src: 'tuanbing/motion/pink-chick.gif', poster: 'tuanbing/motion/pink-chick-poster.webp', alt: '粉色小鸡角色在弹簧座椅上摇摆的动画', caption: '粉色小鸡弹簧摇摇乐' },
      { src: 'tuanbing/motion/wave-slide.gif', poster: 'tuanbing/motion/wave-slide-poster.webp', alt: '儿童涂鸦角色沿波浪滑梯滑下的动画', caption: '波浪滑梯' },
      { src: 'tuanbing/motion/blue-tunnel.gif', poster: 'tuanbing/motion/blue-tunnel-poster.webp', alt: '儿童涂鸦角色穿过蓝色弯管滑梯的动画', caption: '蓝色弯管滑梯' },
    ],
    stats: [
      { value: '儿童视角', label: '品牌理念', desc: '把孩子的杰作捧在手心' },
      { value: '手绘涂鸦', label: '视觉语言', desc: '以自由笔触建立识别特征' },
      { value: '产品包装', label: '包装应用', desc: '冰淇淋杯与主题手提袋' },
      { value: '店铺物料', label: '触点延展', desc: '招牌、指引与口味价格展示' },
    ],
  },
];
