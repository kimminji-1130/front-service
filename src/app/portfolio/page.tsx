'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import MarketSortBar from '@/components/MarketSortBar';
import MarketTabs from '@/components/MarketTabs';
import MarketList from '@/components/MarketList';

export default function PortfolioPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('보유자산');

  const tabs = ['보유자산', '투자손익'];

  // 페이지 진입 시 기본 탭인 '보유자산' 경로로 이동
  useEffect(() => {
    router.replace('/portfolio/holdings');
  }, [router]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === '투자손익') {
      router.push('/portfolio/earnings');
    } else {
      router.push('/portfolio/holdings');
    }
  };

  return (
    <main className="grid grid-cols-3 gap-2 min-h-screen p-4 md:p-8 bg-gray-50">
      {/* 왼쪽 섹션: 2/3 폭 */}
      <div className="col-span-2 flex flex-col gap-2">
        <div className="border rounded-md overflow-hidden bg-white">
          <div className="w-full max-w-6xl mx-auto p-4 bg-white">
            {/* 탭 네비게이션 */}
            <div className="flex border-b border-gray-200 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'text-blue-600 border-blue-600'
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  }`}
                  aria-selected={activeTab === tab}
                  role="tab"
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽 섹션: 1/3 폭 */}
      <div className="relative col-span-1">
        <div className="sticky top-4 flex h-[calc(100vh-2rem)] flex-col gap-2">
          {/* 고정 영역 */}
          <div className="flex-shrink-0">
            <SearchBar />
            <div className="mt-2 rounded-t-md border-x border-t bg-white">
              <MarketTabs />
              <MarketSortBar />
            </div>
          </div>

          {/* 스크롤 영역 */}
          <div className="flex-1 rounded-b-md border-x border-b bg-white overflow-y-auto">
            <MarketList />
          </div>
        </div>
      </div>
    </main>
  );
}
