import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_URL } from "../utils/constants";

export const createUser = createAsyncThunk(
  "user/createUser",
  async function (payload, { rejectWithValue }) {
    try {
      const response = await axios.post(
        `${USER_URL}users/`,
        {
          name: `${payload.name}`,
          email: `${payload.email}`,
          password: `${payload.password}`,
          avatar:
            "https://avatars.mds.yandex.net/i?id=e0f30d75c96988928ed89950848b5605_l-4502909-images-thumbs&n=13",
        },
        { headers: { "Content-Type": "application/json" } }
      );
      const response_token = await axios.post(
        `${USER_URL}auth/login`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      document.cookie = `token=${response_token.data.access_token}; max-age=3600`;
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(`${USER_URL}users?limit=1000`);
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async function (payload, { rejectWithValue }) {
    try {
      const response = await axios.post(`${USER_URL}auth/login`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      document.cookie = `token=${response.data.access_token}; max-age=3600`;
      const login = await axios(`${USER_URL}auth/profile`, {
        headers: { Authorization: `Bearer ${response.data.access_token}` },
      });

      return { data: login.data, token: response.data.access_token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "user/checkAuth",
  async function (payload, { rejectWithValue }) {
    try {
      const response = await axios(`${USER_URL}auth/profile`, {
        headers: { Authorization: `Bearer ${payload}` },
      });
      return { data: response.data, token: payload };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async function (payload, { rejectWithValue }) {
    try {
      const response = await axios.put(
        `${USER_URL}users/${payload.id}`,
        {
          name: `${payload.name}`,
          email: `${payload.email}`,
          password: `${payload.password}`,
          avatar: `${payload.avatar}`,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    allusers: null,
    user: null,
    token: null,
    cart: [],
    favorites: [],
    formType: "signup",
    showForm: false,
  },
  reducers: {
    toggleTypeForm(state, action) {
      state.formType = action.payload;
    },
    toggleForm(state, action) {
      state.showForm = action.payload;
    },
    logout(state, action) {
      state.user = null;
      state.token = null;
    },

    addToCart(state, action) {
      let id = action.payload.id;
      let found = state.cart.find((elem) => elem.id == id);
      if (found) {
        state.cart.map((elem) => elem.id == id && elem.quantity++);
      } else {
        let new_elem = action.payload.products.find((elem) => elem.id == id);
        state.cart.push({
          id: new_elem.id,
          image: new_elem.image,
          title: new_elem.title,
          color: new_elem.color,
          brand: new_elem.brand,
          price: new_elem.price,
          quantity: 1,
        });
      }
    },
    removeFromCart(state, action) {
      const id = action.payload.id;
      let found = state.cart.find((elem) => elem.id == action.payload.id);
      if (found.quantity == 1 || action.payload.delete) {
        state.cart = state.cart.filter((elem) => {
          return elem.id != id;
        });
      } else {
        state.cart.map((elem) => elem.id == id && elem.quantity--);
      }
    },

    cleanCart(state, action) {
      state.cart = [];
    },

    addToFavorites(state, action) {
      let id = action.payload.id;
      let found = state.favorites.find((elem) => elem.id == id);
      if (!found) {
        let new_elem = action.payload.products.find((elem) => elem.id == id);
        state.favorites.push({
          id: new_elem.id,
          image: new_elem.image,
          title: new_elem.title,
          color: new_elem.color,
          brand: new_elem.brand,
          price: new_elem.price,
        });
      }
    },
    removeFromFavorites(state, action) {
      const id = action.payload.id;
      state.favorites = state.favorites.filter((elem) => {
        return elem.id != id;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.allusers = action.payload;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.user = action.payload.data;
      state.token = action.payload.token;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.data;
      state.token = action.payload.token;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const {
  addToCart,
  removeFromCart,
  cleanCart,
  addToFavorites,
  removeFromFavorites,
  toggleForm,
  toggleTypeForm,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
