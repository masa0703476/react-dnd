import update from "immutability-helper";
import type { FC } from "react";
import { useCallback, useState } from "react";

import { Card } from "./Card";

const style = {
  width: 400,
};

export interface Item {
  id: number;
  text: string;
}

export interface ContainerState {
  cards: Item[];
}

export const Container: FC = () => {
  {
    const [cards, setCards] = useState([
      {
        id: 1,
        text: "111",
      },
      {
        id: 2,
        text: "222",
      },
      {
        id: 3,
        text: "333",
      },
      {
        id: 4,
        text: "444",
      },
      {
        id: 5,
        text: "555",
      },
      {
        id: 6,
        text: "666",
      },
      {
        id: 7,
        text: "777",
      },
    ]);
    const [isAnyDragging, setIsAnyDragging] = useState<boolean>(false);

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      setCards((prevCards: Item[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as Item],
          ],
        }),
      );
    }, []);

    const renderCard = useCallback(
      (card: { id: number; text: string }, index: number) => {
        return (
          <Card
            key={card.id}
            index={index}
            id={card.id}
            text={card.text}
            moveCard={moveCard}
            isAnyDragging={isAnyDragging}
            setIsAnyDragging={setIsAnyDragging}
          />
        );
      },
      [isAnyDragging],
    );

    return (
      <>
        <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
      </>
    );
  }
};
