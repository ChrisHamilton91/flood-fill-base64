/** Generates random hex string from "#000000" to "#ffffff" */
export default function randomColor(): string {
  return (
    "#" +
    Math.floor(Math.random() * 0x1000000)
      .toString(16)
      .padStart(6, "0")
  );
}
