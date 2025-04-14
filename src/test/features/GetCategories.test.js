import { getCategories } from "../../store/categorySlice";

global.fetch = jest.fn();

describe("getCategories", () => {
  it("should getCategories with resolved response", async () => {
    const validData = [
      "tv",
      "audio",
      "laptop",
      "mobile",
      "gaming",
      "appliances",
    ];
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(validData),
    });

    const dispatch = jest.fn();
    const thunk = getCategories();
    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(getCategories.pending().type);
    expect(end[0].type).toBe(getCategories.fulfilled().type);
    expect(end[0].payload).toEqual(validData);
  });
});

it("should getCategories with rejected response", async () => {
  fetch.mockResolvedValue({
    ok: false,
  });

  const dispatch = jest.fn();
  const thunk = getCategories();

  await thunk(dispatch);

  const { calls } = dispatch.mock;
  const [start, end] = calls;

  expect(start[0].type).toBe(getCategories.pending().type);
  expect(end[0].type).toBe(getCategories.rejected().type);
});
