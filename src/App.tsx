import React, { useEffect, useState, useRef, useCallback } from "react";
import ArrayStructure from "./data-structures/Array";
import DragDrop from "./drag-drop/drag-drop";
import ArrayList from "./Components/ArrayList/ArrayList.tsx";
import Header from "./Components/Header/Header.tsx";
import useKeyboardEvents from "./Hooks/useKeyboardEvents.tsx";
import Footer from "./Components/Footer/Footer.tsx";
import SortingSelector from "./Components/SortingSelector/SortingSelector.tsx";
import "./App.css";
import NotificationList, { NotificationListRef } from "./Components/NotificationList/NotificationList.tsx";

function App() {
  const ARRAYLENGTH = 20;
  const MAXARRAYLENGTH = 30;

  const [arrayStructure] = useState(new ArrayStructure(ARRAYLENGTH));
  const [array, setArray] = useState(arrayStructure.getArray());
  const [dragDropInstance, setDragDropInstance] = useState<DragDrop | null>(null);
  const [barColors, setBarColors] = useState({});
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const notificationListRef = useRef<NotificationListRef>(null); 

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

        instance.onDrop = (droppedIndex: number) => {
          setSelectedIndex(droppedIndex);
        };

        setDragDropInstance(instance);
      } else {
        // Update the array and re-enable drag and drop on new elements.
        dragDropInstance.array = array;
        dragDropInstance.enableDragAndDrop();
      }
    }
  }, [containerRef, array, dragDropInstance, renderArray]);

  const handleShowNotification = (type: 'info' | 'success' | 'warning' | 'error', message: string, duration: number = 2000) => {
    notificationListRef.current?.addNotification(message, type, duration);
  };

  const handleStartSorting = useCallback(async () => {
    await arrayStructure.insertionSortAnimated(
      arrayStructure.getArray(),
      renderArray
    );
    renderArray(arrayStructure.getArray());
  }, [arrayStructure, renderArray]);

  const handleInsert = useCallback(async () => {
    if (array.length >= MAXARRAYLENGTH) {
      handleShowNotification("info", "Reaching max arraylength!");
      console.log("Reaching max arraylength!");
      
      return;
    }
    const randomIndex = Math.floor(Math.random() * (array.length + 1));
    const randomValue = Math.floor(Math.random() * 100) + 1;
    const newArray = await arrayStructure.insertAt(randomIndex, randomValue);
    renderArray(newArray, randomIndex);
    setSelectedIndex(randomIndex);
  }, [array, arrayStructure, renderArray]);

  const handleDoubleClick = useCallback(async (index: number) => {
    const newValue = prompt("Enter a new value:");
    if (newValue === null) {
      handleShowNotification("warning", "Value is null");
      return;
    } else if (isNaN(parseInt(newValue, 10))) {
      handleShowNotification("warning", "Please input a valid number");
      return;
    }
    else if (parseInt(newValue, 10) >= 0 && parseInt(newValue, 10) <= 100) {
      const newArray = await arrayStructure.updateAt(index, parseInt(newValue, 10));
      setSelectedIndex(index);
      renderArray(newArray, index);
    }
  }, [renderArray, arrayStructure]);

  const handleRemoveSelected = useCallback(async () => {
    if (selectedIndex === null) {
      setSelectedIndex(0);
    }
    if (array.length === 0) {
      handleShowNotification("info", "Array is empty!");
      return;
    }
    try {
      const newArray = await arrayStructure.removeAt(selectedIndex);
      renderArray(newArray);
      setSelectedIndex(null);
      setBarColors({});
    } catch (error: any) {
      handleShowNotification("warning", error.message);
    }
  }, [selectedIndex, array, arrayStructure, renderArray]);

  const handleRandomize = useCallback(async () => {
    const newArray = await arrayStructure.randomizeArray();
    renderArray(newArray);
  }, [arrayStructure, renderArray]);

  useKeyboardEvents({
    s: () => handleStartSorting(),
    i: () => handleInsert(),
    d: () => handleRemoveSelected(),
    r: () => handleRandomize(),
  });

  return (
    <div id="container">
      <Header />
      <div className="main-content">
        <div className="info">
          <h1>Array Visualization</h1>
          <p>Click to start the sorting algorithm.</p>
          <div className="button-container">
            <SortingSelector
              arrayStructure={arrayStructure}
              renderArray={renderArray}
              showNotification={handleShowNotification}
            />
            <button onClick={handleRandomize}>Randomize</button>
            <button onClick={handleInsert}>Insert</button>
            <button onClick={handleRemoveSelected}>Delete</button>
          </div>
        </div>
        <NotificationList ref={notificationListRef} />
        <ArrayList
          array={array}
          barColors={barColors}
          containerRef={containerRef as React.RefObject<HTMLDivElement>}
          onBarSelect={(index) => setSelectedIndex(index)}
          onDoubleClick={handleDoubleClick}
          selectedIndex={selectedIndex}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
