/** Generates random number between 0x000000 and 0xffffff */
export default function randomColor(): number {
  return Math.floor(Math.random() * 0x1000000);
}
