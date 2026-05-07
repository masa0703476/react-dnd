import React, { useRef, useEffect, useState, CSSProperties } from "react";
import { useDrop } from "react-dnd";
import { DropResult, ItemTypes } from "./ItemTypes";

interface DragItem {
  index: number;
  id: string;
  type: string;
}

interface DropAreaWrapperProps {
  index: number;
  children: React.ReactNode;
  isDraggedOneself: boolean;
  isAnyDragged: boolean;
}

const DropAreaWrapper = (props: DropAreaWrapperProps) => {
  const childrenRef = useRef<HTMLDivElement>(null);
  const [childHeight, setChildHeight] = useState(0);

  const [{ isOver: isUpperOver }, dropUpper] = useDrop<
    DragItem,
    DropResult,
    { isOver: boolean }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isOver: monitor.isOver(),
      };
    },
    drop: () => {
      return { Position: "Upper", DropIndex: props.index };
    },
  });

  const [{ isOver: isBottomOver }, dropBottom] = useDrop<
    DragItem,
    DropResult,
    { isOver: boolean }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isOver: monitor.isOver(),
      };
    },
    drop: () => {
      return { Position: "Bottom", DropIndex: props.index };
    },
  });

  useEffect(() => {
    if (childrenRef.current) {
      setChildHeight(childrenRef.current.offsetHeight);
    }
  }, [props.children]);

  const showDropLayer = props.isAnyDragged && !props.isDraggedOneself;
  const upperDropHeight = childHeight / 2 + (isUpperOver ? childHeight : 0);
  const bottomDropHeight = childHeight / 2 + (isBottomOver ? childHeight : 0);
  const wrapperStyle: CSSProperties = {
    position: "relative",
    paddingTop: isUpperOver ? `${childHeight}px` : undefined,
    paddingBottom: isBottomOver ? `${childHeight}px` : undefined,
  };

  // 自身がドラッグ開始された場合、元あった場所は非表示
  if (props.isDraggedOneself) {
    return <></>;
  }

  return (
    <div style={wrapperStyle}>
      {showDropLayer && (
        <div
          ref={dropUpper}
          style={{
            position: "absolute",
            top: 0,
            bottom: bottomDropHeight,
            left: 0,
            right: 0,
            height: `${upperDropHeight}px`,
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
            top: upperDropHeight,
            bottom: 0,
            left: 0,
            right: 0,
            height: `${bottomDropHeight}px`,
            pointerEvents: "auto",
            zIndex: 1,
          }}
        />
      )}
    </div>
  );
};

export default DropAreaWrapper;
