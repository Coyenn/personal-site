import { headers } from "next/headers";

export type Visit = {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
};

export const LEIPZIG: Visit = {
  city: "Leipzig",
  country: "DE",
  latitude: 51.3397,
  longitude: 12.3731,
};

function decodeHeader(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function displayCity(value: string) {
  const decoded = decodeHeader(value).trim();

  if (!decoded) {
    return LEIPZIG.city;
  }

  if (decoded !== decoded.toUpperCase() && decoded !== decoded.toLowerCase()) {
    return decoded;
  }

  return decoded
    .toLowerCase()
    .replace(
      /(^|[\s-])([a-z])/g,
      (_match, edge: string, letter: string) => edge + letter.toUpperCase(),
    );
}

export async function getRequestVisit(): Promise<Visit> {
  const requestHeaders = await headers();
  const latHeader = requestHeaders.get("x-vercel-ip-latitude");
  const lonHeader = requestHeaders.get("x-vercel-ip-longitude");

  if (!latHeader || !lonHeader) {
    return LEIPZIG;
  }

  const latitude = Number(latHeader);
  const longitude = Number(lonHeader);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return LEIPZIG;
  }

  const cityHeader = requestHeaders.get("x-vercel-ip-city");
  const country = requestHeaders.get("x-vercel-ip-country")?.toUpperCase() ?? LEIPZIG.country;

  return {
    city: cityHeader ? displayCity(cityHeader) : LEIPZIG.city,
    country,
    latitude,
    longitude,
  };
}

export function countryName(countryCode: string) {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(countryCode) ?? countryCode;
  } catch {
    return countryCode;
  }
}
