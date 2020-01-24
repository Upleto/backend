class App {
  constructor(private a: number, private b: number) {
    this.a = a;
    this.b = b;
  }

  async getA(): Promise<number> {
    return this.a;
  }

  async getB(): Promise<number> {
    return this.b;
  }
}

const ab = new App(3, 5);

export default App;

ab.getA().then(console.log);
