import * as React from "react";
import { IDogService } from "../services/DogService";
import { IDog } from "../models/Dog";
import { AdoptedDogListContainer } from "../atoms/AdoptedDogListContainer";

export const AdoptedDogListViewFactory = (dogService: IDogService) => {
  const AdoptedDogListView = () => {
    const [adoptions, setAdoptions] = React.useState<IDog[]>([]);

    React.useEffect(() => {
      (async () => {
        const adoptionList = await dogService.getAdoptedList();
        setAdoptions(adoptionList);
      })();
    }, []);

    return (
      <AdoptedDogListContainer>
        <h2>Your companions!</h2>
        <div>
          {adoptions.map((dog: IDog) => (
            <div key={dog.id}>{dog.breed}</div>
          ))}
        </div>
      </AdoptedDogListContainer>
    );
  };

  return AdoptedDogListView;
};
