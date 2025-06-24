'use client'
import { useRef } from "react";
import TotalBuyCoin from "./TotalBuyCoin";
import { useAssetStore } from "@/store/assetStore";

import PortfolioCoin from "./PortfolioCoin";
import HoldingCointList from "./HoldingCoinList";

export default function HoldingsCoin() {

    const { assets , holdings } = useAssetStore();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    return (
        <div>

            {/* 보유 자산 */}
            <TotalBuyCoin></TotalBuyCoin>

            <br></br>
            <p>보유 코인 포트폴리오</p>

            {/* 보유 코인 도넛 차트 */}
            <canvas ref={canvasRef} id="total-doughnut" width={400} height={400}></canvas>
            <PortfolioCoin
                uid={1}
                datas={assets}
                canvasRef={canvasRef}
            ></PortfolioCoin>

            {/* 보유 코인 리스트 */}
            <HoldingCointList></HoldingCointList>
            
        </div>
    )
}