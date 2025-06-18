"use client"

import Link from 'next/link'

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Crypto Trading Platform</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link 
          href="/orderbook" 
          className="p-6 border rounded-lg hover:bg-accent transition-colors"
        >
          <h2 className="text-2xl font-semibold mb-2">Order Book</h2>
          <p className="text-muted-foreground">View real-time order book data</p>
        </Link>
        <Link 
          href="/pricelist" 
          className="p-6 border rounded-lg hover:bg-accent transition-colors"
        >
          <h2 className="text-2xl font-semibold mb-2">Price List</h2>
          <p className="text-muted-foreground">View current cryptocurrency prices</p>
        </Link>
        <Link 
          href="/chart" 
          className="p-6 border rounded-lg hover:bg-accent transition-colors"
        >
          <h2 className="text-2xl font-semibold mb-2">Chart</h2>
          <p className="text-muted-foreground">View cryptocurrency price chart</p>
        </Link>
      </div>
    </main>
  )
}
