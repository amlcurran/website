export function getWindow(): Window | undefined {
  return typeof window !== `undefined` ? window : undefined
}
