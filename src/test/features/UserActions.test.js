import reducerUser, { createUser, getAllUsers } from "../../store/userSlice";

global.fetch = jest.fn();

describe("createUser", () => {
  it("should createUser with resolved response", async () => {
    const validData = {
      name: `Kris`,
      email: `kris@gmail.com`,
      password: `12345`,
      avatar: `new_photo`,
    };
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(validData),
    });

    const dispatch = jest.fn();
    const thunk = createUser({
      name: `Kris`,
      email: `kris@gmail.com`,
      password: `12345`,
      avatar: `new_photo`,
    });
    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;
    expect(end[0].payload.name).toEqual(validData.name);
    expect(end[0].payload.password).toEqual(validData.password);
    expect(end[0].payload.email).toEqual(validData.email);
    expect(start[0].type).toBe(createUser.pending().type);
    expect(end[0].type).toBe(createUser.fulfilled().type);
  });

  it("should createUser with rejected response", async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    const dispatch = jest.fn();
    const thunk = createUser();

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;
    expect(start[0].type).toBe(createUser.pending().type);
    expect(end[0].type).toBe(createUser.rejected().type);
  });
});

describe("getAllUsers", () => {
  it("should getAllUsers with resolved response", async () => {
    const validData = {
      name: `Kris`,
      email: `kris@gmail.com`,
      password: `12345`,
      avatar: `new_photo`,
    };
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(validData),
    });
    const dispatch = jest.fn();
    const thunk = getAllUsers();
    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(end[0].payload).toBe(validData);
    expect(start[0].type).toBe(getAllUsers.pending().type);
    expect(end[0].type).toBe(getAllUsers.fulfilled().type);
  });

  it("should getAllUsers with rejected response", async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    const dispatch = jest.fn();
    const thunk = getAllUsers();

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(getAllUsers.pending().type);
    expect(end[0].type).toBe(getAllUsers.rejected().type);
  });
});
