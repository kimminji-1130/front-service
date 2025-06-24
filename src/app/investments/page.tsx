'use client';

import MarketSortBar from "@/components/MarketSortBar";
import MarketTabs from "@/components/MarketTabs";
import SearchBar from "@/components/SearchBar";
import MarketList from "@/components/MarketList";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InvestmentsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("거래내역");

  const tabs = ["거래내역", "미체결"];

  // URL parameter에서 초기 탭 설정
  useEffect(() => {
    router.push('/investments/transaction-history');
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "미체결") {
      router.push('/investments/wait-orders');
    } else {
      router.push('/investments/transaction-history');
    }
  };

  return (
    <main className="grid grid-cols-3 gap-2 min-h-screen p-4 md:p-8 bg-gray-50">
      {/* Left section - 2/3 width (2 columns) */}
      <div className="col-span-2 flex flex-col gap-2">
        <div className="border rounded-md overflow-hidden bg-white">
          <div className="w-full max-w-6xl mx-auto p-4 bg-white">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
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
  );
}
