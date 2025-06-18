import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import "./globals.css"
import Header from "../components/Header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Crypto Trading Platform",
  description: "Real-time cryptocurrency trading platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <div className="min-h-full">
          <nav className="bg-blue-900 text-white border-b border-blue-800 shadow">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                {/* 왼쪽: 로고 + 메뉴 */}
                <div className="flex items-center gap-6">
                  <Link href="/" className="text-xl font-bold hover:text-blue-300">
                    Crypto Trading
                  </Link>
                  <div className="flex gap-4">
                    <Link href="/orderbook" className="hover:text-blue-300">
                      Order Book
                    </Link>
                    <Link href="/pricelist" className="hover:text-blue-300">
                      Price List
                    </Link>
                    <Link href="/chart" className="hover:text-blue-300">
                      Chart
                    </Link>
                    <Link href="/exchange" className="hover:text-blue-300">
                      Exchange
                    </Link>
                  </div>
                </div>

                {/* 오른쪽: 로그인/회원가입 */}
                <div className="flex gap-4">
                  <Link href="/login" className="hover:text-blue-300">
                    Login
                  </Link>
                  <Link href="/signup" className="hover:text-blue-300">
                    Signup
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {children}
        </div>
      </body>
    </html>
  )
}
