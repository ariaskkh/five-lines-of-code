function updateTile(x: number, y: number) {
  if (map[y][x].isStony() && map[y + 1][x].isAir()) {
    map[y][x].drop();
    map[y + 1][x] = map[y][x];
    map[y][x] = new Air();
  } else if (map[y][x].isBoxy() && map[y + 1][x].isAir()) {
    map[y][x].drop();
    map[y + 1][x] = map[y][x];
    map[y][x] = new Air();
  } else if (map[y][x].isFalling()) {
    map[y][x].rest();
  }
}

interface Tile {
  isFalling(): boolean;
  isAir(): boolean;
  isStony(): boolean;
  isBoxy(): boolean;
  drop(): void;
  rest(): void;
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
  isFalling(): boolean {
    return false;
  }
  isAir(): boolean {
    return true;
  }
  drop(): void {}
  rest(): void {}
  isStony(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
}

class Stone implements Tile {
  constructor(private falling: FallingState) {}
  isFalling(): boolean {
    return this.falling.isFalling();
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
    this.falling.moveHorizontal(this, dx);
  }

  drop(): void {
    this.falling = new Falling();
  }
  rest(): void {
    this.falling = new Resting();
  }
}

class Box implements Tile {
  constructor(private falling: FallingState) {}
  isFalling(): boolean {
    return this.falling.isFalling();
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
  rest(): void {}
}

class Flux implements Tile {
  isFalling(): boolean {
    return false;
  }
  isAir(): boolean {
    return true;
  }
  isStony(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
  drop(): void {}
  rest(): void {}
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
