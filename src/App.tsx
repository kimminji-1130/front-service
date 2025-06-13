import { PriceList } from './components/PriceList'
import { Orderbook } from './components/OrderBook'

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginTop: '2rem' }}>
        <Orderbook />
      </div>
      <div style={{ marginTop: '2rem' }}>
        <PriceList />
      </div>
    </div>
  )
}

export default App
