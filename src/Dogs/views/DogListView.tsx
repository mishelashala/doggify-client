import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IDogService } from "../services/DogService";
import { DogItem } from "../components/DogItem";
import { DogList } from "../atoms/DogList";
import { MainContainer } from "../atoms/MainContainer";
import { When } from "../components/When";
import * as dogDuck from "../ducks/Dog.duck";

export const DogListViewFactory = (dogService: IDogService) => {
  const DogListView = () => {
    const dispatch = useDispatch();
    const dogs = useSelector((state: dogDuck.IAppState) => state.dogs);
    const isLoading = useSelector(
      (store: dogDuck.IAppState) => store.isLoading
    );

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
      <MainContainer>
        <When predicate={isLoading}>
          <p>Loading...</p>
        </When>

        <When predicate={!isLoading}>
          <DogList>
            {dogs.map(dog => (
              <DogItem key={dog.id} dog={dog} />
            ))}
          </DogList>
        </When>
      </MainContainer>
    );
  };

  return DogListView;
};
