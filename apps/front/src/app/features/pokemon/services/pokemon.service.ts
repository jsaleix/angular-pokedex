import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BasePokemonI, PokeAPIResponseI, PokemonInListI } from '../types/api';

interface GetPokemonsParamsI {
  limit?: number;
  skip?: number;
}
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private httpClient: HttpClient) {}

  getPokemons({ limit = 10, skip = 0 }: GetPokemonsParamsI) {
    const url = new URL(`/api/v2/pokemon?limit=${limit}`, environment.pokeAPI);
    return this.httpClient.get<PokeAPIResponseI<PokemonInListI>>(
      url.toString(),
    );
  }

  getPokemonById(id: number) {
    const url = new URL(`/api/v2/pokemon/${id}`, environment.pokeAPI);
    return this.httpClient.get<BasePokemonI>(url.toString());
  }
}
