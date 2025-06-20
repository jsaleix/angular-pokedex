import { PokemonAbilityResponse } from '../types/api';

export interface PokemonAbility {
  id: number;
  name: string;
  description: string;
  gameFrom: string;
}

export function mapAbilityFromApi(apiResponse: PokemonAbilityResponse) {
  const { id, name, flavor_text_entries } = apiResponse;
  const flavorEntry = flavor_text_entries.find(
    (entry) => entry.language.name === 'en',
  )!;
  const { flavor_text, version_group } = flavorEntry;
  return {
    id,
    name,
    description: flavor_text,
    gameFrom: version_group.name,
  } satisfies PokemonAbility;
}
