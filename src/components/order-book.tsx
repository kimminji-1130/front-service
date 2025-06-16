"use client"

export interface OrderBookEntry {
  quantity: string
  price: string
  change: string
}

export default function OrderBook() {
  const orderBookEntries: OrderBookEntry[] = [
    { quantity: "0.037", price: "146,556,000", change: "+0.52%" },
    { quantity: "0.044", price: "146,546,000", change: "+0.51%" },
    { quantity: "0.020", price: "146,545,000", change: "+0.51%" },
    { quantity: "0.015", price: "146,544,000", change: "+0.51%" },
    { quantity: "0.017", price: "146,540,000", change: "+0.51%" },
    { quantity: "0.026", price: "146,535,000", change: "+0.50%" },
    { quantity: "0.001", price: "146,519,000", change: "+0.49%" },
    { quantity: "0.008", price: "146,517,000", change: "+0.49%" },
    { quantity: "0.027", price: "146,504,000", change: "+0.48%" },
    { quantity: "0.027", price: "146,503,000", change: "+0.48%" },
    { quantity: "0.001", price: "146,500,000", change: "+0.48%" },
    { quantity: "0.010", price: "146,499,000", change: "+0.48%" },
    { quantity: "0.297", price: "146,494,000", change: "+0.48%" },
    { quantity: "0.005", price: "146,489,000", change: "+0.47%" },
    { quantity: "0.010", price: "146,488,000", change: "+0.47%" },
    { quantity: "0.010", price: "146,477,000", change: "+0.46%" },
  ]

  return (
    <div className="w-full bg-gray-50">
      <div className="grid grid-cols-3 text-sm">
        <div className="py-2 px-4 text-center">누적호가</div>
        <div className="py-2 px-4 text-center">호가주문</div>
        <div className="py-2 px-4 text-center">전일대비</div>
      </div>

      <div className="divide-y divide-gray-200">
        {orderBookEntries.map((entry, index) => (
          <div key={index} className="grid grid-cols-3 text-sm py-2 bg-gray-50">
            <div className="px-4 text-center">{entry.quantity}</div>
            <div className="px-4 text-center text-red-500 font-medium">{entry.price}</div>
            <div className="px-4 text-center text-red-500">{entry.change}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-between border-t border-b py-2 px-4 text-sm">
        <div className="flex items-center">
          <span className="mr-2">일괄취소</span>
          <span>3.617</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">수량(BTC)</span>
          <span>0.228</span>
        </div>
        <div>
          <span>일괄취소</span>
        </div>
      </div>
    </div>
  )
}
