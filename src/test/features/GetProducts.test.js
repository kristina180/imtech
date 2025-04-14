import { getProducts } from "../../store/productsSlice";

global.fetch = jest.fn();

describe("getProducts", () => {
  it("should getProducts with resolved response", async () => {
    const validData = {
      brand: "sony",
      category: "audio",
      color: "silver",
      description:
        "Digital noise cancelling : Industry leading Active Noise Cancellation (ANC) lends a personalized, virtually soundproof experience at any situation\r\nHi-Res Audio : A built-in amplifier integrated in HD Noise Cancelling Processor QN1 realises the best-in-class signal-to-noise ratio and low distortion for portable devices.\r\nDriver Unit : Powerful 40-mm drivers with Liquid Crystal Polymer (LCP) diaphragms make the headphones perfect for handling heavy beats and can reproduce a full range of frequencies up to 40 kHz.\r\nVoice assistant : Alexa enabled (In-built) for voice access to music, information and more. Activate with a simple touch. Frequency response: 4 Hz-40,000 Hz",
      discount: 11,
      id: 1,
      image:
        "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947383286-714WUJlhbLS._SL1500_.jpg",
      model: "WH-1000XM3",
      price: 773,
      title:
        "Sony WH-1000XM3 Bluetooth Wireless Over Ear Headphones with Mic (Silver)",
    };
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(validData),
    });

    const dispatch = jest.fn();
    const thunk = getProducts();
    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;
    expect(start[0].type).toBe(getProducts.pending().type);
    expect(end[0].type).toBe(getProducts.fulfilled().type);
    expect(end[0].payload).toEqual(validData);
  });
});

it("should getProducts with rejected response", async () => {
  fetch.mockResolvedValue({
    ok: false,
  });

  const dispatch = jest.fn();

  const thunk = getProducts();

  await thunk(dispatch);
  const { calls } = dispatch.mock;
  const [start, end] = calls;
  expect(start[0].type).toBe(getProducts.pending().type);
  expect(end[0].type).toBe(getProducts.rejected().type);
});
