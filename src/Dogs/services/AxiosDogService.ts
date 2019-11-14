import { IDogService, DogServiceError } from "./DogService";
import axios from "axios";
import { IDog } from "../models/Dog";

export enum HttpStatusCode {
  BAD_REQUEST = 400
}

export const AxiosDogServiceFactory = (): IDogService => {
  const getList = async () => {
    const res = await axios.get("http://localhost:3333/api/dogs", {
      headers: {
        api_key: "v1Vld/Dr34m5"
      }
    });
    return Promise.resolve(res.data.dogs as IDog[]);
  };

  const getAdoptedList = async () => {
    const res = await axios.get("http://localhost:3333/api/dogs/adoptions", {
      headers: {
        api_key: "v1Vld/Dr34m5"
      }
    });
    return Promise.resolve(res.data.adoptions as IDog[]);
  };

  const adoptMany = async (dogs: IDog[]) => {
    try {
      const res = await axios.post(
        "http://localhost:3333/api/dogs/adopt",
        {
          dogs
        },
        {
          headers: {
            api_key: "v1Vld/Dr34m5"
          }
        }
      );
      return Promise.resolve(res.data.dogs as IDog[]);
    } catch (err) {
      if (err.response.status === HttpStatusCode.BAD_REQUEST) {
        return Promise.reject(new Error(DogServiceError.EMPTY_DOG_LIST));
      }
      return dogs;
    }
  };

  return {
    getList,
    getAdoptedList,
    adoptMany
  };
};
