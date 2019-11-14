import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IDogService } from "../services/DogService";
import { DogItem } from "../components/DogItem";
import { DogList } from "../atoms/DogList";
import * as dogDuck from "../ducks/Dog.duck";

export const DogListViewFactory = (dogService: IDogService) => {
  const DogListView = () => {
    const dispatch = useDispatch();
    const dogs = useSelector((store: dogDuck.IAppState) => store.dogs);

    React.useEffect(() => {
      (async () => {
        try {
          dispatch(dogDuck.fetchListStarted());
          const dogList = await dogService.getList();
          dispatch(dogDuck.fetchListSucceed(dogList));
        } catch (err) {
          dispatch(dogDuck.fetchListFailed(err));
        }
      })();
    }, [dispatch]);

    return (
      <div>
        <DogList>
          {dogs.map(dog => (
            <DogItem key={dog.id} dog={dog} />
          ))}
        </DogList>
      </div>
    );
  };

  return DogListView;
};
