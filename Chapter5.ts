function updateTile(x: number, y: number) {
  if (map[y][x].isStony() && map[y + 1][x].isAir()) {
    map[y + 1][x] = new Stone(new Falling());
    map[y][x] = new Air();
  } else if (map[y][x].isBoxy() && map[y + 1][x].isAir()) {
    map[y + 1][x] = new Box(new Falling());
    map[y][x] = new Air();
  } else if (map[y][x].isFallingStone()) {
    map[y][x] = new Stone(new Resting());
  } else if (map[y][x].isFallingBox()) {
    map[y][x] = new Box(new Resting());
  }
}

interface Tile {
  isStony(): boolean;
  isBoxy(): boolean;
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
      !map[playery + 1][player + dx].isAir()
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
  isStony(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
}

class Stone implements Tile {
  constructor(private falling: FallingState) {}

  isAir() {
    return false;
  }
  isFallingStone() {
    return this.falling.isFalling();
  }
  isFallingBox() {
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
}

class Box implements Tile {
  constructor(private falling: FallingState) {}
  isStony(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return true;
  }
}
