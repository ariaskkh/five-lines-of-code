function updateTile(x: number, y: number) {
  if (map[y][x].isStony() && map[y + 1][x].isAir()) {
    map[y + 1][x] = new FallingStone();
    map[y][x] = new Air();
  } else if (map[y][x].isBoxy() && map[y + 1][x].isAir()) {
    map[y + 1][x] = new Fallingbox();
    map[y][x] = new Air();
  } else if (map[y][x].isFallingStone()) {
    map[y][x] = new Stone();
  } else if (map[y][x].isFallingBox()) {
    map[y][x] = new isBoxedPrimitive();
  }
}

interface Tile {
  isStony(): boolean;
  isBoxy(): boolean;
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
  isAir() {
    return false;
  }
  isFallingStone() {
    return false;
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
    if (
      map[playery][playerx + dx + dx].isAir() &&
      !map[playery + 1][player + dx].isAir()
    ) {
      map[playery][playerx + dx + dx] = this;
      moveToTile(playerx + dx, playery);
    }
  }
}

class FallingStone implements Tile {
  isAir() {
    return false;
  }
  isFallingStone() {
    return true;
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
  moveHorizontal(dx: number) {}
}
