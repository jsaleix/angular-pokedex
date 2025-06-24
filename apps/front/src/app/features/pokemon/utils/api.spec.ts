import {
  PokemonEvolutionChainResponse,
  PokemonEvolutionEntryType,
} from '../types/api';
import { AppPokemonSpeciesI } from '../types/data';
import { extractSpeciesFromChainResult } from './api';

describe('Utils API', () => {
  describe('extractSpeciesFromChainResult()', () => {
    it('Should return an array of one element', () => {
      const data = {
        id: 1,
        baby_trigger_item: null,
        chain: {
          evolution_details: [],
          is_baby: false,
          evolves_to: [],
          species: {
            name: 'Bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon-species/1',
          },
        },
      } satisfies PokemonEvolutionChainResponse;

      const species = [
        {
          name: 'Bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon-species/1',
          id: 1,
        },
      ] as AppPokemonSpeciesI[];

      const result = extractSpeciesFromChainResult(data.chain);
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Bulbasaur');
      expect(result).toEqual(species);
    });

    it('Should return an array of two elements', () => {
      const data = {
        id: 1,
        baby_trigger_item: null,
        chain: {
          evolution_details: [],
          is_baby: false,
          evolves_to: [
            {
              evolution_details: [],
              is_baby: false,
              evolves_to: [],
              species: {
                name: 'Ivysaur',
                url: 'https://pokeapi.co/api/v2/pokemon-species/2',
              },
            },
          ],
          species: {
            name: 'Bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon-species/1',
          },
        },
      } satisfies PokemonEvolutionChainResponse;

      const species = [
        {
          id: 1,
          name: 'Bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon-species/1',
        },
        {
          id: 2,
          name: 'Ivysaur',
          url: 'https://pokeapi.co/api/v2/pokemon-species/2',
        },
      ] as AppPokemonSpeciesI[];

      const result = extractSpeciesFromChainResult(data.chain);
      console.log(result);
      expect(result.length).toBe(2);
      expect(result).toEqual(species);
    });

    it('Should handle non-linear evolution chain', () => {
      const branchedData = {
        id: 2,
        baby_trigger_item: null,
        chain: {
          evolution_details: [],
          is_baby: false,
          evolves_to: [
            {
              evolution_details: [],
              is_baby: false,
              evolves_to: [],
              species: {
                name: 'Vaporeon',
                url: 'https://pokeapi.co/api/v2/pokemon-species/134',
              },
            },
            {
              evolution_details: [],
              is_baby: false,
              evolves_to: [],
              species: {
                name: 'Jolteon',
                url: 'https://pokeapi.co/api/v2/pokemon-species/135',
              },
            },
            {
              evolution_details: [],
              is_baby: false,
              evolves_to: [],
              species: {
                name: 'Flareon',
                url: 'https://pokeapi.co/api/v2/pokemon-species/136',
              },
            },
          ],
          species: {
            name: 'Eevee',
            url: 'https://pokeapi.co/api/v2/pokemon-species/133',
          },
        },
      } satisfies PokemonEvolutionChainResponse;

      const branchedSpecies = [
        {
          id: 133,
          name: 'Eevee',
          url: 'https://pokeapi.co/api/v2/pokemon-species/133',
        },
        {
          id: 134,
          name: 'Vaporeon',
          url: 'https://pokeapi.co/api/v2/pokemon-species/134',
        },
        {
          id: 135,
          name: 'Jolteon',
          url: 'https://pokeapi.co/api/v2/pokemon-species/135',
        },
        {
          id: 136,
          name: 'Flareon',
          url: 'https://pokeapi.co/api/v2/pokemon-species/136',
        },
      ] as AppPokemonSpeciesI[];

      const branchedResult = extractSpeciesFromChainResult(branchedData.chain);
      expect(branchedResult.length).toBe(4);
      expect(branchedResult).toEqual(branchedSpecies);
    });
  });
});
