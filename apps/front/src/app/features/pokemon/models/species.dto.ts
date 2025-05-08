import { PokemonSpeciesI } from '../types/api';

export interface SpeciesDTO {
  id: number;
  name: string;
  names: Record<string, string>;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: { name: string; url: string };
    version: {
      name: string;
      url: string;
    };
  }>;
  is_legendary: boolean;
  is_mythical: boolean;
  is_baby: boolean;
}

export function mapPokemonIToDto(apiResponse: PokemonSpeciesI): SpeciesDTO {
  const {
    id,
    name,
    is_legendary,
    is_mythical,
    is_baby,
    names,
    flavor_text_entries,
  } = apiResponse;

  return {
    id,
    name,
    flavor_text_entries,
    is_baby,
    is_legendary,
    is_mythical,
    names: names.reduce(
      (acc, curr) => ({ ...acc, [curr.language.name]: curr.name }),
      {},
    ),
  };
}
