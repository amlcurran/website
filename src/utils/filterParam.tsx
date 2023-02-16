
export function filterParam(): string {
    const location = typeof window !== `undefined` ? window.location : null
    return location?.search.replace("%20", " ").replace("?filter=", "") ?? ""
}