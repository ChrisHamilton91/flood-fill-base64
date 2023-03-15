/** Converts number (16777215) to hex string (#ffffff)  */
export default function numberToHexString(color: number): string {
  return "#" + color.toString(16);
}
