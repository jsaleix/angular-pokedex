import {
  PokemonEvolutionEntryType,
  PokemonSpeciesI,
  PokemonSpeciesInResponses,
} from '../types/api';
import { AppPokemonSpeciesI } from '../types/data';

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
): AppPokemonSpeciesI[] {
  const { name, url } = entry.species;
  const id = extractDexIdFromSpeciesUrl(url);
  if (!id) return [];

  const species = {
    id,
    name,
    url,
  };
  const speciesList: AppPokemonSpeciesI[] = [species];

  for (const evo of entry.evolves_to) {
    speciesList.push(...extractSpeciesFromChainResult(evo));
  }

  return speciesList;
}
