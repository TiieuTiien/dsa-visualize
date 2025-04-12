import React from "react";

interface ArrayListProps {
  array: number[];
  barColors: { [key: number]: string };
  containerRef: React.RefObject<HTMLDivElement>;
}

const ArrayList: React.FC<ArrayListProps> = ({
  array,
  barColors,
  containerRef,
}) => {
  return (
    <div className="array-list" id="arraylist" ref={containerRef}>
      {array.map((value, index) => (
        <div key={index} className="bar-container" data-index={index}>
          <div className="bar-value">{value}</div>
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
