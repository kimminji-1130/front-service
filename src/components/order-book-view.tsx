import { ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"

export default function OrderBookView() {
  const askOrders = [
    { quantity: "29,794,202", price: "147,680,000", change: "+1.15%" },
    { quantity: "29,671,753", price: "147,679,000", change: "+1.15%" },
    { quantity: "2,080,645", price: "147,677,000", change: "+1.15%" },
    { quantity: "69,964,903", price: "147,675,000", change: "+1.15%", highlighted: true },
    { quantity: "6,587,931", price: "147,674,000", change: "+1.15%" },
    { quantity: "2,742,990", price: "147,671,000", change: "+1.15%" },
    { quantity: "91,813,211", price: "147,670,000", change: "+1.15%", highlighted: true },
    { quantity: "1,774,448", price: "147,669,000", change: "+1.15%" },
    { quantity: "29,794,202", price: "147,680,000", change: "+1.15%" },
    { quantity: "29,671,753", price: "147,679,000", change: "+1.15%" },
    { quantity: "2,080,645", price: "147,677,000", change: "+1.15%" },
    { quantity: "69,964,903", price: "147,675,000", change: "+1.15%", highlighted: true },
    { quantity: "6,587,931", price: "147,674,000", change: "+1.15%" },
    { quantity: "2,742,990", price: "147,671,000", change: "+1.15%" },
    { quantity: "91,813,211", price: "147,670,000", change: "+1.15%", highlighted: true },
    { quantity: "1,774,448", price: "147,669,000", change: "+1.15%" },
    { quantity: "29,794,202", price: "147,680,000", change: "+1.15%" },
    { quantity: "29,671,753", price: "147,679,000", change: "+1.15%" },
    { quantity: "2,080,645", price: "147,677,000", change: "+1.15%" },
    { quantity: "69,964,903", price: "147,675,000", change: "+1.15%", highlighted: true },
    { quantity: "6,587,931", price: "147,674,000", change: "+1.15%" },
    { quantity: "2,742,990", price: "147,671,000", change: "+1.15%" },
    { quantity: "91,813,211", price: "147,670,000", change: "+1.15%", highlighted: true },
    { quantity: "1,774,448", price: "147,669,000", change: "+1.15%" },
    { quantity: "29,794,202", price: "147,680,000", change: "+1.15%" },
    { quantity: "29,671,753", price: "147,679,000", change: "+1.15%" },
    { quantity: "2,080,645", price: "147,677,000", change: "+1.15%" },
    { quantity: "69,964,903", price: "147,675,000", change: "+1.15%", highlighted: true },
    { quantity: "6,587,931", price: "147,674,000", change: "+1.15%" },
    { quantity: "2,742,990", price: "147,671,000", change: "+1.15%" },
  ]

  const bidOrders = [
    { price: "147,627,000", change: "+1.12%", quantity: "11,231" },
    { price: "147,626,000", change: "+1.12%", quantity: "10,927" },
    { price: "147,625,000", change: "+1.12%", quantity: "1,773,920" },
    { price: "147,624,000", change: "+1.11%", quantity: "4,997,501" },
    { price: "147,620,000", change: "+1.11%", quantity: "47,999" },
    { price: "147,603,000", change: "+1.10%", quantity: "1,144,280" },
    { price: "147,600,000", change: "+1.10%", quantity: "227,822" },
    { price: "147,598,000", change: "+1.10%", quantity: "4,252,887" },
    { price: "147,627,000", change: "+1.12%", quantity: "11,231" },
    { price: "147,626,000", change: "+1.12%", quantity: "10,927" },
    { price: "147,625,000", change: "+1.12%", quantity: "1,773,920" },
    { price: "147,624,000", change: "+1.11%", quantity: "4,997,501" },
    { price: "147,620,000", change: "+1.11%", quantity: "47,999" },
    { price: "147,603,000", change: "+1.10%", quantity: "1,144,280" },
    { price: "147,600,000", change: "+1.10%", quantity: "227,822" },
    { price: "147,598,000", change: "+1.10%", quantity: "4,252,887" },
    { price: "147,627,000", change: "+1.12%", quantity: "11,231" },
    { price: "147,626,000", change: "+1.12%", quantity: "10,927" },
    { price: "147,625,000", change: "+1.12%", quantity: "1,773,920" },
    { price: "147,624,000", change: "+1.11%", quantity: "4,997,501" },
    { price: "147,620,000", change: "+1.11%", quantity: "47,999" },
    { price: "147,603,000", change: "+1.10%", quantity: "1,144,280" },
    { price: "147,600,000", change: "+1.10%", quantity: "227,822" },
    { price: "147,598,000", change: "+1.10%", quantity: "4,252,887" },
    { price: "147,627,000", change: "+1.12%", quantity: "11,231" },
    { price: "147,626,000", change: "+1.12%", quantity: "10,927" },
    { price: "147,625,000", change: "+1.12%", quantity: "1,773,920" },
    { price: "147,624,000", change: "+1.11%", quantity: "4,997,501" },
    { price: "147,620,000", change: "+1.11%", quantity: "47,999" },
    { price: "147,603,000", change: "+1.10%", quantity: "1,144,280" },
  ]

  const tradeData = [
    { price: "147,735,000", amount: "398,994", color: "blue" },
    { price: "147,735,000", amount: "14,664", color: "blue" },
    { price: "147,781,000", amount: "48,618", color: "red" },
    { price: "147,781,000", amount: "120,001", color: "red" },
    { price: "147,777,000", amount: "100,001", color: "red" },
    { price: "147,772,000", amount: "537,061", color: "red" },
    { price: "147,735,000", amount: "116,944", color: "blue" },
    { price: "147,736,000", amount: "1,244", color: "blue" },
    { price: "147,772,000", amount: "14,777", color: "red" },
    { price: "147,736,000", amount: "694,359", color: "blue" },
    { price: "147,736,000", amount: "527,519", color: "red" },
    { price: "147,735,000", amount: "250,841", color: "blue" },
    { price: "147,735,000", amount: "33,218", color: "blue" },
    { price: "147,735,000", amount: "147,735", color: "blue" },
    { price: "147,736,000", amount: "4,999", color: "red" },
  ]

  const tabs = [
    { id: "일반호가", label: "일반호가" },
    { id: "누적호가", label: "누적호가" },
  ]

  const [activeTab, setActiveTab] = useState("일반호가")

  return (
    <div className="bg-white h-screen flex flex-col">
      {/* 주문 탭 영역 (헤더) */}
      <div className="flex border-b bg-white">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-6 py-3 font-medium ${
              activeTab === tab.id ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-700"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
        <div className="ml-auto flex items-center pr-2">
          <span className="text-sm text-gray-500">모아보기</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>

      {/* 주문 영역 (본문) */}
      <div className="grid grid-cols-3 grid-rows-60 overflow-y-auto">
        {/* 매도호가 영역 */}
        <div className="col-span-2 row-span-30">
          <div className="flex-1">
            {askOrders.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-2 items-center h-8 px-3 text-sm border-b border-gray-100 hover:bg-gray-100 ${item.highlighted ? "bg-blue-100" : "bg-blue-50"}`}
              >
                <div className="text-gray-700 text-right font-medium pr-2">{item.quantity}</div>
                <div className="flex items-center gap-x-4 justify-center">
                  <span className="text-red-600 font-bold">{item.price}</span>
                  <span className="text-red-600 font-medium">{item.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 거래 정보 영역 */}
        <div className="col-span-1 row-span-30">
          <div className="bg-gray-50 p-4 h-full flex flex-col justify-end">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">거래량</span>
                <div className="text-right">
                  <div className="font-bold">828 BTC</div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">거래대금</span>
                <div className="text-right">
                  <div className="font-bold">121,210 백만원</div>
                  <div className="text-xs text-gray-500">(최근24시간)</div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">52주 최고</span>
                <div className="text-right">
                  <div className="font-bold text-red-600">163,325,000</div>
                  <div className="text-xs text-gray-500">(2025.01.20)</div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">52주 최저</span>
                <div className="text-right">
                  <div className="font-bold text-blue-600">72,100,000</div>
                  <div className="text-xs text-gray-500">(2024.08.05)</div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">전일종가</span>
                <div className="font-bold">145,997,000</div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">당일고가</span>
                <div className="text-right">
                  <div className="font-bold text-red-600">147,708,000</div>
                  <div className="text-xs text-red-600">+1.17%</div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">당일저가</span>
                <div className="text-right">
                  <div className="font-bold text-blue-600">145,250,000</div>
                  <div className="text-xs text-blue-600">-0.51%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 체결 정보 영역 */}
        <div className="col-span-1 row-span-30">
          <div className="flex justify-center p-2">
            <div className="text-sm">
              <span className="text-gray-600">체결강도</span>
              <span className="ml-2 font-bold">+145.30%</span>
            </div>
          </div>
          <div className="bg-gray-100 flex text-xs text-gray-600 mb-2 font-medium p-3">
            <div className="flex-1 text-center">체결가</div>
            <div className="flex-1 text-center">체결액</div>
          </div> 
            <div className="h-64">
              {tradeData.map((item, index) => (
                <div key={index} className="flex items-center py-1 text-xs hover:bg-gray-100">
                  <div className="w-28 pr-4 text-gray-800 text-right font-medium">{item.price}</div>
                  <div className={`flex-1 text-right font-medium pr-4 ${item.color === "red" ? "text-red-600" : "text-blue-600"}`}>
                    {item.amount}
                  </div>
                </div>
              ))}
            </div>
        </div>

        {/* 매수호가 영역 */}
        <div className="col-span-2 row-span-30">
          <div className="flex-1">
            {bidOrders.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-2 items-center h-8 px-3 text-sm border-b border-gray-100 hover:bg-gray-100 bg-red-50"
              >
                <div className="flex items-center gap-x-4 justify-center">
                  <span className="text-red-600 font-bold">{item.price}</span>
                  <span className="text-red-600 font-medium pr-6">{item.change}</span>
                </div>
                <div className="text-gray-700 text-left font-medium pl-2">{item.quantity}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 총액 영역 */}
      <div className="flex justify-between items-center px-3 py-2 text-sm border-t bg-gray-50">
        <span className="text-gray-600 font-medium">457,146,073</span>
        <span className="font-bold">총액(KRW)</span>
        <span className="text-gray-600 font-medium">146,047,012</span>
      </div>
    </div>
  )
}
