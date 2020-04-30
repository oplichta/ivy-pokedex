import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Pokemon } from './shared/pokemon';
import { Observable } from 'rxjs';
import { PokemonListService } from './shared/pokemon-list.service';
import { map, take, startWith, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  public pokemons$: Observable<Pokemon[]>;
  public selectedPokemon: Pokemon;
  public showSpinner = false;
  public pokemonsList: Pokemon[];
  public loadedPage = 1;

  @Output() openDialog = new EventEmitter<string>();

  constructor(
    private pokemonListService: PokemonListService,
    public dialog: MatDialog
  ) {}

  notScrolly = true;
  ngOnInit(): void {
    this.loadPokemons(undefined, this.loadedPage);
  }

  loadPokemons(id?, page?, types?, supertype?, rarity?) {
    this.pokemons$ = this.pokemonListService.getPokemon(undefined, page).pipe(
      map((response) => {
        this.showSpinner = true;
        this.notScrolly = true;
        return response.cards;
      })
    );
  }

  public onOpenDialog(pokemonId: string) {
    this.pokemonListService
      .getPokemon(pokemonId)
      .pipe(
        take(1),
        map((response) => response.cards)
      )
      .subscribe((res) => {
        this.dialog.open(PokemonDetailsComponent, {
          height: '1200px',
          width: '800px',
          data: res[0],
        });

        this.selectedPokemon = res[0];
        this.pokemonListService.similarPokemons$ = this.pokemonListService
          .getPokemon(
            undefined,
            undefined,
            this.selectedPokemon.types,
            'Pokémon',
            this.selectedPokemon.rarity
          )
          .pipe(
            map((pokemonArray) =>
              pokemonArray.cards
                .filter(
                  (pokemon) =>
                    pokemon.hp >= this.selectedPokemon.hp * 0.9 &&
                    pokemon.hp <= this.selectedPokemon.hp * 1.1
                )
                .slice(1, 4)
            )
          );
      });
  }

  onScroll() {
    if (this.notScrolly) {
      this.showSpinner = true;
      this.notScrolly = false;
      this.loadedPage += 1;
      this.loadPokemons(undefined, this.loadedPage);
    }
  }
}
