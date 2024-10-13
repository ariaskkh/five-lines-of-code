function nextColor(t: TrafficColor) {
  if (t.color() === "red") return new Greend();
  else if (t.color() === "green") return new Yellow();
  else if (t.color() === "yellow") return new Red();
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
  color(): string {
    return "red";
  }
  check(car: Car): void {
    car.stop();
  }
}

class Yellow implements TrafficColor {
  color(): string {
    return "yellow";
  }
  check(car: Car): void {
    car.stop();
  }
}

class Greend implements TrafficColor {
  color(): string {
    return "green";
  }
  check(car: Car): void {
    car.drive();
  }
}
