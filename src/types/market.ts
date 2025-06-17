export interface OrderbookUnit {
  ask_price: number; // 매도 가격
  bid_price: number; // 매수 가격
  ask_size: number; // 매도 수량
  bid_size: number; // 매수 수량
}

export interface OrderbookData {
  market: string; // 마켓 종류
  code: string; // 종목 코드
  orderbook_units: OrderbookUnit[]; // 주문 테이블
  timestamp: number; // 최근 체결 시각
  total_ask_size: number; // 총 매도 잔량
  total_bid_size: number; // 총 매수 잔량
  type: string;
}

export interface TickerData {
  type: string;
  code: string;
  trade_price: number;
  signed_change_price: number;
  signed_change_rate: number;
  acc_trade_volume_24h: number;
  acc_trade_price_24h: number;
  high_price: number;
  low_price: number;
  prev_closing_price: number;
  trade_volume: number;
  timestamp: number;
  acc_ask_volume: number;
  acc_bid_volume: number;
}

export interface TradeData {
  type: string;
  code: string;
  trade_price: number;
  trade_volume: number;
  ask_bid: 'ASK' | 'BID';
  trade_timestamp: number;
  timestamp: number;
}

export interface MarketState {
  tickers: Record<string, TickerData>;
  orderbooks: Record<string, OrderbookData>;
  selectedMarket: string;
  isLoading: boolean;
  error: string | null;
  currentPrice: number | null;
  ws: WebSocket | null;
  subscribedMarkets: Set<string>;
  tradeData: Record<string, TradeData[]>;
  connect: () => void;
  disconnect: () => void;
  setSelectedMarket: (market: string) => void;
} 