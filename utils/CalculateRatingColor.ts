
function clamp(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

export function CalculateRatingColor(ratingInput: number): string {
  if (ratingInput <= 0) return `rgb(136,136,136)`;

  const rating = Math.max(0.1, Math.min(10.0, ratingInput));

  const startColor = { r: 255, g: 80, b: 38 };
  const midColor = { r: 255, g: 233, b: 37 };
  const endColor = { r: 0, g: 240, b: 255 };

  let r: number, g: number, b: number;

  if (rating <= 5.0) {
    const stepsUntil5 = Math.floor((rating - 0.1) / 0.1);
    g = startColor.g + stepsUntil5 * 3;
    r = startColor.r;
    b = startColor.b;
    if (rating > 2.5) {
      b = b - 1;
    }
  } else {
    const t = (rating - 5.0) / 5.0;
    // R: 255 -> 0
    r = midColor.r + t * (endColor.r - midColor.r); // 255 + t * (0 - 255)

    // G: 227 -> 240
    g = midColor.g + t * (endColor.g - midColor.g); // 227 + t * (240 - 227)

    // B: 37 -> 255
    b = midColor.b + t * (endColor.b - midColor.b); // 37 + t * (255 - 37)
  }

  const rr = clamp(r);
  const gg = clamp(g);
  const bb = clamp(b);

  return `rgb(${rr}, ${gg}, ${bb})`;
};