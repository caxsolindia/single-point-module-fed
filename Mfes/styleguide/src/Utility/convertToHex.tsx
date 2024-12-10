export default function rgbaToHex(rgba: string): string {
  const match = rgba.match(
    /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/,
  );
  if (!match) return "rgba(0, 0, 0, 1)"; // Default to black if format is incorrect

  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);
  const a =
    match[4] !== undefined ? Math.round(parseFloat(match[4]) * 255) : 255;

  // eslint-disable-next-line no-bitwise
  const hex = `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  const alphaHex = a.toString(16).padStart(2, "0");

  return a === 255 ? hex : hex + alphaHex;
}
