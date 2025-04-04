import ArrayStructure from './data-structures/Array.js';
import DragDrop from './drag-drop/drag-drop.js'; // Import the DragDrop class

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const insertButton = document.getElementById("insertButton");
  const arrayContainer = document.getElementById("arrayContainer");

  let arrayStructure = new ArrayStructure(30); // Create an instance of the array with 20 elements
  let array = arrayStructure.getArray(); // Get the array from the ArrayStructure class

  // Declare a persistent variable for dragDrop.
  let dragDropInstance;

  // Function to render the array as bars
  function renderArray(arr, highlightIndices = null) {
    arrayContainer.innerHTML = ''; // Clear the previous array content
  
    arr.forEach((value, index) => {
      const bar = document.createElement('div');
      bar.classList.add('bar');
      
      if (highlightIndices !== null) {
        if (Array.isArray(highlightIndices)){
          if (highlightIndices.includes(index)) {
            bar.classList.add('newly-added');
          }
        } else if (index === highlightIndices) {
          bar.classList.add("newly-added");
        }
      }
      
      bar.style.height = `${value * 3}px`; // Height of the bar
      bar.style.width = '30px'; // Width of the bar
      bar.style.margin = '0 5px'; // Margin between bars
      bar.dataset.index = index; // Store the index of the array element on the bar
      arrayContainer.appendChild(bar);
    });
  
    if (!dragDropInstance) {
      dragDropInstance = new DragDrop(arrayContainer, arr, renderArray);
    } else {
      dragDropInstance.array = arr;
      dragDropInstance.enableDragAndDrop();
    }
  }

  renderArray(array); // Initial rendering of the array

  // Event listener for the "Start Sorting" button
  startButton.addEventListener("click", async () => {
    // Pass renderArray as the callback so it gets called after each swap.
    await arrayStructure.bubbleSortAnimated(arrayStructure.getArray(), renderArray);

    renderArray(array);
  });
  
  insertButton.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * (array.length + 1));
    const randomValue = Math.floor(Math.random() *  100) + 1;
    arrayStructure.insertAt(randomIndex, randomValue);

    // Update the predefined array
    array = arrayStructure.getArray();

    renderArray(array, randomIndex);
  });

});
