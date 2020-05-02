import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pokemon } from './shared/pokemon';
import { Observable, Subject } from 'rxjs';
import { PokemonListService } from './shared/pokemon-list.service';
import { map, take, takeUntil, finalize } from 'rxjs/operators';
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
      .pipe(finalize(() => (this.showSpinner = false)))
      .subscribe((response) => {
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
      .subscribe(
        (res) => {
          this.pokemonListService.detailsLoader$.next(true);
          this.dialog.open(PokemonDetailsComponent, {
            height: '1200px',
            width: '1200px',
            data: res[0],
          });

          this.loadSimilarPokemons(res[0]);
        },
        (error) => error
      );
  }

  loadSimilarPokemons(selectedPokemon: Pokemon) {
    this.pokemonListService.similarPokemons$ = this.pokemonListService
      .getPokemon(
        undefined,
        undefined,
        selectedPokemon.types,
        'Pokémon',
        selectedPokemon.rarity
      )
      .pipe(
        map((pokemonArray) =>
          pokemonArray.cards
            .filter(
              (pokemon) =>
                pokemon.id !== selectedPokemon.id &&
                pokemon.hp >= selectedPokemon.hp * 0.9 &&
                pokemon.hp <= selectedPokemon.hp * 1.1
            )
            .slice(0, 3)
        ),
        finalize(() => this.pokemonListService.detailsLoader$.next(false))
      );
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
