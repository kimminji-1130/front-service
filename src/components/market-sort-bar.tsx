"use client"

import { ChevronDown } from "lucide-react"

export default function MarketSortBar() {
  return (
    <div className="flex w-full text-sm text-gray-600 border-b py-2">
      <div className="flex-1 flex items-center px-2">
        한글명 <ChevronDown className="h-4 w-4 ml-1" />
      </div>
      <div className="flex-1 flex items-center justify-end px-2">
        현재가 <ChevronDown className="h-4 w-4 ml-1" />
      </div>
      <div className="flex-1 flex items-center justify-end px-2">
        전일대비 <ChevronDown className="h-4 w-4 ml-1" />
      </div>
      <div className="flex-1 flex items-center justify-end px-2">
        거래대금 <ChevronDown className="h-4 w-4 ml-1" />
      </div>
    </div>
  )
}
