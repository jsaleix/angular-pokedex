export type PokeAPIResponseI<T> = {
  count: number;
  next: null | string;
  previous: null | string;
  results: T[];
};

export interface PokemonInListI {
  url: string;
  name: string;
}

export interface BasePokemonI {
  id: number;
  species: {
    name: string;
  };
  sprites: {
    front_default: string;
    back_default: string;
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
}

type Sprites = {
  front_default: string;
  back_default: string;
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
} & Record<string, unknown>;
export interface PokemonI {
  id: number;
  height: number;
  weight: number;
  name: string;
  sprites: Sprites;
  types: PokemonTypeI[];
}

export interface PokemonSpeciesI {
  evolution_chain: {
    url: string;
  } | null;
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
}

export interface PokemonTypeI {
  slot: number;
  type: {
    name: string;
  };
}
