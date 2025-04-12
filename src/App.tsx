import React, { useEffect, useState, useRef, useCallback } from "react";
import ArrayStructure from "./data-structures/Array";
import DragDrop from "./drag-drop/drag-drop";
import AlertList from "./Components/AlertList/AlertList.tsx";
import ArrayList from "./Components/ArrayList/ArrayList.tsx";
import "./App.css";
import useKeyboardEvents from "./Hooks/useKeyboardEvents.tsx";

function App() {
  const [arrayStructure] = useState(new ArrayStructure(10));
  const [array, setArray] = useState(arrayStructure.getArray());
  const [dragDropInstance, setDragDropInstance] = useState(null);
  const [barColors, setBarColors] = useState({});
  const [alerts, setAlerts] = useState([]);

  const containerRef = useRef(null);

  const renderArray = useCallback(
    (arr: number[], highlightIndices: number | number[] | null = null) => {
      setArray([...arr]);
      if (highlightIndices !== null) {
        const newBarColors: Record<number, string> = {};
        if (Array.isArray(highlightIndices)) {
          // When two indices are provided: use red for the first, green for the second.
          if (highlightIndices.length >= 2) {
            newBarColors[highlightIndices[0]] = "red";
            newBarColors[highlightIndices[1]] = "green";
          } else {
            newBarColors[highlightIndices[0]] = "orange";
          }
        } else {
          newBarColors[highlightIndices] = "orange";
        }
        setBarColors(newBarColors);
      }
    },
    []
  );

  // Set up (or update) the DragDrop instance whenever the array or container changes.
  useEffect(() => {
    if (containerRef.current) {
      if (!dragDropInstance) {
        const instance = new DragDrop(
          containerRef.current,
          array,
          renderArray,
          setBarColors
        );
        setDragDropInstance(instance);
      } else {
        // Update the array and re-enable drag and drop on new elements.
        dragDropInstance.array = array;
        dragDropInstance.enableDragAndDrop();
      }
    }
  }, [containerRef, array, dragDropInstance, renderArray]);

  const showAlert = (message) => {
    const newAlert = { id: Date.now(), message };
    setAlerts((prev) => {
      if (prev.length >= 3) return prev;
      return [...prev, newAlert];
    });
  };

  const closeAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const handleStartSorting = useCallback(async () => {
    await arrayStructure.bubbleSortAnimated(
      arrayStructure.getArray(),
      renderArray
    );
    renderArray(arrayStructure.getArray());
  }, [arrayStructure, renderArray]);

  const MAXARRAYLENGTH = 20;

  const handleInsert = useCallback(async () => {
    if (array.length >= MAXARRAYLENGTH) {
      showAlert("Reaching max arraylength!");
      return;
    }
    const randomIndex = Math.floor(Math.random() * (array.length + 1));
    const randomValue = Math.floor(Math.random() * 100) + 1;
    const newArray = await arrayStructure.insertAt(randomIndex, randomValue);
    renderArray(newArray, randomIndex);
  }, [array, arrayStructure, renderArray]);

  useKeyboardEvents({
    s: () => handleStartSorting(),
    i: () => handleInsert(),
  });

  return (
    <div id="container">
      <div className="info">
        <h1>Array Visualization</h1>
        <p>Click to start the sorting algorithm.</p>
        <div className="button-container">
          <button onClick={handleStartSorting}>Start Sorting</button>
          <button onClick={handleInsert}>Insert</button>
        </div>
      </div>
      <AlertList alerts={alerts} closeAlert={closeAlert} />
      <ArrayList
        array={array}
        barColors={barColors}
        containerRef={containerRef}
      />
    </div>
  );
}

export default App;
