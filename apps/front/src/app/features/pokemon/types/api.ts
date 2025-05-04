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

export interface PokemonTypeI {
  slot: number;
  type: {
    name: string;
  };
}
