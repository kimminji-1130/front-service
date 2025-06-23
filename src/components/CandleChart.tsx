'use client'

import React, { useEffect, useRef } from "react";
import dynamic from 'next/dynamic';

import { useCandleStore } from "@/store/candleStore";
import { useMarketStore } from "@/store/marketStore";


type TimeUnit = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';

// 동적 import로 ChartComponent 불러오기
const ChartComponent = dynamic(() => import("@/lib/chartUtils").then(mod => mod.default), {
  ssr: false,
});

export const CandleChart = () => {
  const { candles, error, selected_market, selected_time, timeUnit ,set_selectedTime,  set_selectedMarket, set_timeUnit, fetchAdditionCandles } = useCandleStore();
  const  { markets, initializeMarkets }  = useMarketStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);


  useEffect(() => {
    initializeMarkets();
  }, [initializeMarkets]);

  useEffect(() => {
    if(selected_market) {
      fetchAdditionCandles();
    }
  }, [selected_market, selected_time, fetchAdditionCandles]);

  const selectedMarket = (e: React.ChangeEvent<HTMLSelectElement>) => {
    set_selectedMarket(e.target.value);
  };

  const selectedTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.options[e.target.selectedIndex];
    const time = selected.value.split("_");

    set_selectedTime(time[0], Number(time[1]));
    
    // timeUnit을 TimeUnit 타입으로 캐스팅
    const timeUnitMap: Record<string, 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year'> = {
      'second': 'second',
      'minute': 'minute', 
      'hour': 'hour',
      'day': 'day',
      'week': 'week',
      'month': 'month',
      'quarter': 'quarter',
      'year': 'year'
    };
    
    const mappedTimeUnit = timeUnitMap[time[2]] || 'hour';
    set_timeUnit(mappedTimeUnit);

  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      
      <div className="flex tiems-center gap-4 p-4 bg-gray-100 border rounded-lg shadow-lg"> 
        <div className="relative">
          <select className="px-4 py-2 border rounded-md bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring focus:ring-blue-200" value={selected_market} onChange={selectedMarket}>
            {markets.map((market) => (
              <option key={market.market} value={market.market}>
                {market.korean_name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <select className="px-4 py-2 border rounded-md bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring focus:ring-blue-200" onChange={selectedTime} defaultValue={'minutes_30_hour'}>
            <option key={'minute_3'} value={'minutes_3_minute'}>3분</option>
            <option key={'minute_15'} value={'minutes_15_minute'}>15분</option>
            <option key={'minute_30'} value={'minutes_30_hour'}>30분</option>
          </select>
        </div>
      </div>
      
      <canvas ref={canvasRef} id="candle-chart" width={800} height={400}></canvas>

      <ChartComponent 
        market={selected_market} 
        candle={candles} 
        canvasRef={canvasRef} 
        timeUnit={timeUnit as 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year'}
      ></ChartComponent>
      
    </div>
  )
}



export default CandleChart;