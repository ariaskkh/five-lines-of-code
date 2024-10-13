function updateTile(x: number, y: number) {
  if (
    map[y][x].isStone() ||
    (map[y][x].isFallingStone() && map[y + 1][x].isAir())
  ) {
    map[y + 1][x] = new FallingStone();
    map[y][x] = new Air();
  } else if (
    (map[y][x].isBox() || map[y][x].isFallingBox()) &&
    map[y + 1][x].isAir()
  ) {
    map[y + 1][x] = new Fallingbox();
    map[y][x] = new Air();
  } else if (map[y][x].isFallingStone()) {
    map[y][x] = new Stone();
  } else if (map[y][x].isFallingBox()) {
    map[y][x] = new isBoxedPrimitive();
  }
}
