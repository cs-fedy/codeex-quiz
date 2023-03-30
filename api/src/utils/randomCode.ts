export default function generateRandomCode(length: number) {
  const code = new Array(length)
    .fill(0)
    .map((_: number) => Math.floor(Math.random() * 10).toString())
    .join('')
  return Number.parseInt(code)
}
