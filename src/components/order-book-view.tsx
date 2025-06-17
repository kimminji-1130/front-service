import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import { useMarketStore } from "@/store/marketStore"
import GeneralAskingPrice from "./general-asking-price";
import GeneralAskingTotalPrice from "./general-asking-total-price";

export default function OrderBookView() {
  const { orderbooks, tickers, selectedMarket, connect, tradeData } = useMarketStore();
  const [activeTab, setActiveTab] = useState<'일반호가' | '누적호가'>('일반호가');

  useEffect(() => {
    connect();
  }, [connect]);

  const orderbook = orderbooks[selectedMarket];
  const ticker = tickers[selectedMarket];
  const asks = orderbook?.orderbook_units?.slice(0, 30) ?? [];
  const bids = orderbook?.orderbook_units?.slice(0, 30) ?? [];
  const change = ticker ? (ticker.signed_change_rate * 100).toFixed(2) + "%" : "";
  const trades = tradeData?.[selectedMarket] ?? [];
  
  // 체결강도 계산
  const tradeStrength = ticker ? ((ticker.acc_bid_volume / ticker.acc_ask_volume) * 100).toFixed(2) : '0.00';
  
  // 거래량: 정수, 거래대금: 백만원 단위(소수점 2자리)
  const formattedVolume = ticker ? Math.floor(ticker.acc_trade_volume_24h).toLocaleString() : '-';
  const formattedPrice = ticker ? (ticker.acc_trade_price_24h / 1_000_000).toLocaleString(undefined, { maximumFractionDigits: 0 }) : '-';
  
  // 총액(KRW) 계산
  const askPrice = orderbook?.orderbook_units?.[0]?.ask_price ?? 0;
  const bidPrice = orderbook?.orderbook_units?.[0]?.bid_price ?? 0;
  const totalAskKRW = orderbook ? Math.floor(orderbook.total_ask_size * askPrice).toLocaleString() : '-';
  const totalBidKRW = orderbook ? Math.floor(orderbook.total_bid_size * bidPrice).toLocaleString() : '-';

  // 누적호가 계산
  // 매도 누적호가 (asks: 높은 가격이 아래로)
  const asksReversed = asks.slice().reverse();
  let askCumulativeVolume = 0;
  let askCumulativeAmount = 0;
  const askCumulativeRows = asksReversed.map(item => {
    askCumulativeVolume += item.ask_size;
    const amount = item.ask_size * item.ask_price;
    askCumulativeAmount += amount;
    return {
      ...item,
      cumulativeVolume: askCumulativeVolume,
      amount,
      cumulativeAmount: askCumulativeAmount,
    };
  }).reverse();

  // 매수 누적호가 (bids: 낮은 가격이 아래로)
  let bidCumulativeVolume = 0;
  let bidCumulativeAmount = 0;
  const bidCumulativeRows = bids.map(item => {
    bidCumulativeVolume += item.bid_size;
    const amount = item.bid_size * item.bid_price;
    bidCumulativeAmount += amount;
    return {
      ...item,
      cumulativeVolume: bidCumulativeVolume,
      amount,
      cumulativeAmount: bidCumulativeAmount,
    };
  });

  return (
    <div className="bg-white h-screen flex flex-col">
      {/* 주문 탭 영역 (헤더) */}
      <div className="flex border-b bg-white">
        <button
          className={`px-6 py-3 font-medium ${activeTab === '일반호가' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700'}`}
          onClick={() => setActiveTab('일반호가')}
        >
          일반호가
        </button>
        <button
          className={`px-6 py-3 font-medium ${activeTab === '누적호가' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700'}`}
          onClick={() => setActiveTab('누적호가')}
        >
          누적호가
        </button>
        <div className="ml-auto flex items-center pr-2">
          <span className="text-sm text-gray-500">모아보기</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>

      {activeTab === '일반호가' ? (
        <>
        <div className="flex flex-col h-9/10 overflow-y-scroll">
          <GeneralAskingPrice />
        </div>
        <div className="flex flex-col h-1/10">
          <GeneralAskingTotalPrice />
        </div>
        </>
      ) : null}
    </div>
  )
}
