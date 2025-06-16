"use client"

import { useState } from "react"
import { ChevronDown, Settings } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BitcoinTrading() {
  const [activeTab, setActiveTab] = useState("price")

  return (
    <div className="w-full max-w-5xl mx-auto bg-white border rounded-md shadow">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-[#F7931A] text-white rounded-full">
            <span className="font-bold">₿</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium text-gray-800">비트코인 BTC/KRW</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>

        <div className="flex items-center">
          <Tabs defaultValue="price" className="w-auto">
            <TabsList className="bg-transparent p-0">
              <TabsTrigger
                value="price"
                className="px-6 py-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent rounded-none"
              >
                시세
              </TabsTrigger>
              <TabsTrigger
                value="info"
                className="px-6 py-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent rounded-none"
              >
                정보
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <button className="ml-4 p-2">
            <Settings className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Price section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <h1 className="text-4xl font-bold text-red-600">146,417,000</h1>
                <span className="ml-1 text-gray-500">KRW</span>
              </div>
              <div className="flex items-center mt-1 text-red-600">
                <span className="font-medium">+0.42%</span>
                <span className="mx-1">▲</span>
                <span className="font-medium">616,000</span>
              </div>
            </div>

            {/* Chart */}
            <div className="mt-4 h-12 bg-gray-50 rounded">
              <svg viewBox="0 0 200 50" className="w-full h-full">
                <path
                  d="M0,40 L20,38 L40,35 L60,30 L80,32 L100,25 L120,20 L140,15 L160,18 L180,10 L200,12"
                  fill="none"
                  stroke="#E0E0E0"
                  strokeWidth="1"
                />
                <path
                  d="M0,40 L20,38 L40,35 L60,30 L80,32 L100,25 L120,20 L140,15 L160,18 L180,10 L200,12"
                  fill="none"
                  stroke="#FF4560"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          {/* Info section */}
          <div className="col-span-1">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">고가</span>
                <span className="font-medium text-red-600">146,896,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">저가</span>
                <span className="font-medium text-blue-600">143,000,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">거래량(24H)</span>
                <span className="font-medium">
                  2,438.143 <span className="text-gray-500">BTC</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">거래대금(24H)</span>
                <span className="font-medium">
                  353,705,214,848 <span className="text-gray-500">KRW</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
