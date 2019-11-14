import * as React from "react";
import { Header } from "../atoms/Header";
import { Title } from "../atoms/Title";
import { DogItemWrapper } from "../atoms/DogItemWrapper";
import { DogItemCard } from "../atoms/DogItemCard";
import { DogPicture } from "../atoms/DogPicture";
import { DogInfo } from "../atoms/DogInfo";
import { DogName } from "../atoms/DogName";
import { DogDescription } from "../atoms/DogDescription";
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
        <Header>
          <Title>Your companions!</Title>
        </Header>
        <div>
          {adoptions.map((dog: IDog) => (
            <DogItemWrapper key={dog.id}>
              <DogItemCard>
                <DogPicture alt={`${dog.breed}`} src={dog.imgUrl} />
                <DogInfo>
                  <DogName>{dog.breed}</DogName>
                  <DogDescription>
                    {dog.age} years old - {dog.size}
                  </DogDescription>
                </DogInfo>
              </DogItemCard>
            </DogItemWrapper>
          ))}
        </div>
      </AdoptedDogListContainer>
    );
  };

  return AdoptedDogListView;
};
