'use client'

import HoldingsCoin from "@/components/HoldingsCoin";
import { useState } from "react";

// 보유자산
export default function AssetsPage() {

    const [clickTab, setClickTap] = useState("balance");

    const tab = [
        { id: "balance", label: "보유자산" },
        { id: "income", label: "투자손익" },
    ]
    return (
        <main>

            <div className="flex border-b mt-8">
                {tab.map((t) => (
                    <button
                    key={t.id}
                    className={`flex-1 py-3 font-bold border-b-2 transition-colors duration-200
                      ${clickTab === t.id 
                        ? "text-blue-500 border-blue-500 font-bold" 
                        : "text-gray-300 border-transparent hover:text-black hover:font-semibold"
                      }`}
                    onClick={() => setClickTap(t.id)}
                  >
                    {t.label}
                  </button>
                ))}
            </div>

            <div>
                {clickTab === 'balance' && (
                    <HoldingsCoin></HoldingsCoin>

                )}

                {clickTab === 'income' && (
                    <div></div>
                )}

            </div>
        </main>
    )
}