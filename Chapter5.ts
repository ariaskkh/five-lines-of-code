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
