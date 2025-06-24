'use client';

import MarketSortBar from "@/components/MarketSortBar";
import MarketTabs from "@/components/MarketTabs";
import SearchBar from "@/components/SearchBar";
import MarketList from "@/components/MarketList";
import TradingHistory from "@/components/TradingHistory";

export default function InvestmentsPage() {
  return (
    <main className="grid grid-cols-3 gap-2 min-h-screen p-4 md:p-8 bg-gray-50">
    {/* Left section - 2/3 width (2 columns) */}
    <div className="col-span-2 flex flex-col gap-2">
        <div className="border rounded-md overflow-hidden bg-white">
          <TradingHistory />
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
