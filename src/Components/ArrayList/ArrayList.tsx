import React from "react";

interface ArrayListProps {
  array: number[];
  barColors: { [key: number]: string };
  containerRef: React.RefObject<HTMLDivElement>;
  onBarSelect: (index: number) => void;
  onDoubleClick: (index: number) => void;
  selectedIndex: number | null;
}

const ArrayList: React.FC<ArrayListProps> = ({
  array,
  barColors,
  containerRef,
  onBarSelect,
  onDoubleClick,
  selectedIndex,
}) => {
  return (
    <div className="array-list" id="arraylist" ref={containerRef}>
      {array.map((value, index) => (
        <div
          key={index}
          className={`bar-container ${
            selectedIndex === index ? "selected" : ""
          }`}
          data-index={index}
          onClick={() => onBarSelect(index)}
          onDoubleClick={() => onDoubleClick(index)}
        >
          <div className={`bar-value ${
            selectedIndex === index ? "selected" : ""
          }`}>{value}</div>
          <div
            className="bar"
            style={{
              height: `${value * 3}px`,
              backgroundColor: barColors[index] || "steelblue",
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default ArrayList;
