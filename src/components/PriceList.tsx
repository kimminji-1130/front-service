import { useMarketStore } from '../store/marketStore';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ko-KR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

const getMarketName = (market: string) => {
  const marketMap: { [key: string]: string } = {
    'KRW-BTC': '비트코인',
    'KRW-ETH': '이더리움'
  };
  return marketMap[market] || market;
};

export const PriceList = () => {
  const { orderbooks, isLoading, error } = useMarketStore();

  const markets = ['KRW-BTC', 'KRW-ETH'];

  if (error) {
    return (
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '1rem',
        backgroundColor: '#fff1f0',
        borderRadius: '8px',
        color: '#ff4d4f',
        textAlign: 'center'
      }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '1rem',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{
        fontSize: '1.2rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#333'
      }}>
        실시간 시세
      </h2>
      
      <div style={{
        display: 'grid',
        gap: '0.5rem'
      }}>
        {markets.map((market) => {
          const orderbook = orderbooks[market];
          const orderbookUnits = orderbook?.orderbook_units || [];
          const price = orderbookUnits.length > 0
            ? (orderbookUnits[0].bid_price + orderbookUnits[0].ask_price) / 2
            : null;

          return (
            <div
              key={market}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                transition: 'background-color 0.2s'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  {getMarketName(market)}
                </span>
                <span style={{
                  fontSize: '0.9rem',
                  color: '#666'
                }}>
                  {market}
                </span>
              </div>
              
              <div style={{
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: '#1890ff'
              }}>
                {isLoading ? '로딩 중...' : price ? `${formatPrice(price)} 원` : '데이터 없음'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 