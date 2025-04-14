import reducerUser, { addToCart, removeFromCart } from "../../store/userSlice";
import { products } from "../utiles/products";

describe("cartstate", () => {
  it("checking the addition of a new item to the cart", () => {
    const previousState = { cart: [] };
    const action = { type: addToCart.type, payload: { id: 1, products } };
    const result = reducerUser(previousState, action);
    expect(result.cart[0]).toEqual({
      id: 1,
      image:
        "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947383286-714WUJlhbLS._SL1500_.jpg",

      title:
        "Sony WH-1000XM3 Bluetooth Wireless Over Ear Headphones with Mic (Silver)",
      color: "silver",
      brand: "sony",
      price: 773,
      quantity: 1,
    });
  });
  it("checking for changes in the number of selected items to the cart", () => {
    const previousState = {
      cart: [
        {
          id: 1,
          image:
            "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947383286-714WUJlhbLS._SL1500_.jpg",

          title:
            "Sony WH-1000XM3 Bluetooth Wireless Over Ear Headphones with Mic (Silver)",
          color: "silver",
          brand: "sony",
          price: 773,
          quantity: 1,
        },
      ],
    };
    const action = { type: addToCart.type, payload: { id: 1, products } };
    const result = reducerUser(previousState, action);
    expect(result.cart[0].quantity).toBe(2);
  });
  it("checking the deletion of the selected item from the cart", () => {
    const previousState = {
      cart: [
        {
          id: 1,
          image:
            "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947383286-714WUJlhbLS._SL1500_.jpg",

          title:
            "Sony WH-1000XM3 Bluetooth Wireless Over Ear Headphones with Mic (Silver)",
          color: "silver",
          brand: "sony",
          price: 773,
          quantity: 1,
        },
      ],
    };
    const action = { type: removeFromCart.type, payload: { id: 1 } };
    const result = reducerUser(previousState, action);
    expect(result.cart).toEqual([]);
  });
});
