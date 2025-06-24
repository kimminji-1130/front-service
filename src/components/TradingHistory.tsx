"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search, ChevronDown } from "lucide-react"

export default function TradingInterface() {
  const [activeTab, setActiveTab] = useState("거래내역")
  const [selectedPeriod, setSelectedPeriod] = useState("1개월")
  const [transactionType, setTransactionType] = useState("전체")
  const [orderType, setOrderType] = useState("전체주문")

  const tabs = ["거래내역", "미체결"]
  const periods = ["1주일", "1개월", "3개월", "6개월", "직접입력"]
  const transactionTypes = ["전체", "매수", "매도"]

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-white">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "text-blue-600 border-blue-600"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Transaction History Tab */}
      {activeTab === "거래내역" && (
        <div className="space-y-4">
          {/* Date and Filter Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">기간</span>
              <span className="text-sm text-gray-500">2025.05.25 - 2025.06.24</span>
              <div className="flex space-x-2">
                {periods.map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-1 text-xs border rounded ${
                      selectedPeriod === period
                        ? "bg-blue-50 border-blue-300 text-blue-600"
                        : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Transaction Type and Search */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">종류</span>
              <div className="flex space-x-2">
                {transactionTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setTransactionType(type)}
                    className={`px-3 py-1 text-xs border rounded ${
                      transactionType === type
                        ? "bg-blue-50 border-blue-300 text-blue-600"
                        : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">코인선택</span>
              <div className="relative">
                <Input placeholder="전체" className="w-32 pr-8" />
                <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Transaction Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        체결시간
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        코인
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        마켓
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        종류
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        거래수량
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        거래단가
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        거래금액
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        수수료
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        정산금액
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        주문시간
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={10} className="px-4 py-16 text-center text-gray-500">
                        결과가 없습니다.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Pending Orders Tab */}
      {activeTab === "미체결" && (
        <div className="space-y-4">
          {/* Order Type and Cancel All */}
          <div className="flex items-center justify-between">
            <Select value={orderType} onValueChange={setOrderType}>
              <SelectTrigger className="w-32">
                <SelectValue />
                <ChevronDown className="h-4 w-4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="전체주문">전체주문</SelectItem>
                <SelectItem value="매수주문">매수주문</SelectItem>
                <SelectItem value="매도주문">매도주문</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
              일괄취소
            </Button>
          </div>

          {/* Pending Orders Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        시간
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        미체결
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        거래종목
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        감시가격
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        주문가격
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        주문수량
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        미체결량
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={7} className="px-4 py-16 text-center">
                        <div className="flex flex-col items-center space-y-2">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            <div className="w-8 h-8 bg-gray-300 rounded"></div>
                          </div>
                          <span className="text-gray-500">미체결 주문이 없습니다.</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
