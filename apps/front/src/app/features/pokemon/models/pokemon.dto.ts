import { PokemonI } from '../types/api';

export interface PokemonDTO {
  id: number;
  name: string;
  dimensions: {
    height: number; // expressed in decimeters, so *10 = cm
    weight: number; // expresses in hectograms, so /100 = kg
  };
  sprites: {
    front_default: string;
    back_default: string;
    artwork: string;
  };
  types: string[];
  speciesUrl: string;
  abilities: Array<{ name: string; url: string; isHidden: boolean }>;
  moves: Array<{
    name: string;
    url: string;
  }>;
}

export function mapPokemonApiToDto(apiResponse: PokemonI): PokemonDTO {
  const {
    id,
    name,
    weight,
    height,
    sprites,
    types,
    species,
    abilities,
    moves,
  } = apiResponse;

  return {
    id,
    name,
    dimensions: { weight, height },
    sprites: {
      front_default: sprites.front_default,
      back_default: sprites.back_default,
      artwork: sprites.other['official-artwork'].front_default,
    },
    types: types.map((t) => t.type.name),
    speciesUrl: species.url,
    abilities: abilities.map((a) => ({
      name: a.ability.name,
      url: a.ability.url,
      isHidden: a.is_hidden,
    })),
    moves: moves.map((m) => ({ name: m.move.name, url: m.move.url })),
  };
}
