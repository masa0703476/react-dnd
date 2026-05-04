import React, { useRef, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { DropResult, ItemTypes } from "./ItemTypes";

interface DragItem {
  index: number;
  id: string;
  type: string;
}

interface DragAreaWrapperProps {
  index: number;
  children: React.ReactNode;
  isDraggedOneself: boolean;
  isAnyDragged: boolean;
}

const DragAreaWrapper = (props: DragAreaWrapperProps) => {
  const childrenRef = useRef<HTMLDivElement>(null);
  const [childHeight, setChildHeight] = useState(0);

  const [_, dropUpper] = useDrop<DragItem, DropResult>({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop: () => {
      return { Position: "Upper", DropIndex: props.index };
    },
  });

  const [__, dropBottom] = useDrop<DragItem, DropResult>({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop: () => {
      return { Position: "Bottom", DropIndex: props.index };
    },
  });

  useEffect(() => {
    if (childrenRef.current) {
      setChildHeight(childrenRef.current.offsetHeight / 2);
    }
  }, [props.children]);

  const showDropLayer = props.isAnyDragged && !props.isDraggedOneself;
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {showDropLayer && (
        <div
          ref={dropUpper}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: `${childHeight}px`,
            pointerEvents: "auto",
            zIndex: 1,
          }}
        />
      )}
      <div ref={childrenRef}>{props.children}</div>
      {showDropLayer && (
        <div
          ref={dropBottom}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: `${childHeight}px`,
            pointerEvents: "auto",
            zIndex: 1,
          }}
        />
      )}
    </div>
  );
};

export default DragAreaWrapper;
