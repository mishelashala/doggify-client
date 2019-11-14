import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IDog } from "../models/Dog";
import { DogItemWrapper } from "../atoms/DogItemWrapper";
import { DogItemCard } from "../atoms/DogItemCard";
import { DogName } from "../atoms/DogName";
import { DogPicture } from "../atoms/DogPicture";
import { DogDescription } from "../atoms/DogDescription";
import { DogInfo } from "../atoms/DogInfo";
import { Button } from "../atoms/Button";
import * as dogDuck from "../ducks/Dog";

export interface IDogItemProps {
  dog: IDog;
}

export const DogItem: React.FC<IDogItemProps> = ({ dog }) => {
  const dispatch = useDispatch();
  const isSelected = useSelector((state: dogDuck.IAppState) => {
    const id = state.basket.findIndex((dogId: string) => dog.id === dogId);
    return id !== -1;
  });

  const handleClickAdopt = () => {
    dispatch(dogDuck.addedToBasket(dog.id));
  };

  return (
    <DogItemWrapper>
      <DogItemCard>
        <DogPicture alt={`${dog.breed}`} src={dog.imgUrl} />
        <DogInfo>
          <DogName>{dog.breed}</DogName>
          <DogDescription>
            {dog.age} years old - {dog.size}
          </DogDescription>
          <Button disabled={isSelected} onClick={handleClickAdopt}>
            ADTOP
          </Button>
        </DogInfo>
      </DogItemCard>
    </DogItemWrapper>
  );
};
