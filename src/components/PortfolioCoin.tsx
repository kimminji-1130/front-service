
import React, { RefObject, useEffect } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

interface Asset {
    market_code: string;
    market_name: string;
    total_coin_price: number;
    total_coin_cnt: number; // 매수 수량
}

interface PortfolioCoinProps {
    uid: number;
    datas: Asset[];
    canvasRef: React.RefObject<HTMLCanvasElement>;
}

// 보유자산 차트
export default function PortfolioCoin({uid, datas, canvasRef}: PortfolioCoinProps) {

    useEffect(() => {

        const ctx = canvasRef.current?.getContext("2d");
        let percentages: number[] = [];

        const coinName = datas.map((data) => data.market_name);
        const coinData = datas.map((data) => data.total_coin_price);
        
        // 캔버스가 존재하지 않으면 종료
        if (!ctx) return;

        if (!datas || datas.length === 0) return;

        // 차트가 존재한다면 삭제
        const existChart = Chart.getChart(ctx)
        if(existChart) {
            existChart.destroy();
        }


        const chart = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: coinName,
                datasets: [{
                    data: coinData,
                    // 내부 데이터 표시
                    datalabels: {
                        align: 'center',
                        color: 'black',
                        font: {
                            weight: 'bold',
                            size: 30,
                        },

                        formatter: (value, context) => {
                            const total = (context.chart.data.datasets[0].data as number[])
                                .filter((v): v is number => typeof v === 'number')
                                .reduce((a, b) => a + b, 0);
                            const percentage = (value/total) * 100;
                            
                            percentages[context.dataIndex] = percentage;

                            return percentage.toFixed(1) + '%';
                        }
                    }
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            generateLabels: (chart) => {
                                const datasets = chart.data.datasets;
                                const backgroundColors = Array.isArray(datasets[0].backgroundColor)
                                    ? datasets[0].backgroundColor
                                    : [];

                                return datasets[0].data.map((value, idx) => {
                                    const label = chart.data.labels?.[idx] ?? '';
                                    const percentage = percentages[idx]?.toFixed?.(1) ?? '0.0';
                                    const fillStyle =
                                        typeof backgroundColors[idx] === 'string'
                                            ? backgroundColors[idx]
                                            : undefined;

                                    return {
                                        text: `${label}: ${percentage} %`,
                                        fillStyle: fillStyle,
                                        index: idx,
                                        strokeStyle: fillStyle
                                    };
                                });
                            }
                        }
                    }
                }
            },
            plugins: [ChartDataLabels],
        });
    }), [datas]
    return null;
}

