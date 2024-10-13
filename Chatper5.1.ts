function nextColor(t: TrafficColor) {
  if (t.color() === "red") return new Red("green");
  else if (t.color() === "green") return new Red("yellow");
  else if (t.color() === "yellow") return new Red("red");
}

class Car {
  stop() {}

  drive() {}
}

interface TrafficColor {
  color(): string;
  check(car: Car): void;
}

class Red implements TrafficColor {
  constructor(private col: string) {}
  color(): string {
    return this.col;
  }
  check(car: Car): void {
    if (this.color() === "red") {
      car.stop();
    } else if (this.color() === "yellow") {
      car.stop();
    } else if (this.color() === "green") {
      car.drive();
    }
  }
}
