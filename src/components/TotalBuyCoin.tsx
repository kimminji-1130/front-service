'use client'

import { useAssetStore } from "@/store/assetStore"


// 보유 자산
export default function TotalBuyCoin() {

    const {assets, holdings, getTotalValuation} = useAssetStore();
   
    const result = getTotalValuation(assets, holdings);

    return (
        <div className="items-center justify-between space-y-3 p-6">

            <div className="grid grid-cols-2 flex items-start bg-gray-100 p-10">
                <div>

                    <div className="flex flex-col items-start space-y-2">
                        <div className="text-black text-lg font-medium">총 매수 코인</div>
                        <p className="text-4xl font-extrabold ml-4">{result[0].toLocaleString()}</p>
                    </div>

                    <div className="flex flex-row items-start space-x-4 mt-4">
                        <div className="text-black text-lg font-medium">
                            총 평가
                        </div>
                        <div className="font-bold text-lg">
                            {result[1].toLocaleString()}
                        </div>
                    </div>

                </div>

                <div>

                    <div className="flex flex-col items-start space-y-2">
                        <div className="text-black text-lg font-medium">총 보유 자산</div>
                        <p className="text-4xl font-extrabold ml-4">
                            {
                                result[2].toLocaleString()
                            }
                        </p>
                    </div>

                    <div className="flex flex-row items-start space-x-4 mt-4">
                        <div className="text-black text-lg font-medium">
                            평가 손익
                        </div>
                        <div className={`${result[3] < 0 ? "text-blue-500" : "text-red-500"} font-bold text-lg`}>
                            {
                                result[3].toLocaleString()
                            }
                        </div>
                    </div>
                    <div className="flex flex-row items-start space-x-4 mt-2">
                        <div className="text-black text-lg font-medium">
                            수익률
                        </div>
                        <div className={`${result[3] < 0 ? "text-blue-500" : "text-red-500"} font-bold text-lg`}>
                            {result[4].toLocaleString()} %
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}