export const buildQueryParams = (params: Record<string, string | number | boolean | null | undefined>): string => {
  return Object.entries(params)
    .filter(([value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join("&");
};
