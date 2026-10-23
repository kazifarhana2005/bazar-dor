'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function PriceTicker() {
  const [tickerList, setTickerList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTickerData() {
      try {
        // Sothik products endpoint use kora holo
        const response = await fetch('https://openapi.programming-hero.com/api/bazardor/products');
        const data = await response.json();
        
        let items = [];
        if (Array.isArray(data)) {
          items = data;
        } else if (data?.data && Array.isArray(data.data)) {
          items = data.data;
        } else if (data?.products && Array.isArray(data.products)) {
          items = data.products;
        } else if (data?.result && Array.isArray(data.result)) {
          items = data.result;
        } else if (data && typeof data === 'object') {
          const foundArray = Object.values(data).find(val => Array.isArray(val));
          items = foundArray || [];
        }

        setTickerList(items);
        setLoading(false);
      } catch (error) {
        console.error('Ticker API error:', error);
        setLoading(false);
      }
    }

    fetchTickerData();
  }, []);

  return (
    <div className="w-full bg-gray-50/80 py-2.5 border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 overflow-x-auto whitespace-nowrap scrollbar-none">
        <div className="inline-flex items-center gap-6 text-xs text-gray-700">
          {loading ? (
            <span className="text-gray-400 py-0.5">Bazar-er update load hocche...</span>
          ) : tickerList.length === 0 ? (
            <span className="text-gray-400 py-0.5">Kono update data pawa jayni</span>
          ) : (
            tickerList.map((item, index) => {
              const productName = item.name || item.title || item.productName || item.item_name || 'Product';
              const productPrice = item.price || item.current_price || item.rate || 0;
              const productUnit = item.unit || item.measurement || 'taka/kg';
              const productPercentage = item.percentage || item.change_percentage || item.diff || '';
              const productImage = item.image || item.img || item.icon;
              
              const isUp = item.changeType === 'up' || item.status === 'up' || item.trend === 'up' || Number(productPercentage) > 0;

              return (
                <div
                  key={item.id || index}
                  className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200/70 shadow-2xs"
                >
                  {/* Jodi API-te image ba icon thake tahole dekhabe */}
                  {productImage && (
                    <img src={productImage} alt={productName} className="w-4 h-4 object-contain" />
                  )}

                  <span className="font-medium text-gray-800">{productName}</span>
                  <span className="text-gray-600">
                    ৳{productPrice} {productUnit}
                  </span>

                  {productPercentage !== '' && (
                    <span
                      className={`inline-flex items-center gap-0.5 font-medium px-1.5 py-0.5 rounded text-[11px] ${
                        isUp
                          ? 'text-red-600 bg-red-50'
                          : 'text-emerald-600 bg-emerald-50'
                      }`}
                    >
                      {isUp ? (
                        <TrendingUp className="w-3 h-3 text-red-500" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-emerald-500" />
                      )}
                      {productPercentage}%
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}