"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  MapPin, ChevronLeft, ShoppingCart,
  Truck, Warehouse, Factory, CreditCard, Star,
} from "lucide-react"

/* ── Region data keyed by regionId ── */
const REGION_DATA: Record<string, {
  name: string
  fullName: string
  breadcrumb: string
  heroImg: string
  heroDesc: string
  productTitle: string
  stats: { value: string; sub: string }[]
  capabilities: { icon: string; title: string; desc: string }[]
  products: { id: string; name: string; desc: string; price: string; img: string }[]
  services: { icon: React.ElementType; title: string; desc: string }[]
  storyImages: string[]
  story: string
}> = {
  maoming: {
    name: "茂名",
    fullName: "茂名产地直供中心",
    breadcrumb: "广东省茂名市电白区沙琅镇荔枝核心产区",
    heroImg: "/images/regions/maoming-thumb.png",
    heroDesc: "茂名市是全国最大的荔枝产区，荔枝种植面积超过150万亩，年产量超过80万吨，约占全国总产量的40%，其中白糖罂、桂味、糯米糍等品种驰名全国，年产值超过130亿元。",
    productTitle: "茂名荔枝优选",
    stats: [
      { value: "150万亩",  sub: "种植面积" },
      { value: "80万吨",   sub: "年产量"   },
      { value: "130亿+",   sub: "总产值"   },
      { value: "40万户+",  sub: "种植农户" },
      { value: "全国第一", sub: "荔枝产量" },
      { value: "20+",      sub: "荔枝品种" },
      { value: "60%+",     sub: "出口占比" },
    ],
    capabilities: [
      { icon: "digital", title: "数字化交易与撮合能力", desc: "通过数字化平台实现荔枝产销精准匹配，帮助买卖双方高效成交，保障交易全程透明。" },
      { icon: "quality", title: "品控与溯源管理",      desc: "建立荔枝完整品控管理体系，每批荔枝均可追溯到具体果园，品质透明可信。" },
      { icon: "price",   title: "柔性定价与合规",      desc: "建立完善的产销对接平台，实现买方多元化全方位服务，以及公平合规的交易保障。" },
      { icon: "finance", title: "金融赋能能力",         desc: "基于数字化交易数据，引入金融机构合作，为平台买卖方提供全方位金融服务。" },
      { icon: "cold",    title: "冷链保鲜优势",         desc: "配套完善的荔枝冷链保鲜体系，实现从产地到消费者餐桌全程冷链，大幅减少损耗。" },
      { icon: "ecology", title: "生态与品质保障",       desc: "坚持绿色种植理念，生态种植占比超60%，推广标准化种植技术，保障荔枝品质。" },
    ],
    products: [
      { id: "1", name: "白糖罂荔枝",   desc: "特级精选｜净重约3斤/盒｜顺丰冷链",   price: "68.00", img: "/images/products/eggs.png" },
      { id: "2", name: "桂味荔枝",     desc: "产地直发｜净重约3斤/盒｜当日采摘",   price: "88.00", img: "/images/products/eggs.png" },
      { id: "3", name: "糯米糍荔枝",   desc: "优选直采｜净重约3斤/盒｜买家配送",   price: "78.00", img: "/images/products/eggs.png" },
      { id: "4", name: "妃子笑荔枝",   desc: "精选品级｜净重约3斤/盒｜卖家配送",   price: "58.00", img: "/images/products/eggs.png" },
      { id: "5", name: "荔枝干",       desc: "精制加工｜500g/袋｜常温快递",         price: "38.00", img: "/images/products/eggs.png" },
      { id: "6", name: "荔枝蜜",       desc: "天然蜂蜜｜500g/瓶｜顺丰包邮",         price: "128.00", img: "/images/products/eggs.png" },
      { id: "7", name: "荔枝原浆",     desc: "无添加鲜榨｜1L/瓶｜冷链配送",         price: "45.00", img: "/images/products/eggs.png" },
      { id: "8", name: "荔枝冻干",     desc: "锁鲜工艺｜100g/袋｜常温保存",         price: "52.00", img: "/images/products/eggs.png" },
    ],
    services: [
      { icon: Truck,      title: "冷链配送", desc: "提供覆盖全国的荔枝专属冷链物流配送，全程控温，从产地直达消费者，保障荔枝新鲜度。" },
      { icon: Warehouse,  title: "气调仓储", desc: "提供气调保鲜仓储，荔枝可存放15-20天，解决荔枝上市集中、货期短的难题，均衡销售节奏。" },
      { icon: Factory,    title: "加工处理", desc: "提供荔枝分级分拣、包装设计、加工处理服务，生产荔枝干、荔枝蜜等加工品，延伸产业链价值。" },
      { icon: CreditCard, title: "金融服务", desc: "提供荔枝种植、采购、仓储等各环节金融服务，助力农业企业解决资金周转难题。" },
    ],
    storyImages: [
      "/images/regions/maoming-thumb.png",
      "/images/products/eggs.png",
      "/images/products/eggs.png",
      "/images/regions/maoming-thumb.png",
    ],
    story: '茂名荔枝历史悠久，早在唐代就有"一骑红尘妃子笑，无人知是荔枝来"的记载。茂名荔枝品种丰富，以白糖罂、桂味、糯米糍最为著名，果肉饱满、汁多味甜，深受消费者喜爱。\n\n近年来，茂名大力推进荔枝品牌化、数字化，建立了完善的荔枝电商体系和冷链物流网络，荔枝出口量逐年攀升，茂名荔枝已成为广东农产品的金字招牌。',
  },

  yunfu: {
    name: "云浮",
    fullName: "云浮产地直供中心",
    breadcrumb: "广东省云浮市郁南县建城镇咖啡豆核心产区",
    heroImg: "/images/regions/shaoguan-thumb.png",
    heroDesc: "云浮市郁南县是广东省最重要的咖啡豆产区，咖啡种植面积超过2万亩，年产咖啡豆超过500吨，凭借独特的山地气候和土壤条件，出产的咖啡豆品质优良，香气浓郁，深受精品咖啡爱好者喜爱。",
    productTitle: "云浮咖啡豆优选",
    stats: [
      { value: "2万亩+",  sub: "种植面积" },
      { value: "500吨+",  sub: "年产量"   },
      { value: "广东第一", sub: "咖啡产区" },
      { value: "300+",    sub: "合作农户" },
      { value: "800m+",   sub: "平均海拔" },
      { value: "20年+",   sub: "种植历史" },
      { value: "精品级",  sub: "豆品质量" },
    ],
    capabilities: [
      { icon: "digital", title: "数字化产销对接",   desc: "通过数字平台连接咖啡豆种植农户与精品咖啡烘焙商，实现产销精准对接。" },
      { icon: "quality", title: "精细化品控体系",   desc: "建立从种植、采摘、处理到储存的全流程品控体系，确保每批咖啡豆品质稳定。" },
      { icon: "price",   title: "公平贸易认证",     desc: "推动公平贸易认证，保障咖啡农户收益，实现可持续发展。" },
      { icon: "finance", title: "农业金融支持",     desc: "为咖啡种植农户提供农业信贷、保险等金融服务，降低种植风险。" },
      { icon: "cold",    title: "恒温仓储保鲜",     desc: "提供专业咖啡豆恒温恒湿仓储，保障咖啡豆品质稳定，延长保质期。" },
      { icon: "ecology", title: "生态种植认证",     desc: "推广有机种植和生态农业，多款产品通过有机认证，走高端精品路线。" },
    ],
    products: [
      { id: "1", name: "云浮精品日晒豆", desc: "100g | 日晒处理法 | 精品级评分85+", price: "128.00", img: "/images/products/simiao-rice.png" },
      { id: "2", name: "云浮水洗豆",     desc: "100g | 水洗处理法 | 明亮柑橘风味", price: "108.00", img: "/images/products/simiao-rice.png" },
      { id: "3", name: "云浮蜜处理豆",   desc: "100g | 蜜处理法 | 甜感突出",       price: "118.00", img: "/images/products/simiao-rice.png" },
      { id: "4", name: "云浮混合豆（生豆）", desc: "500g | 适合自行烘焙 | 产地直供", price: "88.00", img: "/images/products/simiao-rice.png" },
      { id: "5", name: "云浮有机豆",     desc: "100g | 有机认证 | 无农药残留",     price: "158.00", img: "/images/products/simiao-rice.png" },
      { id: "6", name: "云浮挂耳咖啡包", desc: "10包/盒 | 即冲即饮 | 新鲜烘焙",   price: "78.00", img: "/images/products/simiao-rice.png" },
      { id: "7", name: "庄园级单品豆",   desc: "50g | 限量出品 | 竞标级品质",     price: "298.00", img: "/images/products/simiao-rice.png" },
      { id: "8", name: "冷萃咖啡液",     desc: "250ml | 冷萃12小时 | 冷链配送",   price: "48.00", img: "/images/products/simiao-rice.png" },
    ],
    services: [
      { icon: Truck,      title: "冷链速递",   desc: "咖啡豆采用低温冷链配送，保障新鲜烘焙的咖啡豆在运输过程中品质不受影响。" },
      { icon: Warehouse,  title: "恒温仓储",   desc: "提供专业恒温恒湿仓储服务，温度控制在18-22℃，湿度60%以下，有效保存咖啡豆风味。" },
      { icon: Factory,    title: "代烘焙服务", desc: "提供专业咖啡豆烘焙服务，根据客户要求定制烘焙程度，支持小批量定制烘焙。" },
      { icon: CreditCard, title: "金融支持",   desc: "为咖啡采购商提供账期服务和供应链金融，降低采购资金压力。" },
    ],
    storyImages: [
      "/images/regions/shaoguan-thumb.png",
      "/images/products/simiao-rice.png",
      "/images/products/simiao-rice.png",
      "/images/regions/shaoguan-thumb.png",
    ],
    story: "广东云浮郁南县种植咖啡已有20余年历史，海拔800米以上的山地气候，日照充足，昼夜温差大，为咖啡豆的慢速生长提供了理想环境。郁南咖啡豆以阿拉比卡种为主，果实饱满，酸度适中，具有浓郁的坚果和花香气息。\n\n近年来，郁南县大力发展精品咖啡产业，引进精品处理法，培育咖啡庄园，吸引了大量精品咖啡烘焙商合作，逐渐在国内精品咖啡圈打响名气，成为广东农产品多元化的新名片。",
  },

  jiangmen: {
    name: "江门",
    fullName: "江门产地直供中心",
    breadcrumb: "广东省江门市新会区大蟹镇核心产区",
    heroImg: "/images/regions/jiangmen-thumb.png",
    heroDesc: "江门市是华南地区主要的虾类产区，全市虾类（包括南美白对虾、罗氏虾、班节虾等）养殖面积约50万亩，产量超过70万吨，总产值超过20亿元，其中南美白对虾养殖是核心产区品类。",
    productTitle: "江门虾类优选",
    stats: [
      { value: "50万亩",   sub: "养殖面积" },
      { value: "70万吨",   sub: "年产量"   },
      { value: "20亿+",    sub: "总产值"   },
      { value: "1万户+",   sub: "合作农户" },
      { value: "11.16万亩",sub: "虾塘面积" },
      { value: "20万吨+",  sub: "对虾产量" },
      { value: "50%+",     sub: "生态养殖占比" },
    ],
    capabilities: [
      { icon: "digital", title: "数字化交易与撮合能力", desc: "通过数字化平台实现供需精准匹配，帮助买卖双方高效成交，保障交易全程透明。" },
      { icon: "quality", title: "品控与流通体系",       desc: "建立完整品控管理体系，从采购、包装、运输到入库，流通各链路可见。" },
      { icon: "price",   title: "柔性与合规服务",       desc: "建立完善的产销对接平台，实现买方多元化全方位服务。" },
      { icon: "finance", title: "金融赋能能力",         desc: "引入大量金融机构合作，为平台买卖方提供全方位金融服务。" },
      { icon: "cold",    title: "政策与拓利优势",       desc: "绑定于产地联盟制度优势，提供全链路各类服务。" },
      { icon: "ecology", title: "生态与环境保障",       desc: "坚持绿色养殖理念，生态养殖占比超50%，推广标准化养殖技术。" },
    ],
    products: [
      { id: "1", name: "鲜活南美白对虾",  desc: "鲜活直达｜规格:20/30只/斤｜买家配送", price: "31.12", img: "/images/products/shrimp-fresh.png" },
      { id: "2", name: "优选罗氏沼虾",    desc: "优选直采｜规格:80/100只/斤｜卖家配送", price: "38.50", img: "/images/products/luoshi-shrimp.png" },
      { id: "3", name: "精选淡水虾",      desc: "精选产地｜规格:40/60只/斤｜买家配送", price: "28.80", img: "/images/products/shrimp-fresh.png" },
      { id: "4", name: "自营班节对虾",    desc: "自营直供｜规格:25/35只/斤｜卖家配送", price: "42.00", img: "/images/products/luoshi-shrimp.png" },
      { id: "5", name: "精选南美白对虾",  desc: "精选直达｜规格:20/30只/斤｜买家配送", price: "31.12", img: "/images/products/shrimp-fresh.png" },
      { id: "6", name: "鲜活罗氏沼虾",    desc: "鲜活直达｜规格:80/100只/斤｜卖家配送", price: "39.80", img: "/images/products/luoshi-shrimp.png" },
      { id: "7", name: "优选淡水白对虾",  desc: "优选直采｜规格:30/45只/斤｜买家配送", price: "27.60", img: "/images/products/shrimp-fresh.png" },
      { id: "8", name: "鲜活南美白对虾",  desc: "鲜活直达｜规格:40/60只/斤｜卖家配送", price: "33.00", img: "/images/products/luoshi-shrimp.png" },
    ],
    services: [
      { icon: Truck,      title: "物流",     desc: "提供覆盖全省的冷链物流配送，无论是城市配送还是乡镇配送，均保证全程冷链、快速、准时送达。" },
      { icon: Warehouse,  title: "仓储",     desc: "具有完备的安全保管及精细化管理能力，提供控温保鲜，配置多种容量模式，适合农产品全程仓储管理。" },
      { icon: Factory,    title: "加工处理", desc: "提供精细化分拣处理，下架销售前对农产品进行加工处理，支持各类农产品与原料企业的加工合作。" },
      { icon: CreditCard, title: "金融",     desc: "提供供销联系金融服务，引导申请担保，助力农业与企业金融全流程、支持以往信贷业务申请。" },
    ],
    storyImages: [
      "/images/regions/jiangmen-thumb.png",
      "/images/products/shrimp-fresh.png",
      "/images/products/luoshi-shrimp.png",
      "/images/regions/jiangmen-thumb.png",
    ],
    story: "江门市是华南地区主要的产区，养殖虾类（南美虾、罗氏虾、班节虾）年产量近30万吨，其中南美白对虾11.15万亩，产量超过20万吨。全省全部使用生态养殖，占比超50%，重要供应全省大中型超市及餐饮连锁。\n\n在广东省农业产业分工格局中，江门是水产养殖的重要产业基地——以对虾为主，包括淡水白虾、罗氏沼虾，年产量不低于2亿5千万元，约占全省比例30%，农业总产值已突破百亿元。",
  },

  nanxiong: {
    name: "南雄",
    fullName: "南雄产地直供中心",
    breadcrumb: "广东省韶关市南雄市水口镇丝苗米核心产区",
    heroImg: "/images/regions/nanxiong-thumb.png",
    heroDesc: "南雄市是粤北重要的粮食生产区，丝苗米、板鸭享誉全省。南雄丝苗米种植历史悠久，具有粒细长、晶莹剔透、清香可口的特点，年种植面积超过20万亩，产值超10亿元。",
    productTitle: "南雄特色农产品优选",
    stats: [
      { value: "20万亩",  sub: "丝苗米面积" },
      { value: "10亿+",   sub: "年产值"     },
      { value: "300年+",  sub: "种植历史"   },
      { value: "5万户+",  sub: "合作农户"   },
      { value: "国家级",  sub: "优质稻产区" },
      { value: "绿色",    sub: "生产认证"   },
      { value: "2000+",   sub: "年种植户"   },
    ],
    capabilities: [
      { icon: "digital", title: "数字化产销对接", desc: "通过平台数字化系统实现丝苗米产销精准匹配，提升交易效率。" },
      { icon: "quality", title: "品质保障体系",   desc: "建立丝苗米从种植到收购的全程品控体系，确保大米品质稳定。" },
      { icon: "price",   title: "公平定价机制",   desc: "建立公开透明的收购价格机制，保障农户种粮收益。" },
      { icon: "finance", title: "农业金融支持",   desc: "提供种粮保险、农业信贷等金融服务，降低农户生产风险。" },
      { icon: "cold",    title: "仓储管理服务",   desc: "提供专业粮食仓储，采用先进粮库技术，确保大米安全储存。" },
      { icon: "ecology", title: "绿色农业推广",   desc: "推广绿色有机种植，减少化学投入品使用，提升大米品质和附加值。" },
    ],
    products: [
      { id: "1", name: "南雄丝苗米（5kg）",  desc: "新米上市 | 绿色认证 | 顺丰包邮",   price: "38.00", img: "/images/products/simiao-rice.png" },
      { id: "2", name: "南雄丝苗米（10kg）", desc: "家庭装 | 产地直供 | 顺丰包邮",      price: "68.00", img: "/images/products/simiao-rice.png" },
      { id: "3", name: "南雄板鸭（整只）",   desc: "传统腌制 | 约500g/只 | 低温配送",   price: "88.00", img: "/images/products/simiao-rice.png" },
      { id: "4", name: "南雄腊肠",           desc: "传统配方 | 500g/袋 | 常温快递",      price: "58.00", img: "/images/products/simiao-rice.png" },
      { id: "5", name: "珠玑巷生姜",         desc: "产地直供 | 500g/份 | 顺丰包邮",     price: "15.00", img: "/images/products/simiao-rice.png" },
      { id: "6", name: "南雄大蒜",           desc: "精选紫皮蒜 | 500g/份 | 包邮",       price: "12.00", img: "/images/products/simiao-rice.png" },
      { id: "7", name: "南雄小米椒",         desc: "香辣可口 | 200g/份 | 低温配送",     price: "8.00", img: "/images/products/simiao-rice.png" },
      { id: "8", name: "南雄有机大米",       desc: "有机认证 | 5kg/袋 | 顺丰包邮",     price: "88.00", img: "/images/products/simiao-rice.png" },
    ],
    services: [
      { icon: Truck,      title: "物流配送", desc: "联合顺丰、京东物流提供全国配送服务，保障丝苗米及农产品的安全快速送达。" },
      { icon: Warehouse,  title: "粮食仓储", desc: "提供标准化粮食仓储设施，具备低温仓、气调仓多种仓储模式，确保大米品质。" },
      { icon: Factory,    title: "大米加工", desc: "提供碾米、色选、包装等全套大米加工服务，支持品牌贴牌和定制化包装。" },
      { icon: CreditCard, title: "金融服务", desc: "提供粮食收购预付款、仓单融资等金融服务，解决农户与企业的资金周转问题。" },
    ],
    storyImages: [
      "/images/regions/nanxiong-thumb.png",
      "/images/products/simiao-rice.png",
      "/images/products/simiao-rice.png",
      "/images/regions/nanxiong-thumb.png",
    ],
    story: '南雄丝苗米种植历史已有300余年，"南雄丝苗米"地理标志产品保护范围覆盖南雄市全境，是广东省著名的大米品牌。南雄地处南岭山麓，水质纯净，土壤富含有机质，出产的丝苗米晶莹剔透，煮出的米饭清香软糯，久食不腻。\n\n近年来，南雄大力推进丝苗米产业提档升级，推行标准化种植，打造"南雄丝苗米"区域公用品牌，产品畅销粤港澳大湾区，深受消费者喜爱。',
  },
}

/* 默认展示江门 */
const DEFAULT_REGION = REGION_DATA.jiangmen

const tabs = ["供销信息", "采购信息", "竞价信息", "订单农业"]

const tickerItems = [
  { type: "采购", name: "2025-12-12 虾肉：", price: "12.10", unit: "元/斤" },
  { type: "供应", name: "2025-12-12 虾肉：", price: "12.12", unit: "元/斤" },
  { type: "采购", name: "2025-12-12 鳗鱼：", price: "12.10", unit: "元/斤" },
  { type: "供应", name: "2025-12-12 鳗鱼：", price: "12.12", unit: "元/斤" },
  { type: "采购", name: "2025-12-12 蟹：",   price: "12.10", unit: "元/斤" },
  { type: "供应", name: "2025-12-12 蟹：",   price: "12.12", unit: "元/斤" },
]

export default function RegionDetailPage() {
  const params = useParams()
  const regionId = params?.regionId as string
  const regionData = REGION_DATA[regionId] ?? DEFAULT_REGION
  const [activeTab, setActiveTab] = useState("供销信息")

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <SiteHeader />
      <main className="flex-1">

        {/* ── Hero Banner ── */}
        <div className="relative w-full h-[420px] overflow-hidden">
          <Image
            src={regionData.heroImg}
            alt={regionData.fullName}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />

          {/* Breadcrumb */}
          <div className="absolute top-4 left-6 z-10">
            <Link href="/portal/gongxiao-yanxuan" className="flex items-center gap-1 text-white/80 hover:text-white text-[13px] transition-colors">
              <ChevronLeft className="w-3.5 h-3.5" />
              首页 / 产地直供中心 / {regionData.name}产地
            </Link>
          </div>

          {/* Info card */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 max-w-[480px] w-full mx-6 shadow-lg">
              <div className="flex items-center gap-1.5 mb-2">
                <MapPin className="w-4 h-4 text-[#1a5fa8] shrink-0" />
                <span className="text-[13px] text-[#555]">{regionData.breadcrumb}</span>
              </div>
              <h1 className="text-[32px] font-bold text-[#1a1a2e] mb-3 leading-tight">
                <span className="text-[#1a5fa8]">{regionData.name}</span>{" "}产地直供中心
              </h1>
              <p className="text-[13px] text-[#555] leading-relaxed mb-5">
                {regionData.heroDesc}
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <button className="px-5 py-2 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors font-medium">
                  查看{regionData.name}产品 →
                </button>
                <button className="px-5 py-2 bg-white text-[#1a5fa8] text-[13px] rounded border border-[#1a5fa8] hover:bg-[#e8f4fd] transition-colors">
                  了解产地故事
                </button>
                <button className="text-[13px] text-[#1a5fa8] hover:underline transition-colors">联系客服</button>
                <button className="text-[13px] text-[#1a5fa8] hover:underline transition-colors">查看营业执照</button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Price Ticker ── */}
        <div className="bg-white border-b border-[#e8edf5] py-1.5">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="grid grid-cols-6 gap-2">
              {tickerItems.map((t, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className={`px-1.5 py-0.5 rounded text-[11px] font-semibold text-white ${t.type === "采购" ? "bg-[#3a8c3f]" : "bg-[#e8831a]"}`}>
                    {t.type}
                  </span>
                  <span className="text-[12px] text-[#555]">{t.name}</span>
                  <span className="text-[12px] font-semibold text-[#1a5fa8]">{t.price}</span>
                  <span className="text-[12px] text-[#999]">{t.unit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[1100px] mx-auto px-6 py-6">

          {/* ── Stats ── */}
          <div className="grid grid-cols-7 gap-3 mb-10">
            {regionData.stats.map((s, i) => (
              <div key={i} className="bg-white rounded-lg p-4 text-center border border-[#e8edf5]">
                <div className="text-[22px] font-bold text-[#1a5fa8] mb-0.5">{s.value}</div>
                <div className="text-[12px] text-[#888]">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* ── Capabilities ── */}
          <section className="mb-10">
            <h2 className="text-[20px] font-bold text-[#1a1a2e] text-center mb-1">{regionData.name}直供中心能力</h2>
            <p className="text-[13px] text-[#888] text-center mb-5">整合农产地资源，打造从产地到餐桌的高效供应链，确保一起鲜解的鲜活与品质</p>
            <div className="grid grid-cols-3 gap-4">
              {regionData.capabilities.map((c, i) => (
                <div key={i} className="bg-white rounded-lg p-5 border border-[#e8edf5] hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#e8f4fd] flex items-center justify-center shrink-0">
                      <Star className="w-4 h-4 text-[#1a5fa8]" />
                    </div>
                    <h3 className="text-[14px] font-semibold text-[#1a1a2e]">{c.title}</h3>
                  </div>
                  <p className="text-[13px] text-[#666] leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Products ── */}
          <section className="mb-10">
            <h2 className="text-[20px] font-bold text-[#1a1a2e] text-center mb-1">{regionData.productTitle}</h2>
            <p className="text-[13px] text-[#888] text-center mb-4">产地好物精选</p>

            {/* Tabs */}
            <div className="flex items-center justify-center gap-0 mb-5 border-b border-[#e8edf5]">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 text-[14px] font-medium transition-colors border-b-2 -mb-px ${
                    activeTab === tab
                      ? "border-[#1a5fa8] text-[#1a5fa8]"
                      : "border-transparent text-[#666] hover:text-[#1a5fa8]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Filter bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <select className="border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] text-[#555] focus:outline-none focus:border-[#1a5fa8]">
                  <option>价格排序</option>
                  <option>价格从低到高</option>
                  <option>价格从高到低</option>
                </select>
                <select className="border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] text-[#555] focus:outline-none focus:border-[#1a5fa8]">
                  <option>品类</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  placeholder="请输入商品名称"
                  className="border border-[#dde3ec] rounded px-3 py-1.5 text-[13px] w-[180px] focus:outline-none focus:border-[#1a5fa8]"
                />
                <button className="px-4 py-1.5 bg-[#1a5fa8] text-white text-[13px] rounded hover:bg-[#0d4a8a] transition-colors">搜索</button>
                <button className="px-4 py-1.5 border border-[#dde3ec] text-[13px] text-[#666] rounded hover:border-[#1a5fa8] hover:text-[#1a5fa8] transition-colors">重置</button>
              </div>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              {regionData.products.map((p) => (
                <Link key={p.id} href="/portal/gongxiao-yanxuan/product" className="bg-white rounded-lg overflow-hidden border border-[#e8edf5] hover:shadow-md transition-shadow group">
                  <div className="relative w-full h-[160px] overflow-hidden">
                    <Image src={p.img} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    <button className="absolute bottom-2 right-2 flex items-center gap-1 px-2.5 py-1 bg-[#1a5fa8] text-white text-[11px] rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      <ShoppingCart className="w-3 h-3" /> 加入购车
                    </button>
                  </div>
                  <div className="p-3">
                    <div className="text-[13px] font-semibold text-[#1a1a2e] mb-1 truncate">{p.name}</div>
                    <div className="text-[12px] text-[#888] truncate mb-1.5">{p.desc}</div>
                    <div className="text-[14px] font-bold text-[#e8831a]">{p.price}<span className="text-[12px] font-normal text-[#999]">元起</span></div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-end gap-1 text-[13px]">
              <span className="text-[#999] mr-2">共 {regionData.products.length} 个</span>
              {[1,2,3,4].map((n) => (
                <button key={n} className={`w-7 h-7 rounded flex items-center justify-center ${n === 1 ? "bg-[#1a5fa8] text-white" : "border border-[#dde3ec] text-[#555] hover:border-[#1a5fa8] hover:text-[#1a5fa8]"}`}>{n}</button>
              ))}
            </div>
          </section>

          {/* ── Services ── */}
          <section className="mb-10">
            <h2 className="text-[20px] font-bold text-[#1a1a2e] text-center mb-5">产地直供配套服务</h2>
            <div className="grid grid-cols-2 gap-4">
              {regionData.services.map((s) => {
                const Icon = s.icon
                return (
                  <div key={s.title} className="bg-white rounded-lg p-5 border border-[#e8edf5]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-full bg-[#e8f4fd] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[#1a5fa8]" />
                      </div>
                      <h3 className="text-[15px] font-semibold text-[#1a1a2e]">{s.title}</h3>
                    </div>
                    <p className="text-[13px] text-[#666] leading-relaxed mb-3">{s.desc}</p>
                    <button className="text-[13px] text-[#1a5fa8] border border-[#1a5fa8] px-4 py-1 rounded hover:bg-[#e8f4fd] transition-colors">
                      我要使用 →
                    </button>
                  </div>
                )
              })}
            </div>
          </section>

          {/* ── Story ── */}
          <section className="mb-8">
            <h2 className="text-[20px] font-bold text-[#1a1a2e] text-center mb-6">{regionData.name}产地故事</h2>
            <div className="grid grid-cols-[1fr_380px] gap-8 items-start">
              <div className="grid grid-cols-4 gap-2">
                {regionData.storyImages.map((src, i) => (
                  <div key={i} className="relative rounded-lg overflow-hidden aspect-[4/3]">
                    <Image src={src} alt={`产地故事图 ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
              <div>
                {regionData.story.split("\n\n").map((para, i) => (
                  <p key={i} className="text-[13px] text-[#555] leading-relaxed mb-3">{para}</p>
                ))}
              </div>
            </div>
          </section>

        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
