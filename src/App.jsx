import React, { useEffect, useState, useRef, useCallback } from "react";
import ArrayStructure from "./data-structures/Array";
import DragDrop from "./drag-drop/drag-drop";
import Alert from "./alert/Alert";
import "./App.css";

function App() {
  // Increase the array size if needed
  const [arrayStructure] = useState(new ArrayStructure(10));
  const [array, setArray] = useState(arrayStructure.getArray());
  const [dragDropInstance, setDragDropInstance] = useState(null);
  const [barColors, setBarColors] = useState({});
  const [alerts, setAlerts] = useState([]);

  // Use a React ref for the array container
  const containerRef = useRef(null);

  // Function to update the array state and (optionally) handle highlighting
  const renderArray = useCallback((arr, highlightIndices = null) => {
    setArray([...arr]);
    if (highlightIndices !== null) {
      const newBarColors = {};
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
  }, []);

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
    // Create a new alert with a unique id (e.g., using Date.now())
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
    } // Prevent further insertions if max reached
    const randomIndex = Math.floor(Math.random() * (array.length + 1));
    const randomValue = Math.floor(Math.random() * 100) + 1;
    const newArray = await arrayStructure.insertAt(randomIndex, randomValue);
    renderArray(newArray, randomIndex);
  }, [array, arrayStructure, renderArray]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.repeat) return;
      if (event.key === "s" || event.key === "S") {
        event.preventDefault();
        handleStartSorting();
      }
      if (event.key === "i" || event.key === "I") {
        event.preventDefault();
        handleInsert();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleStartSorting, handleInsert]);

  return (
    <div id="container">
      <div className="alert-container">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            message={alert.message}
            onClose={() => closeAlert(alert.id)}
          />
        ))}
      </div>
      <div className="info">
        <h1>Array Visualization</h1>
        <p>Click to start the sorting algorithm.</p>
        <div className="button-container">
          <button onClick={handleStartSorting}>Start Sorting</button>
          <button onClick={handleInsert}>Insert</button>
        </div>
      </div>
      <div id="arrayContainer" ref={containerRef} className="array-container">
        {array.map((value, index) => {
          return (
            <div key={index} className="bar-container" data-index={index}>
              <div className="bar-value">{value}</div>
              <div
                className="bar"
                style={{
                  height: `${value * 3}px`,
                  backgroundColor: barColors[index] || "steelblue",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
