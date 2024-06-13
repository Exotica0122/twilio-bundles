import { type ClassValue, clsx } from "clsx";
import { countries } from "countries-list";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function snakeCaseToStartCase(string: string) {
  return string
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function kebabCaseToStartCase(string: string) {
  return string
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const countryCodes = Object.keys(countries);
export const countryMap = countryCodes
  .map((code) => ({
    code,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    name: countries[code].name as string,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

export const getCountryName = (isoCountry: string) => {
  return regionNames.of(isoCountry);
};
