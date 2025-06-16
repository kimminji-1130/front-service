"use client"

import { Star } from "lucide-react"

interface CryptoItem {
  id: string
  name: string
  symbol: string
  price: string
  change: string
  changePercent: string
  volume: string
  isFavorite: boolean
  isUp: boolean
  hasWarning?: boolean
}

export default function MarketList() {
  const cryptoList: CryptoItem[] = [
    {
      id: "xrp",
      name: "엑스알피",
      symbol: "XRP/KRW",
      price: "2,980",
      change: "-40",
      changePercent: "-1.32%",
      volume: "414,288백만",
      isFavorite: true,
      isUp: false,
    },
    {
      id: "eth",
      name: "이더리움",
      symbol: "ETH/KRW",
      price: "3,538,000",
      change: "-104,000",
      changePercent: "-2.86%",
      volume: "407,232백만",
      isFavorite: true,
      isUp: false,
      hasWarning: true,
    },
    {
      id: "btc",
      name: "비트코인",
      symbol: "BTC/KRW",
      price: "146,391,000",
      change: "590,000",
      changePercent: "+0.40%",
      volume: "353,712백만",
      isFavorite: true,
      isUp: true,
    },
    {
      id: "usdt",
      name: "테더",
      symbol: "USDT/KRW",
      price: "1,388.0",
      change: "10.0",
      changePercent: "+0.73%",
      volume: "208,843백만",
      isFavorite: true,
      isUp: true,
    },
    {
      id: "nxps",
      name: "넥스페이스",
      symbol: "NXPS/KRW",
      price: "1,816",
      change: "-194",
      changePercent: "-9.65%",
      volume: "197,609백만",
      isFavorite: true,
      isUp: false,
      hasWarning: true,
    },
    {
      id: "sol",
      name: "솔라나",
      symbol: "SOL/KRW",
      price: "203,500",
      change: "-6,700",
      changePercent: "-3.19%",
      volume: "103,524백만",
      isFavorite: true,
      isUp: false,
    },
    {
      id: "doge",
      name: "도지코인",
      symbol: "DOGE/KRW",
      price: "247.0",
      change: "-3.0",
      changePercent: "-1.20%",
      volume: "99,836백만",
      isFavorite: true,
      isUp: false,
    },
    {
      id: "orbs",
      name: "오브스",
      symbol: "ORBS/KRW",
      price: "32.54",
      change: "4.05",
      changePercent: "+14.22%",
      volume: "87,936백만",
      isFavorite: true,
      isUp: true,
      hasWarning: true,
    },
    {
      id: "rvn",
      name: "레이븐코인",
      symbol: "RVN/KRW",
      price: "26.39",
      change: "-3.30",
      changePercent: "-11.11%",
      volume: "85,751백만",
      isFavorite: true,
      isUp: false,
    },
    {
      id: "anime",
      name: "애니메코인",
      symbol: "ANIME/KRW",
      price: "32.50",
      change: "-4.70",
      changePercent: "-12.56%",
      volume: "69,034백만",
      isFavorite: true,
      isUp: false,
    },
    {
      id: "virtual",
      name: "버추얼프로토콜",
      symbol: "VIRTUAL/KRW",
      price: "2,562",
      change: "-6",
      changePercent: "-0.23%",
      volume: "62,475백만",
      isFavorite: true,
      isUp: false,
      hasWarning: true,
    },
  ]

  return (
    <div className="w-full">
      {cryptoList.map((crypto) => (
        <div key={crypto.id} className="flex items-center py-3 border-b text-sm">
          <div className="flex-1 flex items-center px-2">
            <button className="mr-2">
              <Star className={`h-4 w-4 ${crypto.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
            </button>
            <div>
              <div className="font-medium flex items-center">
                {crypto.name}
                {crypto.hasWarning && <span className="ml-1 text-xs bg-orange-500 text-white px-1 rounded">!</span>}
              </div>
              <div className="text-gray-500 text-xs">{crypto.symbol}</div>
            </div>
          </div>
          <div className="flex-1 text-right px-2">
            <div className={`font-medium ${crypto.isUp ? "text-red-500" : "text-blue-500"}`}>{crypto.price}</div>
            <div className={`text-xs ${crypto.isUp ? "text-red-500" : "text-blue-500"}`}>{crypto.change}</div>
          </div>
          <div className="flex-1 text-right px-2">
            <div className={`font-medium ${crypto.isUp ? "text-red-500" : "text-blue-500"}`}>
              {crypto.changePercent}
            </div>
          </div>
          <div className="flex-1 text-right px-2">
            <div className="text-gray-600">{crypto.volume}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
