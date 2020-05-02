import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pokemon } from '../shared/pokemon';
import { PokemonListService } from '../shared/pokemon-list.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  public similarPkmns$: Observable<Pokemon[]>;
  public similarPokemonSpinner = false;
  public detailsSpinner = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public pokemon: Pokemon,
    public pokemonListService: PokemonListService
  ) {}

  ngOnInit(): void {
    this.similarPokemonSpinner = true;
    this.pokemonListService.detailsLoader$.subscribe(
      (res) => (this.detailsSpinner = res)
    );
    this.similarPkmns$ = this.pokemonListService.similarPokemons$.pipe(
      finalize(() => (this.similarPokemonSpinner = false))
    );
  }
}
