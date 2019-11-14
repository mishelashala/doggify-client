import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button, ButtonVariantTypes } from "../atoms/Button";
import { MainContainer } from "../atoms/MainContainer";
import { Title } from "../atoms/Title";
import { Header } from "../atoms/Header";
import * as dogDuck from "../ducks/Dog.duck";
import { IDog } from "../models/Dog";
import { IDogService, DogServiceError } from "../services/DogService";

const DogDetailPicture = styled.img`
  display: inline-block
  height: 8rem;
  object-fit: cover;
  vertical-align: middle;
  width: 8rem;
`;

export const DogDetailItem = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
`;

export const DogDetailInfo = styled.div`
  display: inline-block;
  margin-left: 1rem;
  vertical-align: middle;
`;

export const CheckoutViewFactory = (dogService: IDogService) => {
  const CheckoutView: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const dogs = useSelector((state: dogDuck.IAppState) => {
      return state.basket.reduce((dogs: IDog[], dogId: string) => {
        const index = state.dogs.findIndex((dog: IDog) => dog.id === dogId);
        return index === -1 ? dogs : [...dogs, state.dogs[index]];
      }, []);
    });

    const handleClickRemove = (id: string) => () => {
      dispatch(dogDuck.removedFromBasket(id));
    };

    const handleClickSubmit = async () => {
      try {
        await dogService.adoptMany(dogs);
        history.replace("/dogs/adoptions");
      } catch (err) {
        if (err.message === DogServiceError.EMPTY_DOG_LIST) {
          alert("Cannot checkout an empty basket!");
        }
      }
    };

    return (
      <MainContainer>
        <Header>
          <Title>Your new friends!</Title>
        </Header>
        <div>
          {dogs.map((dog: IDog) => (
            <DogDetailItem key={dog.id}>
              <div>
                <DogDetailPicture src={dog.imgUrl} alt={dog.breed} />
                <DogDetailInfo>
                  <h3>{dog.breed}</h3>
                  <p>{dog.age} years old</p>
                  <p>{dog.size}</p>
                </DogDetailInfo>
              </div>

              <div>
                <Button
                  variant={ButtonVariantTypes.WARNING}
                  onClick={handleClickRemove(dog.id)}
                >
                  REMOVE FROM BASKET
                </Button>
              </div>
            </DogDetailItem>
          ))}

          <Button onClick={handleClickSubmit}>SUBMIT ADOPTION</Button>
        </div>
      </MainContainer>
    );
  };

  return CheckoutView;
};
