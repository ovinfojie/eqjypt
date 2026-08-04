"use client"

import { useRouter } from "next/navigation"

const PRODUCTS = [
  { name: "丝苗米", spec: "吨", qty: "10.00(吨)", price: "3000.00", amount: "30000.00" },
  { name: "粮发香丝干谷", spec: "吨", qty: "50.00(吨)", price: "4000.00", amount: "200000.00" },
]

const TERMS: { title: string; items?: string[]; text?: string }[] = [
  { title: "二、质量标准：GB 1350-2009 三等粮。" },
  {
    title: "三、交货期限、地点、验收方式、重量计量、运输方式及费用承担",
    items: [
      "(一)交货期限：2025年12月31日前交货完毕，以实际交货数量为准。",
      "(二)交货及验货地点：甲方指定地点。",
      "(三)重量计量：以交货地点卸货确单方式进行计量。",
      "(四)此合同单价为参考价，实际结算单价以双方协商为准。",
    ],
    text: "费用承担：该合同对应交货地点及交易中产生的手续费、入仓费、违约责任由卖方承担。",
  },
  {
    title: "四、付款方式、发票交付及期限：收货后开具增值税专用发票付款，分批交付，以实际入库数量的对账单为准；买方需在收到有效发票十个工作日内支付货款到卖方指定账户。",
  },
  {
    title: "五、合同的补充、变更、转让及终止",
    items: [
      "(一)合同的补充：本合同如有未尽事宜，须经双方共同协商，签订补充合同，补充合同与本合同具有同等效力。如补充合同与本合同条款不一致的，则以补充合同为准。",
      "(二)合同的变更：本合同行期间，发生特殊情况时，甲、乙任何一方需变更本合同的，要求变更一方应及时书面通知对方，征得对方同意后，双方在规定的时限内(书面通知发出5日内)签订书面变更协议，该协议将成为本合同不可分割的部分。未经双方签署书面文件，任何一方无权变更本合同，否则，由此造成对方的经济损失，由责任方承担。",
      "(三)合同的转让：本合同在履行过程中任何一方都可以将合同的权利和义务转让给第三方，但是在转让前必须得到对方的同意并签订书面转让协议，书面转让协议签订后作为本合同不可分割的一部分。",
      "(四)合同的终止：本合同履行期间，若发生特殊情况时，需要终止合同，须经双方同意，并签订合同终止协议后方可生效。",
    ],
  },
  {
    title: "六、不可抗力及风险转移条款",
    items: [
      "(一)不可抗力条款：任何一方因不可抗力事件不能按照本合同约定行合同时，应在该不可抗力事件发生后7日内通知另一方，并提供有关该不可抗力事件及其持续时间的证据及合同不能行或者需要延期或部分履行的书面资料。如不可抗力事件持续超过 15 日，甲乙双方应对本合同的行或解除进行协商。如果不可抗力事件发生后，甲乙双方不能达成协议，则任何一方均有权解除合同，不可抗力引起的合同不能按照约定履行的按据《民法典》规定处理。",
      "(二)货物的风险至相关检查单位检测验收合格并实际接受货物之日起转移至甲方承担，对于甲方验收不合格的货物，在甲方验收合格并实际接受前，货物的风险由乙方承担，对于甲方拒收的货物(包括但不限于因验收不合格而拒收、因乙方不按时交货而拒收等)，货物毁损灭失的风险由乙方承担。",
    ],
  },
  {
    title: "七、违约责任",
    items: [
      "(一)乙方交付货物时，若货物质量不符合本合同第二条规定，甲方不愿接受的，甲方有权拒收并视为乙方未交付货物;若货物质量不符合本合同第二条规定，但甲方愿意接受的，乙方货款按甲方质检标准扣减货款。",
      "(二)未经甲方书面许可，乙方不得就本合同项下发生业务向第三方机构办理任何融资等业务，如有违反，由此产生的一切责任与损失由乙方承担。",
    ],
  },
  {
    title: "八、其他约定事项",
    items: [
      "(一)本合同签订同时双方均应该提供各自的合法证件。",
      "(二)本合同在履行过程中的单据、函件等行中的文书作为合同履行的证据是合同履行情况的说明",
      "(三)甲乙双方向同意严格遵守国家有关法律法规和国有企业有关廉政规定，承诺不得以任何形式向对方工作人员(包括其亲属或亲友)提供任何不正当利益，坚决拒绝商业贿赂行为。若发现甲方(或乙方)工作人员(包括其亲属或亲友)索取任何不正当利益，须及时向甲方(或乙方)有关部门举报，并积极配合调查取证。",
      "(四)解决合同纠纷的方式:发生争议后，双方应友好协商，协商不成的，双方同意提交广州市荔湾区人民法院解决。",
      "(五)本合同经买卖双方签字盖业后生效，合同正本壹式叁份，甲方执贰份，乙方执壹份，均具有同等法律效力。",
    ],
  },
]

export default function ContractViewPage() {
  const router = useRouter()

  return (
    <div>
      {/* 顶部标题栏 */}
      <div className="border-b border-[#e8edf5] pb-4 mb-6">
        <h1 className="text-[20px] font-bold text-[#1a1a2e]">合同签订</h1>
      </div>

      <div className="max-w-[960px] mx-auto bg-white">
        {/* 合同编号 */}
        <div className="text-right text-[13px] text-[#333] border-b border-[#333] pb-3 mb-8">
          合同编号：<span className="font-medium">HT-2026-06001</span>
        </div>

        {/* 合同标题 */}
        <h2 className="text-center text-[18px] font-bold text-[#1a1a2e] mb-8">2026年粮食采购合同</h2>

        {/* 签署地/时间 */}
        <div className="flex justify-between text-[13px] text-[#333] mb-6">
          <span>合同签署地：线上电子合同</span>
          <span className="mr-8">合同签订时间：2025年10月26日</span>
        </div>

        {/* 甲乙方信息 */}
        <div className="grid grid-cols-2 gap-x-12 text-[13px] text-[#333] leading-[2] mb-6">
          <div>
            <div>甲方(买方)：广东新供销天润粮油集团有限公司</div>
            <div>统一社会信用代码：91440282XB</div>
            <div>法定代表人：柯英超</div>
            <div>联系人及联系电话：王汉18978907891</div>
            <div>联系地址：广东省广州市荔湾区荔湾路198号</div>
            <div>开户银行：中国农业发展银行广州市分行</div>
            <div>银行账号：20344994444100000891281</div>
          </div>
          <div>
            <div>乙方(卖方)：南雄市社村合作农业发展有限公司</div>
            <div>统一社会信用代码：91440282XB</div>
            <div>法定代表人：张悦</div>
            <div>联系人及联系电话：张悦15527522832</div>
            <div>联系地址：广东省南雄市珠玑镇下汾村委会赤珠塘村879号</div>
            <div>开户银行：南雄农商银行</div>
            <div>银行账号：623553366600156646</div>
          </div>
        </div>

        <div className="text-[13px] text-[#333] mb-4">买卖双方就购销 2026年稻谷 产品事宜，经双方平等协商达成如下协议：</div>

        {/* 一、产品信息 */}
        <div className="text-[13px] text-[#333] font-medium mb-3">一、产品信息</div>
        <table className="w-full border-collapse text-[13px] mb-6">
          <thead>
            <tr className="bg-[#f5f7fa]">
              {["商品", "下单数量(单位)", "下单单价(元)", "下单金额(元)"].map(h => (
                <th key={h} className="border border-[#e8edf5] px-4 py-3 font-semibold text-[#666] text-center">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map(p => (
              <tr key={p.name}>
                <td className="border border-[#e8edf5] px-4 py-4 text-center">
                  <div className="text-[#1a1a2e]">{p.name}</div>
                  <div className="text-[12px] text-[#999]">规格：{p.spec}</div>
                </td>
                <td className="border border-[#e8edf5] px-4 py-4 text-center text-[#333]">{p.qty}</td>
                <td className="border border-[#e8edf5] px-4 py-4 text-center text-[#333]">{p.price}</td>
                <td className="border border-[#e8edf5] px-4 py-4 text-center text-[#333]">{p.amount}</td>
              </tr>
            ))}
            <tr>
              <td className="border border-[#e8edf5] px-4 py-3 font-bold text-[#1a1a2e]">合计金额人民币</td>
              <td className="border border-[#e8edf5] px-4 py-3 text-center text-[#333]" colSpan={2}>贰拾叁万元整</td>
              <td className="border border-[#e8edf5] px-4 py-3 text-center text-[#333]">230000.00</td>
            </tr>
          </tbody>
        </table>

        {/* 条款 */}
        <div className="space-y-3 text-[13px] text-[#333] leading-[1.9]">
          {TERMS.map((t, i) => (
            <div key={i}>
              <div>{t.title}</div>
              {t.items?.map((it, j) => <div key={j}>{it}</div>)}
              {t.text && <div>{t.text}</div>}
            </div>
          ))}
        </div>

        {/* 签章区 */}
        <div className="grid grid-cols-2 gap-x-12 mt-10 text-[13px] text-[#333]">
          <div>
            <div className="mb-3">甲方(签章)：广东新供销天润粮油集团有限公司</div>
            <div className="flex items-center gap-3 mb-4">
              <span>法定代表人/授权代表签章：</span>
              <button className="px-3 py-1 bg-[#1a5fa8] text-white text-[12px] rounded">签章</button>
              <button className="px-3 py-1 bg-[#1a5fa8] text-white text-[12px] rounded">签字</button>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-28 h-28 rounded-full border-4 border-[#c0392b] flex flex-col items-center justify-center text-[#c0392b]">
                <div className="text-[22px] leading-none">★</div>
                <div className="text-[9px] mt-1 text-center px-2">广东新供销天润粮油集团有限公司</div>
                <div className="text-[10px] mt-0.5">合同专用章</div>
              </div>
              <div className="w-24 h-16 border-2 border-[#c0392b] flex items-center justify-center text-[#c0392b] text-[18px] font-bold">柯英超</div>
            </div>
          </div>
          <div>
            <div className="mb-3">乙方(签章)：南雄市社村合作农业发展有限公司</div>
            <div className="mb-4 h-[30px]">法定代表人/授权代表签章：</div>
            <div className="flex items-center gap-4">
              <div className="w-28 h-28 rounded-full border-4 border-[#c0392b] flex flex-col items-center justify-center text-[#c0392b]">
                <div className="text-[9px] text-center px-2">南雄市社村合作农业发展有限公司</div>
                <div className="text-[22px] leading-none my-0.5">★</div>
                <div className="text-[10px]">合同专用章</div>
              </div>
              <div className="w-24 h-16 border border-[#ccc] flex items-center justify-center text-[#1a1a2e] text-[20px] italic" style={{ fontFamily: "cursive" }}>张悦</div>
            </div>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="flex justify-center gap-4 mt-12 mb-8">
          <button onClick={() => router.back()} className="px-8 py-2 border border-[#dde3ec] text-[#555] text-[13px] rounded hover:border-[#999]">返回</button>
          <button className="px-8 py-2 bg-[#1a5fa8] text-white text-[13px] font-semibold rounded hover:bg-[#0d4a8a]">提交</button>
        </div>
      </div>
    </div>
  )
}
