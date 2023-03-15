/** Converts hex string (#ffffff) to number (16777215)  */
export default function hexStringToNumber(color: string): number {
  return parseInt(color.slice(1), 16);
}
