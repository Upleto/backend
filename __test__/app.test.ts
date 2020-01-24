import App from '../src/app';

describe('test App', () => {
  it('should output correct a value', async () => {
    const app = new App(2, 6);
    const a = await app.getA();
    expect(a).toBe(2);
  });
});
