import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pokemon } from './shared/pokemon';
import { Observable, Subject } from 'rxjs';
import { PokemonListService } from './shared/pokemon-list.service';
import { map, take, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit, OnDestroy {
  public pokemons$: Observable<Pokemon[]>;
  public selectedPokemon: Pokemon;
  public showSpinner = false;
  public pokemonsList = new Array<Pokemon>();
  public loadedPage = 1;
  public destroy = new Subject<any>();
  public notScrolly = true;

  constructor(
    private pokemonListService: PokemonListService,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.showSpinner = true;
    this.loadPokemons(undefined, this.loadedPage);
    this.openDialogFromUrl();
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  openDialogFromUrl() {
    this.route.params.pipe(takeUntil(this.destroy)).subscribe((params) => {
      if (params.id !== undefined) {
        this.dialog.closeAll();
        this.onOpenDialog(params.id);
      }
    });
  }

  loadPokemons(id?, page?, types?, supertype?, rarity?) {
    this.pokemonListService
      .getPokemon(undefined, page)
      .subscribe((response) => {
        this.showSpinner = true;
        this.notScrolly = true;
        this.pokemonsList = this.pokemonsList.concat(response.cards);
      });
  }

  onOpenDialog(pokemonId: string) {
    this.router.navigate(['/details', pokemonId]);
    this.pokemonListService
      .getPokemon(pokemonId)
      .pipe(
        take(1),
        map((response) => response.cards)
      )
      .subscribe((res) => {
        this.dialog.open(PokemonDetailsComponent, {
          height: '1200px',
          width: '1200px',
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
                    pokemon.id !== this.selectedPokemon.id &&
                    pokemon.hp >= this.selectedPokemon.hp * 0.9 &&
                    pokemon.hp <= this.selectedPokemon.hp * 1.1
                )
                .slice(0, 3)
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
