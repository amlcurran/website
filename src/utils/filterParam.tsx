export function parseFilterQuery(location: Location | undefined): string {
    return location?.search.replace("%20", " ").replace("?filter=", "") ?? "";
}

/**
 * @deprecated use parseFilterQuery instead
 */
export function filterParam(): string {
    const location = typeof window !== `undefined` ? window.location : undefined
    return parseFilterQuery(location)
}