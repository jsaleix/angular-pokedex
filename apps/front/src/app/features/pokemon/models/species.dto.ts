import { PokemonSpeciesI } from '../types/api';

export interface SpeciesDTO {
  id: number;
  name: string;
  names: Record<string, string>;
  flavor_text: string | null;
  is_legendary: boolean;
  is_mythical: boolean;
  is_baby: boolean;
}

export function mapSpeciesApiToDto(apiResponse: PokemonSpeciesI): SpeciesDTO {
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
    flavor_text:
      flavor_text_entries.find((f) => f.language.name === 'en')?.flavor_text ??
      null,
    is_baby,
    is_legendary,
    is_mythical,
    names: names.reduce(
      (acc, curr) => ({ ...acc, [curr.language.name]: curr.name }),
      {},
    ),
  };
}
