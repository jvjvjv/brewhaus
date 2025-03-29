import type { ILocation, IBreweryQuery } from "@/types";

export const getApiQueryString = (queries: IBreweryQuery): string => {
  if (!queries) return "";
  if (!Object.values(queries).length) return "";
  const result: string[] = [];
  for (const k in queries) {
    const key = k as keyof IBreweryQuery;
    switch (key) {
      case "by_dist": {
        const v = queries[key] as ILocation;
        result.push(`${key}=${v.latitude},${v.longitude}`);
        break;
      }
      default: {
        const v = queries[key] as string;
        result.push(`${key}=${encodeURIComponent(v).toLowerCase()}`);
        break;
      }
    }
  }
  return `?${result.join("&")}`;
};
