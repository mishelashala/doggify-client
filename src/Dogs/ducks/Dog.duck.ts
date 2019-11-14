import { IDog } from "../models/Dog";

/**
 * Action types
 */
export const FETCH_DOG_LIST_START = "doggify/dogs/FETCH_DOG_LIST_START";
export const FETCH_DOG_LIST_SUCCESS = "doggify/dogs/FETCH_DOG_LIST_SUCCESS";
export const FETCH_DOG_LIST_FAIL = "doggify/dogs/FETCH_DOG_LIST_FAIL";

export const ADD_TO_BASKET = "doggify/dogs/ADD_TO_BASKET";
export const REMOVE_FROM_BASKET = "doggify/dogs/REMOVE_FROM_BASKET";

/**
 * Action creators
 */

export const fetchListStarted = () => ({
  type: FETCH_DOG_LIST_START
});

export const fetchListSucceed = (dogs: IDog[]) => ({
  type: FETCH_DOG_LIST_SUCCESS,
  payload: {
    dogs
  }
});

export const fetchListFailed = (error: Error) => ({
  type: FETCH_DOG_LIST_FAIL,
  payload: error,
  error: true
});

export const addedToBasket = (id: string) => ({
  type: ADD_TO_BASKET,
  payload: {
    id
  }
});

export const removedFromBasket = (id: string) => ({
  type: REMOVE_FROM_BASKET,
  payload: {
    id
  }
});

/**
 * Reducers
 */

export interface IAppState {
  dogs: IDog[];
  basket: string[];
  isLoading: boolean;
}

export interface IFluxStandardAction {
  payload: any;
  type: string;
  error?: boolean;
}

export const initialState = () => ({
  dogs: [],
  basket: [],
  isLoading: true
});

const addToBasket = (state: IAppState, action: IFluxStandardAction) => {
  const found = state.basket.findIndex(
    (dogId: string) => dogId === action.payload.id
  );

  if (found !== -1) {
    return state;
  }

  const basket = [...state.basket, action.payload.id];
  return { ...state, basket };
};

const removeFromBasket = (state: IAppState, action: IFluxStandardAction) => {
  const basket = state.basket.filter((id: string) => action.payload.id !== id);
  return { ...state, basket };
};

export const dogReducer = (
  state: IAppState = initialState(),
  action: IFluxStandardAction
) => {
  switch (action.type) {
    case FETCH_DOG_LIST_START:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_DOG_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dogs: action.payload.dogs
      };

    case ADD_TO_BASKET:
      return addToBasket(state, action);

    case REMOVE_FROM_BASKET:
      return removeFromBasket(state, action);

    default:
      return state;
  }
};
