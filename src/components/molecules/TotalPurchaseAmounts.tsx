import React from 'react';
import { GetVideoResponse } from '@/api/videos';
import { TotalPurchaseAmount } from '@/types/models/video';

export type Props = {
  totalPurchaseAmounts: GetVideoResponse['totalPurchaseAmounts'];
};

const afterTheDecimalPoint = 2;

function formatPurchaseAmount({ currencyUnit, totalPurchaseAmount }: TotalPurchaseAmount): string {
  const localeString = totalPurchaseAmount.toLocaleString();

  if (currencyUnit === '¥') {
    return currencyUnit + localeString;
  }

  const dotIndex = localeString.lastIndexOf('.');

  if (dotIndex === -1) {
    return currencyUnit + localeString + '.' + '0'.repeat(afterTheDecimalPoint);
  }

  return (
    currencyUnit +
    localeString +
    '0'.repeat(afterTheDecimalPoint - (localeString.length - dotIndex) + 1)
  );
}

export const TotalPurchaseAmounts: React.FC<Props> = ({ totalPurchaseAmounts }) => {
  return (
    <>
      {totalPurchaseAmounts
        .sort((a, b) => b.totalPurchaseAmount - a.totalPurchaseAmount)
        .map((superChat, i) => (
          <div key={i} className="bg-white border rounded-full p-1 mr-1 my-1 text-sm float-left">
            <span>{formatPurchaseAmount(superChat)}</span>
          </div>
        ))}
    </>
  );
};
