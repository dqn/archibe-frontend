export function improveImageQuality(url: string): string {
  return url.replace(/\/s\d+/, '/s128');
}
