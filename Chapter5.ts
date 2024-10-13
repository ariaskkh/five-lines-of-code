function updateTile(x: number, y: number) {
  if (map[y][x].isStony() && map[y + 1][x].isAir()) {
    map[y + 1][x] = new Stone(FallingState.FALLING);
    map[y][x] = new Air();
  } else if (map[y][x].isBoxy() && map[y + 1][x].isAir()) {
    map[y + 1][x] = new Fallingbox();
    map[y][x] = new Air();
  } else if (map[y][x].isFallingStone()) {
    map[y][x] = new Stone(FallingState.RESTING);
  } else if (map[y][x].isFallingBox()) {
    map[y][x] = new isBoxedPrimitive();
  }
}

interface Tile {
  isStony(): boolean;
  isBoxy(): boolean;
}

enum FallingState {
  FALLING,
  RESTING,
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
    return this.falling === FallingState.FALLING;
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
    if (this.isFallingStone() === false) {
      if (
        map[playery][playerx + dx + dx].isAir() &&
        !map[playery + 1][player + dx].isAir()
      ) {
        map[playery][playerx + dx + dx] = this;
        moveToTile(playerx + dx, playery);
      }
    } else if (this.isFallingStone() === true) {
    }
  }
}
