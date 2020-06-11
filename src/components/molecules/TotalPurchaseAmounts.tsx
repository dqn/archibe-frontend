import React from 'react';
import { GetVideoResponse } from '@/api/videos';
import { formatPurchaseAmount } from '@/lib/youtube';

export type Props = {
  totalPurchaseAmounts: GetVideoResponse['totalPurchaseAmounts'];
};

export const TotalPurchaseAmounts: React.FC<Props> = ({ totalPurchaseAmounts }) => {
  return (
    <>
      {totalPurchaseAmounts
        .sort((a, b) => b.totalPurchaseAmount - a.totalPurchaseAmount)
        .map((superChat, i) => (
          <div key={i} className="bg-white border rounded-full p-1 mr-1 my-1 text-sm float-left">
            <span>
              {formatPurchaseAmount(superChat.currencyUnit, superChat.totalPurchaseAmount)}
            </span>
          </div>
        ))}
    </>
  );
};
