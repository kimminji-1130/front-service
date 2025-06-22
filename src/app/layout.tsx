import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import WebSocketProvider from "@/providers/WebSocketProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "코윙 - 코인 모의투자 서비스",
  description: "코윙을 사용하면 경제적 손실없이 리스크 관리 등 경제적 관념을 향상할 수 있습니다.",
  icons: {
    icon: "/cowing.png",
  },
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
                    <Link href="/exchange" className="hover:text-blue-300">
                      거래소
                    </Link>
                    <Link href="/pricelist" className="hover:text-blue-300">
                      투자내역
                    </Link>
                    <Link href="/" className="hover:text-blue-300">
                      보유자산
                    </Link>
                  </div>
                </div>

                {/* 오른쪽: 로그인/회원가입 */}
                <div className="flex gap-4">
                  <Link href="/login" className="hover:text-blue-300">
                    로그인
                  </Link>
                  <Link href="/signup" className="hover:text-blue-300">
                    회원가입
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {children}
          <footer className="bg-blue-50 text-gray-600 text-right py-4 border-t">
            <p className="text-sm mr-4">&copy; {new Date().getFullYear()} Crypto Trading Platform. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  )
}
