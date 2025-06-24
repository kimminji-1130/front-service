import { create } from 'zustand';
import { useEffect, useState } from 'react';

import { useMarketStore } from './marketStore';



interface Asset {
    market_code: string;
    market_name: string;
    total_coin_price: number;
    total_coin_cnt: number; // 매수 수량
}

interface AssetState {
  assets: Asset[];
  holdings: number;

  getCurrentPrice: (market: string) => number;
  getTotalValuation: (assets: Asset[], holdings: number) => number[];
}

export const useAssetStore = create<AssetState>((set, get) => ({

    assets: [
        {
            market_code: 'KRW-BTC',
            market_name: '비트코인',
            total_coin_price: 409482,
            total_coin_cnt: 0.123,
        },
        {
            market_code: 'KRW-ETH',
            market_name: '이더리움',
            total_coin_price: 409482,
            total_coin_cnt: 0.123,
        },
        {
            market_code: 'KRW-USDT',
            market_name: '테더',
            total_coin_price: 409482,
            total_coin_cnt: 0.123,
        },
        
    ],
    holdings: 100000000,

    // 현재가 가져오기
    getCurrentPrice: (market: string) => {
        const { tickers, error } = useMarketStore();

        const price = tickers[market]?.trade_price;
        return price;
    },

    getTotalValuation: (assets: Asset[], holdings: number) => {
        const {getCurrentPrice} = get();
        const [ total_price, setTotal_price ] = useState(0);

        useEffect(() => {
            let total = assets.reduce((sum, asset) => sum + asset.total_coin_price, 0);
            setTotal_price(total);
        }, [assets]);

        let valuations = assets.map((asset) => getCurrentPrice(asset.market_code) * asset.total_coin_cnt);
        let total_valuations = valuations.reduce((sum, price) => sum + price, 0);

        let total_holding = total_valuations + holdings; // 총 보유자산
        let pl = total_valuations - total_price; // 평가손익
        let total_rateReturn = pl/total_price * 100; // 총 수익률
        

        let result = [total_price, total_valuations, total_holding, pl, total_rateReturn];

        return result;   
    },

}))