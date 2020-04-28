import { Component, OnInit } from '@angular/core';
import { Pokemon } from './shared/pokemon';
import { Observable } from 'rxjs';
import { PokemonListService } from './shared/pokemon-list.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  public pokemons$: Observable<Pokemon[]>;
  constructor(private pokemonListService: PokemonListService) {}

  ngOnInit(): void {
    this.pokemons$ = this.pokemonListService
      .getPokemons()
      .pipe(map((response) => response.cards));
  }
}
