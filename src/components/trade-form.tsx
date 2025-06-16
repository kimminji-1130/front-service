"use client"

import { useState } from "react"
import { Info } from "lucide-react"

export default function TradeForm() {
  const [activeTab, setActiveTab] = useState("매수")
  const [price, setPrice] = useState("146,673,000")
  const [amount, setAmount] = useState("")
  const [selectedPercentage, setSelectedPercentage] = useState("")

  const tabs = [
    { id: "매수", label: "매수" },
    { id: "매도", label: "매도" },
    { id: "간편주문", label: "간편주문" },
    { id: "거래내역", label: "거래내역" },
  ]

  const percentages = ["10%", "25%", "50%", "100%", "직접입력"]

  return (
    <div className="w-full bg-white border rounded-md">
      {/* Tabs */}
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 py-3 font-medium ${
              activeTab === tab.id
                ? tab.id === "매수"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Order Type */}
      <div className="p-4 flex items-center">
        <div className="flex items-center mr-2">
          <span className="text-sm mr-1">주문유형</span>
          <Info className="h-4 w-4 text-gray-400" />
        </div>
        <div className="flex items-center space-x-2">
          <label className="flex items-center">
            <input type="radio" name="orderType" className="mr-1 accent-blue-600" defaultChecked />
            <span className="text-sm">지정가</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="orderType" className="mr-1 accent-blue-600" />
            <span className="text-sm">시장가</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="orderType" className="mr-1 accent-blue-600" />
            <span className="text-sm">예약지정가</span>
          </label>
        </div>
      </div>

      {/* Available Balance */}
      <div className="px-4 py-2 flex justify-between">
        <span className="text-sm">주문가능</span>
        <span className="text-sm font-medium">0 KRW</span>
      </div>

      {/* Price Input */}
      <div className="px-4 py-2">
        <div className="flex items-center mb-1">
          <span className="text-sm">매수가격 (KRW)</span>
        </div>
        <div className="flex">
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="flex-1 border rounded-l p-2 text-right"
          />
          <div className="flex border-t border-r border-b rounded-r">
            <button className="px-3 py-2 text-gray-600">−</button>
            <button className="px-3 py-2 text-gray-600">+</button>
          </div>
        </div>
      </div>

      {/* Amount Input */}
      <div className="px-4 py-2">
        <div className="flex items-center mb-1">
          <span className="text-sm">주문수량 (BTC)</span>
        </div>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded p-2 text-right"
          placeholder="0"
        />
      </div>

      {/* Percentage Buttons */}
      <div className="px-4 py-2 grid grid-cols-5 gap-2">
        {percentages.map((percent) => (
          <button
            key={percent}
            className={`py-1 text-sm border rounded ${
              selectedPercentage === percent ? "bg-gray-100 border-gray-400" : "border-gray-300"
            }`}
            onClick={() => setSelectedPercentage(percent)}
          >
            {percent}
          </button>
        ))}
      </div>

      {/* Total */}
      <div className="px-4 py-2">
        <div className="flex items-center mb-1">
          <span className="text-sm">주문총액 (KRW)</span>
        </div>
        <input type="text" readOnly value="0" className="w-full border rounded p-2 text-right" />
      </div>

      {/* Fee Info */}
      <div className="px-4 py-2 text-xs text-gray-500 text-center">
        최소주문금액: 5,000 KRW · 수수료(부가세 포함): 0.05%
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-2 grid grid-cols-2 gap-2">
        <button className="py-3 bg-gray-400 text-white rounded flex items-center justify-center">
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M12 16L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M9 11L12 8L15 11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          초기화
        </button>
        <button className="py-3 bg-red-500 text-white rounded">매수</button>
      </div>
    </div>
  )
}
