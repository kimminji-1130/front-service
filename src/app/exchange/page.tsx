"use client"

import SearchBar from "@/components/search-bar"
import MarketTabs from "@/components/market-tabs"
import MarketSortBar from "@/components/market-sort-bar"
import MarketList from "@/components/market-list"
import OrderBookTabs from "@/components/order-book-tabs"
import OrderBook from "@/components/order-book"
import TradeForm from "@/components/trade-form"
import BitcoinTrading from "@/components/crypto-trading"

export default function ExchangePage() {
  return (
    <main className="grid grid-cols-3 gap-2 min-h-screen p-4 md:p-8">
      {/* Left section - 2/3 width */}
      <div className="col-span-2 flex flex-col gap-2">
        {/* Bitcoin Trading Section - Full width */}
        <div className="border rounded-md overflow-hidden">
          <BitcoinTrading />
        </div>

        {/* Order Book and Trade Form Section - Split into two columns */}
        <div className="grid grid-cols-2 gap-2">
          <div className="border rounded-md overflow-hidden">
            <OrderBookTabs />
            <OrderBook />
          </div>
          <div className="border rounded-md overflow-hidden">
            <TradeForm />
          </div>
        </div>
      </div>

      {/* Right section - 1/3 width */}
      <div className="col-span-1 flex flex-col gap-2">
        <SearchBar />
        <div className="border rounded-md overflow-hidden flex-1">
          <MarketTabs />
          <MarketSortBar />
          <MarketList />
        </div>
      </div>
    </main>
  )
}
