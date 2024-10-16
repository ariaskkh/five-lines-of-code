function updateTile(x: number, y: number) {
  map[y][x].update(y, x);
}

interface Tile {
  isAir(): boolean;
  isStony(): boolean;
  isBoxy(): boolean;
  canFall(): boolean;
  update(x: number, y: number): void;
}

interface FallingState {
  isFalling(): boolean;
  moveHorizontal(tile: Tile, dx: number): void;
}

class Falling implements FallingState {
  isFalling(): boolean {
    return true;
  }
  moveHorizontal(tile: Tile, dx: number): void {
    if (
      map[playery][playerx + dx + dx].isAir() &&
      !map[playery + 1][playerx + dx].isAir()
    ) {
      map[playery][playerx + dx + dx] = tile;
      moveToTile(playerx + dx, playery);
    }
  }
}

class Resting implements FallingState {
  isFalling(): boolean {
    return false;
  }
  moveHorizontal(tile: Tile, dx: number) {}
}

class Air implements Tile {
  isAir(): boolean {
    return true;
  }
  rest(): void {}
  isStony(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
  canFall(): boolean {
    return false;
  }
  update(x: number, y: number): void {}
}

class Stone implements Tile {
  private fallStrategy: FallStrategy;

  constructor(falling: FallingState) {
    this.fallStrategy = new FallStrategy(falling);
  }

  isAir() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {}
  moveVertical(dy: number) {}
  isStony(): boolean {
    return true;
  }
  isBoxy(): boolean {
    return false;
  }
  moveHorizontal(dx: number) {
    this.fallStrategy.getFalling().moveHorizontal(this, dx);
  }

  drop(): void {
    // this.falling = new Falling();
  }
  rest(): void {
    // this.falling = new Resting();
  }
  canFall(): boolean {
    return true;
  }
  update(x: number, y: number): void {
    this.fallStrategy.update(this, x, y);
  }
}

class Box implements Tile {
  private fallStrategy: FallStrategy;

  constructor(falling: FallingState) {
    this.fallStrategy = new FallStrategy(falling);
  }

  isAir(): boolean {
    return false;
  }
  isStony(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return true;
  }

  drop(): void {}
  canFall(): boolean {
    return true;
  }
  update(x: number, y: number): void {
    this.fallStrategy.update(this, x, y);
  }
}

class Flux implements Tile {
  isAir(): boolean {
    return true;
  }
  isStony(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
  canFall(): boolean {
    return false;
  }
  update(x: number, y: number): void {}
}

var map: Tile[][] = [
  [
    new Stone(new Resting()),
    new Stone(new Resting()),
    new Stone(new Resting()),
  ],
  [
    new Stone(new Resting()),
    new Stone(new Resting()),
    new Stone(new Resting()),
  ],
  [
    new Stone(new Resting()),
    new Stone(new Resting()),
    new Stone(new Resting()),
  ],
  [
    new Stone(new Resting()),
    new Stone(new Resting()),
    new Stone(new Resting()),
  ],
]; // 컴파일 에러 제거를 위한 임시 코드
var playerx = 1;
var playery = 2;

function moveToTile(arg0: number, playery: number) {
  throw new Error("Function not implemented.");
}

class FallStrategy {
  constructor(private falling: FallingState) {}
  getFalling() {
    return this.falling;
  }
  update(tile: Tile, x: number, y: number) {
    this.falling = map[y + 1][x].isAir() ? new Falling() : new Resting();
    this.drop(tile, x, y);
  }

  private drop(tile: Tile, x: number, y: number) {
    if (map[y + 1][x].isAir()) {
      map[y + 1][x] = tile;
      map[y][x] = new Air();
    }
  }
}
