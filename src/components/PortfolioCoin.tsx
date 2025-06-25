
import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

interface Data {
    label: string;
    data: number;
}

interface PortfolioCoinProps {
    uid: number;
    datas: Data[];
    canvasRef: React.RefObject<HTMLCanvasElement>;
}

// 보유자산 차트
export default function PortfolioCoin({uid, datas, canvasRef}: PortfolioCoinProps) {

    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if(!canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
        if (!datas  || datas.length === 0) return;

        const threshold = 0.3; // 5% 미만의 데이터는 기타 처리
        const mainCoins = datas.filter((data) => data.data > threshold);
        const etcCoins = datas.filter((data) => data.data <= threshold);

        let etc = 0;
        if(etcCoins.length > 0) {
            etc = etcCoins.reduce((sum, data) => sum + data.data, 0);
        }
        
        const chartData = etc > 0 
        ? [...mainCoins, { label: "기타", data: etc }]
        : mainCoins;
        
        const coinName = chartData.map((data) => data.label);
        const coinData = chartData.map((data) => data.data); 

        if(!chartRef.current) {
            chartRef.current = new Chart(ctx, {
                type: "doughnut",
                data: {
                    labels: coinName,
                    datasets: [{
                        data: coinData,
                        backgroundColor: [
                            "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
                            "#FF9F40", "#C9CBCF", "#F67019", "#F53794", "#537BC4",
                            "#ACC236", "#166A8F", "#00A950", "#58595B", "#8549BA"
                        ],
                        // 내부 데이터 표시
                        datalabels: {
                            align: 'center',
                            color: 'white',
                            font: {
                                weight: 'bold',
                                size: 10,
                            },
                            formatter: (value, context) => {
                                if (value < threshold) return null;
                                return `${value.toFixed(3)} %`;
                            }
                        }
                    }]
                },
                options: {
                    animation: false,
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
                                        const percentage = chart.data.datasets[0].data[idx];
                                        const fillStyle = typeof backgroundColors[idx] === 'string' 
                                            ? backgroundColors[idx]
                                            : undefined;
                                        
                                        return {
                                            text: typeof percentage === "number"
                                                ? `${label}: ${percentage.toFixed(3)} %`
                                                : `${label}: ${percentage} %`,
                                            fillStyle: fillStyle,
                                            index: idx,
                                            strokeStyle: fillStyle
                                        }
                                    })
                                }
                            }
                        }
                    }
                },
                plugins: [ChartDataLabels],
            });
        } else {
            chartRef.current.data.labels = coinName;
            chartRef.current.data.datasets[0].data = coinData;
            chartRef.current.update();
        }

    }, [datas, canvasRef.current]);

    useEffect(() => {
        return () => {
            chartRef.current?.destroy();
            chartRef.current = null;
        }
    }, [canvasRef.current]);    
    return null;
}

