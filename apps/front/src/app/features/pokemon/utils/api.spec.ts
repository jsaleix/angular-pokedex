import {
  PokemonEvolutionChainResponse,
  PokemonEvolutionEntryType,
} from '../types/api';
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
            url: 'urlA',
          },
        },
      } satisfies PokemonEvolutionChainResponse;

      const species = [{ name: 'Bulbasaur', url: 'urlA' }];
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
                url: 'urlB',
              },
            },
          ],
          species: {
            name: 'Bulbasaur',
            url: 'urlA',
          },
        },
      } satisfies PokemonEvolutionChainResponse;

      const species = [
        { name: 'Bulbasaur', url: 'urlA' },
        { name: 'Ivysaur', url: 'urlB' },
      ];
      const result = extractSpeciesFromChainResult(data.chain);
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
                url: 'urlV',
              },
            },
            {
              evolution_details: [],
              is_baby: false,
              evolves_to: [],
              species: {
                name: 'Jolteon',
                url: 'urlJ',
              },
            },
            {
              evolution_details: [],
              is_baby: false,
              evolves_to: [],
              species: {
                name: 'Flareon',
                url: 'urlF',
              },
            },
          ],
          species: {
            name: 'Eevee',
            url: 'urlE',
          },
        },
      } satisfies PokemonEvolutionChainResponse;

      const branchedSpecies = [
        { name: 'Eevee', url: 'urlE' },
        { name: 'Vaporeon', url: 'urlV' },
        { name: 'Jolteon', url: 'urlJ' },
        { name: 'Flareon', url: 'urlF' },
      ];
      const branchedResult = extractSpeciesFromChainResult(branchedData.chain);
      expect(branchedResult.length).toBe(4);
      expect(branchedResult).toEqual(branchedSpecies);
    });
  });
});
