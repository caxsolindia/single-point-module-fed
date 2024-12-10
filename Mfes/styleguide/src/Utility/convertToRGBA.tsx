export default function convertToRGBA(color: string): string {
  const hexToRgb = (hex: string) => parseInt(hex.repeat(2 / hex.length), 16);

  const handleHexColor = (hexColor: string): string => {
    let r = 0;
    let g = 0;
    let b = 0;
    let a = 1;
    if (
      hexColor.length === 4 ||
      hexColor.length === 7 ||
      hexColor.length === 9
    ) {
      r = hexToRgb(hexColor.slice(1, 2));
      g = hexToRgb(hexColor.slice(2, 3));
      b = hexToRgb(hexColor.slice(3, 4));
      if (hexColor.length > 4) {
        r = hexToRgb(hexColor.slice(1, 3));
        g = hexToRgb(hexColor.slice(3, 5));
        b = hexToRgb(hexColor.slice(5, 7));
      }
      if (hexColor.length === 9) {
        a = hexToRgb(hexColor.slice(7, 9)) / 255;
      }
    }
    return `rgba(${r}, ${g}, ${b}, ${a.toFixed(1)})`;
  };

  const handleRgbColor = (rgbColor: string): string => {
    const match =
      /rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(?:,\s*((?:\d*\.)?\d+))?\)/.exec(
        rgbColor,
      );
    if (match) {
      const [r, g, b, a] = [match[1], match[2], match[3], match[4]];
      return `rgba(${r}, ${g}, ${b}, ${a !== undefined ? parseFloat(a).toFixed(1) : "1.0"})`;
    }
    return rgbColor;
  };

  if (color.startsWith("#")) {
    return handleHexColor(color);
  }
  if (color.startsWith("rgb")) {
    return handleRgbColor(color);
  }

  return color;
}
