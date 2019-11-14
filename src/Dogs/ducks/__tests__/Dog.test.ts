import * as dogDuck from "../Dog";

describe("Dog reducer", () => {
  it("should set isLoading to true when the app starts loading", () => {
    const state = dogDuck.initialState();
    const action = dogDuck.fetchListStarted();
    const result = dogDuck.dogReducer(state, action);
    const expectedResult = {
      ...dogDuck.initialState(),
      isLoading: true
    };

    expect(result).toEqual(expectedResult);
  });

  it("should set isLoading to false when an error occures", () => {
    const state = dogDuck.initialState();
    const action = dogDuck.fetchListFailed(new Error("Something went wrong"));
    const result = dogDuck.dogReducer(state, action);
    const expectedResult = {
      ...dogDuck.initialState(),
      isLoading: false
    };

    expect(result).toEqual(expectedResult);
  });

  it("should add the dog list to the state", () => {
    const dogs = [
      { id: "1", breed: "Chihuahua", age: 1.5, size: "small", imgUrl: "" }
    ];
    const state = dogDuck.initialState();
    const action = dogDuck.fetchListSucceed(dogs);
    const result = dogDuck.dogReducer(state, action);
    const expectedResult = {
      ...dogDuck.initialState(),
      isLoading: false,
      dogs
    };

    expect(result).toEqual(expectedResult);
  });

  it("should add a dog from the list to the basket", () => {
    const dogs = [
      { id: "1", breed: "Chihuahua", age: 1.5, size: "small", imgUrl: "" }
    ];
    const state = { ...dogDuck.initialState(), isLoading: false, dogs };
    const action = dogDuck.addedToBasket("1");
    const result = dogDuck.dogReducer(state, action);
    const expectedResult = {
      ...dogDuck.initialState(),
      isLoading: false,
      dogs,
      basket: ["1"]
    };

    expect(result).toEqual(expectedResult);
  });

  it("should remove a dog from the basket", () => {
    const dogs = [
      { id: "1", breed: "Chihuahua", age: 1.5, size: "small", imgUrl: "" }
    ];
    const state = {
      ...dogDuck.initialState(),
      isLoading: false,
      dogs,
      basket: ["1"]
    };
    const action = dogDuck.removedFromBasket("1");
    const result = dogDuck.dogReducer(state, action);
    const expectedResult = {
      ...dogDuck.initialState(),
      isLoading: false,
      dogs,
      basket: []
    };

    expect(result).toEqual(expectedResult);
  });

  it("should try to remove a dog that is not in the basket", () => {
    const dogs = [
      { id: "1", breed: "Chihuahua", age: 1.5, size: "small", imgUrl: "" }
    ];
    const state = {
      ...dogDuck.initialState(),
      isLoading: false,
      dogs,
      basket: ["1"]
    };
    const action = dogDuck.removedFromBasket("2");
    const result = dogDuck.dogReducer(state, action);
    const expectedResult = {
      ...dogDuck.initialState(),
      isLoading: false,
      dogs,
      basket: ["1"]
    };

    expect(result).toEqual(expectedResult);
  });
});
