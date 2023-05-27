export const getColorCodeFromName = name => {
  // Generate a deterministic hash code from the name
  let hashCode = 0;
  for (let i = 0; i < name.length; i++) {
    hashCode = (hashCode << 5) - hashCode + name.charCodeAt(i);
    hashCode = hashCode & hashCode;
  }

  // Generate RGB color components from the hash code
  const r = (hashCode & 0xff0000) >> 16;
  const g = (hashCode & 0x00ff00) >> 8;
  const b = hashCode & 0x0000ff;

  // Convert the RGB color to hexadecimal color code
  const hexColor = rgbToHex(r, g, b);

  return hexColor;
};
function rgbToHex(r, g, b) {
  const componentToHex = c => {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}
