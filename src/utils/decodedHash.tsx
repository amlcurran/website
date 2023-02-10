
export function selectedTag(): string {
    const location = typeof window !== `undefined` ? window.location : null
    return location?.hash.replace("%20", " ").replace("#", "") ?? ""
}