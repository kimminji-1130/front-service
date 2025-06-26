'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"

import MarketSortBar from "@/components/MarketSortBar";
import MarketTabs from "@/components/MarketTabs";
import SearchBar from "@/components/SearchBar";
import MarketList from "@/components/MarketList";

export default function AssetsPage() {

  const router = useRouter();

  // 초기 탭 설정
  useEffect(() => {
      router.push('/portfolio/profit-loss');
  })

  return (
    <main className="grid grid-cols-3 gap-2 min-h-scren p-4 md:p-8 bg-gray-50">
      <div className="col-span-2 border rounded-md overflow-hidden bg-white">
        <div className="w-full max-w-6xl mx-auto pt-4 bg-white">
          <div className="w-full max-w-6xl mx-auto pt-4 bg-white">
            <button className="px-6 py-3 text-sm font-medium border-b-2 text-blue-600 border-blue-600">
              보유자산
            </button>
            <button className="px-6 py-3 text-sm font-medium border-b-2 text-gray-500 border-transparent">
              투자손익
            </button>
          </div>
        </div>
      </div>

      {/* Right section - 1/3 width (1 column) */}
      <div className="relative col-span-1">
        <div className="sticky top-4 flex h-[calc(100vh-2rem)] flex-col gap-2">
          {/* Non-scrolling part */}
          <div className="flex-shrink-0">
            <SearchBar />
            <div className="mt-2 rounded-t-md border-x border-t bg-white">
              <MarketTabs />
              <MarketSortBar />
            </div>
          </div>
                  
          {/* Scrolling part */}
          <div className="flex-1 rounded-b-md border-x border-b bg-white overflow-y-auto">
            <MarketList />
          </div>
        </div>
      </div>
    </main>
  )

}