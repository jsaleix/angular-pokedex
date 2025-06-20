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

// Using recursive strategy since entries are nested instead each other
export function extractSpeciesFromChainResult(
  entry: PokemonEvolutionEntryType,
): PokemonSpeciesInResponses[] {
  const speciesList: PokemonSpeciesInResponses[] = [entry.species];

  for (const evo of entry.evolves_to) {
    speciesList.push(...extractSpeciesFromChainResult(evo));
  }

  return speciesList;
}
