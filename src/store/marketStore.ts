import { create } from 'zustand';
import type { MarketState, OrderbookData } from '../types/market';

const MARKETS = ['KRW-BTC', 'KRW-ETH'];

export const useMarketStore = create<MarketState>((set) => {
  let ws: WebSocket | null = null;
  let reconnectTimeout: NodeJS.Timeout | null = null;

  const connect = () => {
    if (ws?.readyState === WebSocket.OPEN) return;

    ws = new WebSocket('wss://api.upbit.com/websocket/v1');

    ws.onopen = () => {
      console.log('WebSocket Connected');
      set({ error: null });

      // 모든 마켓에 대한 구독 요청
      const subscribeMessage = [
        { ticket: 'UNIQUE_TICKET' },
        {
          type: 'orderbook',
          codes: MARKETS,
          isOnlyRealtime: true
        }
      ];

      ws?.send(JSON.stringify(subscribeMessage));
    };

    ws.onmessage = (event) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string) as OrderbookData;
          const market = data.code;
          
          set((state) => {
            const orderbooks = { ...state.orderbooks };
            orderbooks[market] = data;

            // 현재가 계산
            const orderbookUnits = data.orderbook_units;
            const currentPrice = orderbookUnits.length > 0
              ? (orderbookUnits[0].bid_price + orderbookUnits[0].ask_price) / 2
              : null;

            return {
              orderbooks,
              currentPrice,
              isLoading: false,
              error: null
            };
          });
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
      reader.readAsText(event.data);
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
      set({ error: '연결 오류가 발생했습니다.' });
    };

    ws.onclose = () => {
      console.log('WebSocket Disconnected');
      set({ error: '연결이 끊어졌습니다.' });
      
      // 3초 후 재연결 시도
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
      reconnectTimeout = setTimeout(() => {
        console.log('Attempting to reconnect...');
        connect();
      }, 3000);
    };
  };

  const disconnect = () => {
    if (ws) {
      ws.close();
      ws = null;
    }
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
      reconnectTimeout = null;
    }
  };

  return {
    orderbooks: {},
    selectedMarket: 'KRW-BTC',
    isLoading: true,
    error: null,
    currentPrice: null,
    connect,
    disconnect,
    setSelectedMarket: (market: string) => set({ selectedMarket: market })
  };
}); 