import { PokemonI } from '../types/api';

export interface PokemonDTO {
  id: number;
  name: string;
  dimensions: {
    height: number;
    weight: number;
  };
  sprites: {
    front_default: string;
    back_default: string;
    artwork: string;
  };
  types: string[];
  speciesUrl: string;
}

export function mapPokemonIToDto(apiResponse: PokemonI): PokemonDTO {
  const { id, name, weight, height, sprites, types, species } = apiResponse;

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
  };
}
