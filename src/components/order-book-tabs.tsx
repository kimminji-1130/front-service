"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"

export default function OrderBookTabs() {
  const [activeTab, setActiveTab] = useState("일반호가")

  const tabs = [
    { id: "일반호가", label: "일반호가" },
    { id: "누적호가", label: "누적호가" },
    { id: "호가주문", label: "호가주문" },
  ]

  return (
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
        <span className="text-sm text-gray-500">더보기</span>
        <ChevronRight className="h-4 w-4 text-gray-500" />
      </div>
    </div>
  )
}
