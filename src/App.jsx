import React, { useEffect, useState, useRef } from 'react';
import ArrayStructure from './data-structures/Array';
import DragDrop from './drag-drop/drag-drop';
import './App.css';

function App() {
  // Increase the array size if needed
  const [arrayStructure] = useState(new ArrayStructure(2));
  const [array, setArray] = useState(arrayStructure.getArray());
  const [dragDropInstance, setDragDropInstance] = useState(null);

  // Use a React ref for the array container
  const containerRef = useRef(null);

  // Function to update the array state and (optionally) handle highlighting
  const renderArray = (arr, highlightIndices = null) => {
    console.log(`Rendering array: ${arr}`);
    setArray([...arr]);
  };

  // Set up (or update) the DragDrop instance whenever the array or container changes.
  useEffect(() => {
    if (containerRef.current) {
      if (!dragDropInstance) {
        const instance = new DragDrop(containerRef.current, array, renderArray);
        setDragDropInstance(instance);
      } else {
        // Update the array and re-enable drag and drop on new elements.
        dragDropInstance.array = array;
        dragDropInstance.enableDragAndDrop();
      }
    }
  }, [containerRef, array, dragDropInstance]);

  const handleStartSorting = async () => {
    await arrayStructure.bubbleSortAnimated(arrayStructure.getArray(), renderArray);
    renderArray(arrayStructure.getArray());
  };

  const handleInsert = () => {
    const randomIndex = Math.floor(Math.random() * (array.length + 1));
    const randomValue = Math.floor(Math.random() * 100) + 1;
    arrayStructure.insertAt(randomIndex, randomValue);
    renderArray(arrayStructure.getArray(), randomIndex);
  };

  return (
    <div id="container">
      <h1>Array Visualization</h1>
      <p>Click to start the sorting algorithm.</p>
      <button onClick={handleStartSorting}>Start Sorting</button>
      <button onClick={handleInsert}>Insert</button>
      {/* Use external CSS classes for styling */}
      <div id="arrayContainer" ref={containerRef} className="array-container">
        {array.map((value, index) => (
          <div key={index} className="bar-container" data-index={index}>
            <div
              className="bar"
              style={{ height: `${value * 3}px` }} // Only dynamic height remains inline
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;