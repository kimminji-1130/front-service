import { create } from 'zustand';
import { MarketState, TickerData } from '@/types/market';

const UPBIT_WS_URL = 'wss://api.upbit.com/websocket/v1';
const MARKETS = ['KRW-BTC', 'KRW-ETH', 'KRW-XRP'];

export const useMarketStore = create<MarketState>((set, get) => ({
  tickers: {},
  orderbooks: {},
  selectedMarket: 'KRW-BTC',
  isLoading: false,
  error: null,
  currentPrice: null,
  ws: null,
  subscribedMarkets: new Set(),

  connect: () => {
    const { ws, subscribedMarkets } = get();
    if (ws) return;

    set({ isLoading: true, error: null });
    const websocket = new WebSocket(UPBIT_WS_URL);

    websocket.onopen = () => {
      set({ ws: websocket, isLoading: false });
      
      const subscribeMessage = [
        { ticket: 'UNIQUE_TICKET' },
        ...MARKETS.map(market => ({
          type: 'ticker',
          codes: [market],
          isOnlyRealtime: true
        }))
      ];
      
      websocket.send(JSON.stringify(subscribeMessage));
      MARKETS.forEach(market => subscribedMarkets.add(market));
    };

    websocket.onmessage = (event) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string);

          if (data.type === 'ticker') {
            const marketCode = data.code;
            
            set(state => {
              const newTickers = {
                ...state.tickers,
                [marketCode]: data
              };
              
              const currentPrice = marketCode === state.selectedMarket ? data.trade_price : state.currentPrice;
              
              return {
                tickers: newTickers,
                currentPrice
              };
            });
          } else if (data.type === 'orderbook') {
            set(state => ({
              orderbooks: {
                ...state.orderbooks,
                [data.code]: data
              }
            }));
          }
        } catch (error) {
          console.error('Error processing message:', error);
        }
      };
      reader.readAsText(event.data);
    };

    websocket.onerror = (error) => {
      set({ error: 'WebSocket 연결 오류가 발생했습니다.' });
    };

    websocket.onclose = () => {
      set({ ws: null, isLoading: false });
    };
  },

  disconnect: () => {
    const { ws } = get();
    if (ws) {
      ws.close();
      set({ ws: null, subscribedMarkets: new Set() });
    }
  },

  setSelectedMarket: (market: string) => {
    const { ws, subscribedMarkets, tickers } = get();
    if (!ws) return;

    if (subscribedMarkets.size > 0) {
      const unsubscribeMessage = [
        { ticket: 'UNIQUE_TICKET' },
        ...Array.from(subscribedMarkets).map(market => ({
          type: 'ticker',
          codes: [market],
          isOnlyRealtime: true
        }))
      ];
      ws.send(JSON.stringify(unsubscribeMessage));
      subscribedMarkets.clear();
    }

    const subscribeMessage = [
      { ticket: 'UNIQUE_TICKET' },
      {
        type: 'ticker',
        codes: [market],
        isOnlyRealtime: true
      }
    ];
    ws.send(JSON.stringify(subscribeMessage));
    subscribedMarkets.add(market);

    const currentPrice = tickers[market]?.trade_price || null;
    set({ selectedMarket: market, currentPrice });
  }
})); 