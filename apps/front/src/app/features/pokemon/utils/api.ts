export function extractIdFromAbilityUrl(url: string) {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? parseInt(match[1], 10) : undefined;
}

export function extractEvolutionChainIdFromUrl(url: string): number | null {
  const match = url.match(/\/evolution-chain\/(\d+)\/?$/);
  return match ? parseInt(match[1], 10) : null;
}

export function extractDexIdFromSpeciesUrl(url: string) {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? parseInt(match[1], 10) : undefined;
}
