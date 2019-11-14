import { IDog } from "../models/Dog";

export interface IDogService {
  getList: () => Promise<IDog[]>;
  getAdoptedList: () => Promise<IDog[]>;
  adoptMany: (dogs: IDog[]) => Promise<IDog[]>;
}

export enum DogServiceError {
  EMPTY_DOG_LIST = "Empty dog list"
}
