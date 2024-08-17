export const sortCitiesByName = (cities: string[]) =>
  cities.sort((a, b) => a.localeCompare(b))
