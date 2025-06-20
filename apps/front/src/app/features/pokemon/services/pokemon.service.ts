import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import {
  PaginatedResponseI,
  PokemonAbilityResponse,
  PokemonI,
  PokemonInListI,
  PokemonSpeciesI,
} from '../types/api';

interface GetPokemonsParamsI {
  limit?: number;
  offset?: number;
}
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private httpClient: HttpClient) {}

  getPokemons({ limit = 10, offset = 0 }: GetPokemonsParamsI) {
    const url = new URL(
      `/api/v2/pokemon?limit=${limit}&offset=${offset}`,
      environment.pokeAPI,
    );
    return this.httpClient.get<PaginatedResponseI<PokemonInListI>>(
      url.toString(),
    );
  }

  getPokemonById(id: number) {
    const url = new URL(`/api/v2/pokemon/${id}`, environment.pokeAPI);
    return this.httpClient.get<PokemonI>(url.toString());
  }

  getPokemonSpeciesById(id: number) {
    const url = new URL(`/api/v2/pokemon-species/${id}`, environment.pokeAPI);
    return this.httpClient.get<PokemonSpeciesI>(url.toString());
  }

  getAbilityById(id: number) {
    const url = new URL(`/api/v2/ability/${id}`, environment.pokeAPI);
    return this.httpClient.get<PokemonAbilityResponse>(url.toString());
  }
}
