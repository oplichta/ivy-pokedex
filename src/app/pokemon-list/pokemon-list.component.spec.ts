import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { from } from 'rxjs';
import { DebugElement } from '@angular/core';

class RouterStub {
  navigate(params) {}
}

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        OverlayModule,
        MatDialogModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        InfiniteScrollModule,
      ],
      declarations: [PokemonListComponent],
      providers: [
        MatDialog,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: Router, useClass: RouterStub },
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{ id: 1 }]),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect the user to /details/:id page after pokemon selection', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.onOpenDialog('x1');
    expect(spy).toHaveBeenCalledWith(['/details', 'x1']);
  });

  it('should not render pokemon component when no pokemon data', () => {
    component.pokemonsList = [];
    fixture.detectChanges();
    const pokemonslistDE: DebugElement = fixture.debugElement;
    const pokemonslistElement: HTMLElement = pokemonslistDE.nativeElement;
    const p = pokemonslistElement.querySelector('app-pokemon');
    expect(p).toBeNull();
  });

  it('should render spinner component when no pokemon data', () => {
    component.pokemonsList = [];
    fixture.detectChanges();
    const pokemonslistDE: DebugElement = fixture.debugElement;
    const pokemonslistElement: HTMLElement = pokemonslistDE.nativeElement;
    const p = pokemonslistElement.querySelector('mat-spinner');
    expect(p).not.toBeNull();
  });

  it('should render pokemon component when there is pokemon data', () => {
    component.pokemonsList = [
      {
        id: 'id',
        name: 'name',
        supertype: 'supertype',
        imageUrl: 'imageUrl',
        series: 'series',
        types: [],
        rarity: 'rarity',
        nationalPokedexNumber: 0,
        hp: 0,
        set: 'set',
        weaknesses: [],
        attacks: [],
        evolvesFrom: 'evolvesFrom',
      },
    ];
    fixture.detectChanges();
    const pokemonlistDE: DebugElement = fixture.debugElement;
    const pokemonlistElement: HTMLElement = pokemonlistDE.nativeElement;
    const p = pokemonlistElement.querySelector('app-pokemon');
    expect(p).not.toBeNull();
  });
});
