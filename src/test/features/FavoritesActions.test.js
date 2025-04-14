import reducerUser, {
  addToFavorites,
  removeFromFavorites,
} from "../../store/userSlice";
import { products } from "../utiles/products";

describe("favoritestate", () => {
  it("checking the addition of a new item to the favorites ", () => {
    const previousState = { favorites: [] };
    const action = { type: addToFavorites.type, payload: { id: 1, products } };
    const result = reducerUser(previousState, action);
    expect(result.favorites[0]).toEqual({
      id: 1,
      image:
        "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947383286-714WUJlhbLS._SL1500_.jpg",

      title:
        "Sony WH-1000XM3 Bluetooth Wireless Over Ear Headphones with Mic (Silver)",
      color: "silver",
      brand: "sony",
      price: 773,
    });
  });

  it("checking the deletion of the selected item from the cart", () => {
    const previousState = {
      favorites: [
        {
          id: 1,
          image:
            "https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947383286-714WUJlhbLS._SL1500_.jpg",

          title:
            "Sony WH-1000XM3 Bluetooth Wireless Over Ear Headphones with Mic (Silver)",
          color: "silver",
          brand: "sony",
          price: 773,
        },
      ],
    };
    const action = { type: removeFromFavorites.type, payload: { id: 1 } };
    const result = reducerUser(previousState, action);
    expect(result.favorites).toEqual([]);
  });
});
