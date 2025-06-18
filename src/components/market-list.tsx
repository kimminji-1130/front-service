"use client"

import { useMarketStore } from "@/store/marketStore"
import { MarketInfo } from "@/types/market"

export default function MarketList() {
  const { markets, tickers } = useMarketStore();

  // 현재가 표시 및 전일 대비 거래량(24H)용 함수
  const currentAndChangePriceFormat = (beforeNumber: number) => {
    return new Intl.NumberFormat('ko-KR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(beforeNumber);
  };

  // 거래대금(24H) 표시 함수
  const price24hFormat = (price: number) => {
    return new Intl.NumberFormat('ko-KR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price / 1_000_000);
  };

  // 전일대비 비율 표시 함수
  const changeRateFormat = (rate: number) => {
    return new Intl.NumberFormat('ko-KR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(rate * 100);
  };

  // 전일대비 비율 색상 표시 함수
  const changeRatePriceColor = (market: MarketInfo) => {
    const isPriceUp = tickers[market.market]?.signed_change_rate > 0;
    return isPriceUp ? 'text-red-600' : 'text-blue-600';
  };
  
  return (
    <div className="h-screen overflow-y-scroll">
      {markets.map((market) => (
        <div key={market.market} className="flex items-center py-3 border-b text-sm">
          <div className="flex-1 flex items-center px-2">
            <div className="flex flex-col">
              {/* 코인 이름 및 티커 표시 */}
              <div className="font-medium flex items-center">{market.korean_name}</div>
              <div className="text-gray-500 text-xs">{market.market}</div>
            </div>
          </div>
          {/* 현재가 표시 */}
          <div className="flex-1 text-right px-2">
            <div className={`text-right ${changeRatePriceColor(market)}`}>{currentAndChangePriceFormat(tickers[market.market]?.trade_price)}</div>
          </div>  
          {/* 전일대비 거래량(24H) */}
          <div className="flex-1 text-right px-2">
            <div className="flex flex-col">
              <div className={`text-right ${changeRatePriceColor(market)}`}>{changeRateFormat(tickers[market.market]?.signed_change_rate)}%</div>
              <div className={`text-right ${changeRatePriceColor(market)}`}>{currentAndChangePriceFormat(tickers[market.market]?.signed_change_price)}</div>
            </div>
          </div>
          {/* 거래 대금(24H) */}
          <div className="flex-1 text-right px-2">
            <div className="text-right">{price24hFormat(tickers[market.market]?.acc_trade_price_24h)}
              <span className="text-xs text-gray-500">백만</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
