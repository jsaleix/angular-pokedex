export type PaginatedResponseI<T> = {
  count: number;
  next: null | string;
  previous: null | string;
  results: T[];
};

export interface PokemonInListI {
  url: string;
  name: string;
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
  species: {
    name: string;
    url: string;
  };
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
  moves: Array<{
    move: {
      name: string;
      url: string;
    };
  }>;
}

export interface PokemonSpeciesI {
  id: number;
  name: string;
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
  is_baby: boolean;
  names: Array<{
    language: {
      name: string;
      url: string;
    };
    name: string;
  }>;
}

export interface PokemonTypeI {
  slot: number;
  type: {
    name: string;
  };
}
