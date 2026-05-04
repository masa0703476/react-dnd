import type { FC } from "react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { DropResult, ItemTypes } from "./ItemTypes";
import DragAreaWrapper from "./DragAreaWrapper";

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};

export interface CardProps {
  id: any;
  text: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  isAnyDragging: boolean;
  setIsAnyDragging: (dragging: boolean) => void;
}

export const Card: FC<CardProps> = ({
  id,
  text,
  index,
  moveCard,
  isAnyDragging,
  setIsAnyDragging,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      setIsAnyDragging(true);
      return { id, index };
    },
    end: (item, monitor) => {
      setIsAnyDragging(false);

      const dragIndex = item.index;
      const dropIndex = (monitor.getDropResult() as DropResult)?.DropIndex;
      const position = (monitor.getDropResult() as DropResult)?.Position;

      // ドロップエリア外の場合何もしない
      if (!position || !dropIndex) {
        return;
      }

      // Don't replace items with themselves
      if (dragIndex === dropIndex) {
        return;
      }

      // 自身の一つ上のアイテムの、下半分にドロップした場合は位置が変わらない
      if (dragIndex === dropIndex + 1 && position === "Bottom") {
        return;
      }

      // 自身の一つ下のアイテムの、上半分にドロップした場合は位置が変わらない
      if (dragIndex + 1 === dropIndex && position === "Upper") {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, dropIndex);
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);
  return (
    <div ref={ref}>
      <DragAreaWrapper
        index={index}
        isAnyDragged={isAnyDragging}
        isDraggedOneself={isDragging}
      >
        <div style={{ ...style, opacity }}>{text}</div>
      </DragAreaWrapper>
    </div>
  );
};
