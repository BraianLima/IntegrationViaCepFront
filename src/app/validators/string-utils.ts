//If string is Null or Empty of Undefined return true
export function isNullOrEmptyOrUndefined(value: string): boolean {
    return value === null || value === undefined || value.trim() === '';
} 