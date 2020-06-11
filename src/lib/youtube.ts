export function improveImageQuality(url: string): string {
  return url.replace(/\/s\d+/, '/s128');
}

export function formatPurchaseAmount(
  currencyUnit: string,
  purchaseAmount: number,
  afterTheDecimalPoint: number = 2,
): string {
  const localeString = purchaseAmount.toLocaleString();

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
