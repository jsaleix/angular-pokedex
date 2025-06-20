import {
  PokemonEvolutionEntryType,
  PokemonSpeciesInResponses,
} from '../types/api';

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

// Using recursive strategy since entries are nesting instead each other entry
export function extractSpeciesFromChainResult(
  entry: PokemonEvolutionEntryType,
): PokemonSpeciesInResponses[] {
  const current = entry.species;
  if (entry.evolves_to[0] === undefined) return [current];
  return [current, ...extractSpeciesFromChainResult(entry.evolves_to[0])];
}
