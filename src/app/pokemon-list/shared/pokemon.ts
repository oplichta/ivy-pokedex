export class Pokemon {
  public id: number;
  public name: string;
  public types: string;
  public imageUrl: string;
  constructor() {
    this.id = 0;
    this.name = '';
    this.types = '';
    this.imageUrl = '';
  }
}

export class Cards {
  public cards: Pokemon[];
  constructor() {
    this.cards = [];
  }
}
