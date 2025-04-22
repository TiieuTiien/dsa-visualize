import React, { useState, useRef, useEffect } from "react";
import useKeyboardEvents from "../../Hooks/useKeyboardEvents.tsx";
import "./SortingSelector.css";

interface SortingSelectorProps {
  arrayStructure: any;
  renderArray: (
    arr: number[],
    highlightIndices?: number | number[] | null
  ) => void;
  showNotification: (type: 'info' | 'success' | 'warning' | 'error', message: string) => void;
}

const options = [
  { value: "bubble", label: "Bubble Sort" },
  { value: "insertion", label: "Insertion Sort" },
  { value: "selection", label: "Selection Sort" },
  { value: "quick", label: "Quick Sort" },
];

const SortingSelector: React.FC<SortingSelectorProps> = ({
  arrayStructure,
  renderArray,
  showNotification,
}) => {
  const [selectedAlgo, setSelectedAlgo] = useState("insertion");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [computedWidth, setComputedWidth] = useState<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chWidth = 8;
    let maxTextWidth = 0;
    options.forEach((option) => {
      const optionWidth = option.label.length * chWidth;
      if (optionWidth > maxTextWidth) {
        maxTextWidth = optionWidth;
      }
    });
    
    const padding = 15 + 30;
    
    setComputedWidth(Math.ceil(maxTextWidth + padding));
  }, []);

  const toggleDropdown = () => {
    console.log("Dropdown toggled main: " + dropdownOpen);
    setDropdownOpen((prev) => !prev);
  };

  const handleOptionClick = (algo: string) => {
    setDropdownOpen(false);
    setSelectedAlgo(algo);
  };

  const handleSort = async () => {
    const currentArray = arrayStructure.getArray();
    try {
      switch (selectedAlgo) {
        case "bubble":
          await arrayStructure.bubbleSortAnimated(currentArray, renderArray);
          break;
        case "insertion":
          await arrayStructure.insertionSortAnimated(currentArray, renderArray);
          break;
        case "selection":
          await arrayStructure.selectionSortAnimated(currentArray, renderArray);
          break;
        case "quick":
          await arrayStructure.quickSortAnimated(
            currentArray,
            0,
            currentArray.length - 1,
            renderArray
          );
          break;
        default:
          showNotification("warning", "Invalid sorting algorithm selected");
          return;
      }
      renderArray(arrayStructure.getArray());
    } catch (error: any) {
      showNotification("warning", error.message);
    }
  };

  // Use keyboard hook for arrow navigation and Enter key
  useKeyboardEvents({
    arrowdown: () => {
      if (!dropdownOpen) {
        setDropdownOpen(false);
      }
      const currentIndex = options.findIndex(
        (option) => option.value === selectedAlgo
      );
      const newIndex = (currentIndex + 1) % options.length;
      setSelectedAlgo(options[newIndex].value);
    },
    arrowup: () => {
      if (!dropdownOpen) {
        setDropdownOpen(false);
      }
      const currentIndex = options.findIndex(
        (option) => option.value === selectedAlgo
      );
      const newIndex = (currentIndex - 1 + options.length) % options.length;
      setSelectedAlgo(options[newIndex].value);
    },
    enter: () => {
      if (dropdownOpen) {
        setDropdownOpen(false);
      }
    },
  });

  // Close dropdown when clicking outside the wrapper
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sorting-selector">
      <div
        className="custom-select-wrapper"
        ref={wrapperRef}
        onClick={toggleDropdown}
        style={{ width: computedWidth ? `${computedWidth}px` : "auto" }}
      >
        <div className="selected-option">
          {options.find((option) => option.value === selectedAlgo)?.label}
          <div className="select-arrow"></div>
        </div>
        {dropdownOpen && (
          <div className="options">
            {options.map((option) => (
              <div
                key={option.value}
                className={`option ${
                  selectedAlgo === option.value ? "active" : ""
                }`}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      <button onClick={handleSort}>Sort</button>
    </div>
  );
};

export default SortingSelector;