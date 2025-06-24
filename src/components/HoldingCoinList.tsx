'use client'

import { useAssetStore } from "@/store/assetStore";

// 보유자산 리스트
export default function HoldingCointList() {
    

    const {assets, holdings, getCurrentPrice, getTotalValuation} = useAssetStore();
    const head = ['코인', '마켓', '거래수량', '거래단가', '현재단가', '거래금액', '수익률']

    const result = getTotalValuation(assets, holdings);

    return (
        <div className="p-4">
           <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        {head.map((title) => (
                            <th key={title} className="border border-gray-300 px-4 py-2 ">
                                <p>{title}</p>
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {assets.map((asset, idx) => (
                        <tr key={asset.market_code} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{asset.market_name}</td>
                            <td className="border border-gray-300 px-4 py-2">{asset.market_code}</td>
                            <td className="border border-gray-300 px-4 py-2">{asset.total_coin_cnt}</td>
                            <td className="border border-gray-300 px-4 py-2">{(asset.total_coin_price/asset.total_coin_cnt).toLocaleString()} KRW</td>
                            <td className="border border-gray-300 px-4 py-2">{getCurrentPrice(asset.market_code).toLocaleString()} KRW</td>
                            <td className="border border-gray-300 px-4 py-2">{asset.total_coin_price.toLocaleString()} KRW</td>
                            <td className="border border-gray-300 px-4 py-2">{(((asset.total_coin_cnt * getCurrentPrice(asset.market_code))/asset.total_coin_price) * 100).toLocaleString()} %</td>
                        </tr>
                    ))}
                </tbody>
           </table>

        </div>
    )
}