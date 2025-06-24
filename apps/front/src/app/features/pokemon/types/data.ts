export type PokemonSearchResult = PokemonData;

export type PokemonData = {
  id: number;
  name: Record<string, string>;
};

export type AppPokemonSpeciesI = {
  name: string;
  id: number;
  url?: string;
};
