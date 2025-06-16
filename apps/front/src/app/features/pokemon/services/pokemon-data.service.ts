import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { PokemonData } from '../types/data';

@Injectable({
  providedIn: 'root',
})
export class PokemonDataService {
  private readonly _pokemons = signal<PokemonData[]>([]);

  constructor(private http: HttpClient) {
    this.load();
  }

  private load() {
    this.http
      .get<PokemonData[]>('/assets/data/pokedex.json')
      .subscribe((data) => this._pokemons.set(data));
  }

  searchByName(query: string, lang: string) {
    const lower = query.trim().toLowerCase();
    if (!lower) return [];
    return this._pokemons().filter((p) => {
      return p.name[lang].toLowerCase().includes(lower);
    });
  }
  getById(id: number) {
    if (id < -1) return null;
    const pkm = this._pokemons().find((pkm) => pkm.id === id);
    return pkm ?? null;
  }
}
