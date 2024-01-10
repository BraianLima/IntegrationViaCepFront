export function isNullOrEmpty(value: string): boolean {
    return value === null || value === undefined || value.trim() === '';
}
  