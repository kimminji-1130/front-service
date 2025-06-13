import { useEffect } from 'react';
import { useMarketStore } from '../store/marketStore';
import type { OrderbookUnit } from '../types/market';

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('ko-KR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(num);
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ko-KR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

const OrderbookRow = ({ unit, isAsk }: { unit: OrderbookUnit; isAsk: boolean }) => {
  const price = isAsk ? unit.ask_price : unit.bid_price;
  const size = isAsk ? unit.ask_size : unit.bid_size;
  
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      padding: '8px',
      backgroundColor: isAsk ? '#fff1f0' : '#f6ffed',
      borderBottom: '1px solid #eee',
      fontSize: '0.9rem'
    }}>
      <span style={{ 
        color: isAsk ? '#ff4d4f' : '#52c41a',
        fontWeight: 'bold'
      }}>
        {formatPrice(price)}
      </span>
      <span style={{ 
        textAlign: 'right',
        color: '#666'
      }}>
        {formatNumber(size)}
      </span>
    </div>
  );
};

export const Orderbook = () => {
  const { 
    orderbooks, 
    selectedMarket, 
    isLoading, 
    error,
    currentPrice,
    connect,
    disconnect,
    setSelectedMarket 
  } = useMarketStore();

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  const orderbook = orderbooks[selectedMarket];
  const orderbookUnits = orderbook?.orderbook_units || [];

  if (isLoading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '2rem',
        color: '#666'
      }}>
        호가 데이터를 불러오는 중...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '2rem',
        color: '#ff4d4f',
        backgroundColor: '#fff1f0',
        borderRadius: '8px',
        margin: '1rem 0'
      }}>
        <p>연결 오류가 발생했습니다.</p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{error}</p>
        <button 
          onClick={connect}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#ff4d4f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          재연결 시도
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <select 
          value={selectedMarket}
          onChange={(e) => setSelectedMarket(e.target.value)}
          style={{ 
            padding: '0.5rem',
            width: '200px',
            borderRadius: '4px',
            border: '1px solid #d9d9d9'
          }}
        >
          <option value="KRW-BTC">비트코인 (BTC)</option>
          <option value="KRW-ETH">이더리움 (ETH)</option>
        </select>
      </div>

      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        backgroundColor: '#f5f5f5',
        padding: '1rem',
        borderRadius: '8px'
      }}>
        <div>
          <h3 style={{ 
            color: '#ff4d4f', 
            marginBottom: '0.5rem',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}>
            매도 호가
          </h3>
          <div style={{ 
            display: 'flex',
            flexDirection: 'column-reverse',
            gap: '1px',
            backgroundColor: 'white',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            {orderbookUnits.map((unit, index) => (
              <OrderbookRow key={`ask-${index}`} unit={unit} isAsk={true} />
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ 
            color: '#52c41a', 
            marginBottom: '0.5rem',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}>
            매수 호가
          </h3>
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '1px',
            backgroundColor: 'white',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            {orderbookUnits.map((unit, index) => (
              <OrderbookRow key={`bid-${index}`} unit={unit} isAsk={false} />
            ))}
          </div>
        </div>
      </div>

      {orderbook && (
        <div style={{ 
          marginTop: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          color: '#666',
          fontSize: '0.9rem',
          padding: '0.5rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px'
        }}>
          <span>총 매도 잔량: {formatNumber(orderbook.total_ask_size)}</span>
          <span>총 매수 잔량: {formatNumber(orderbook.total_bid_size)}</span>
        </div>
      )}
    </div>
  );
}; 