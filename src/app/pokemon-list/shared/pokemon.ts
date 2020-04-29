export class Pokemon {
  public id: string;
  public name: string;
  public supertype: string;
  public imageUrl: string;
  public series: string;
  public types: [];
  public rarity: string;
  public nationalPokedexNumber: number;
  public hp: string;
  public set: string;
  public weaknesses: [];
  public attacks: [];
  public evolvesFrom: string;
  constructor() {
    this.id = '';
    this.name = '';
    this.supertype = '';
    this.imageUrl = '';
    this.series = '';
    this.types = [];
    this.rarity = '';
    this.nationalPokedexNumber = 0;
    this.hp = '';
    this.set = '';
    this.weaknesses = [];
    this.attacks = [];
    this.evolvesFrom = '';
  }
}

export class Cards {
  public cards: Pokemon[];
  constructor() {
    this.cards = [];
  }
}
