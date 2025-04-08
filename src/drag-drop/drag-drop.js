// drag-drop.js
export default class DragDrop {
  constructor(arrayContainer, array, renderArray, setBarColors) {
    this.arrayContainer = arrayContainer;
    this.array = array;
    this.renderArray = renderArray;
    this.setBarColors = setBarColors;

    // Bind instance methods so that 'this' is maintained inside the handlers
    this.dragStart = this.dragStart.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.drop = this.drop.bind(this);

    // Initially enable drag and drop on current bars
    this.enableDragAndDrop();
  }

  enableDragAndDrop() {
    // Query all elements with the .bar class within the array container
    const bars = this.arrayContainer.querySelectorAll(".bar");
    bars.forEach((bar, index) => {
      // Remove any previously attached event listeners
      bar.removeEventListener("dragstart", this.dragStart);
      bar.removeEventListener("dragover", this.dragOver);
      bar.removeEventListener("drop", this.drop);

      bar.setAttribute("draggable", "true");
      bar.dataset.index = index; // Assign a data index to each bar
      bar.addEventListener("dragstart", this.dragStart);
      bar.addEventListener("dragover", this.dragOver);
      bar.addEventListener("drop", this.drop);
    });
  }

  dragStart(e) {
    // Set the data with the dragged element's index and change its opacity
    const index = e.target.dataset.index;
    e.dataTransfer.setData("text/plain", e.target.dataset.index);
    this.setBarColors({ [index]: "red" });
  }

  dragOver(e) {
    // Prevent default to allow drop
    e.preventDefault();
  }

  drop(e) {
    e.stopPropagation(); // Prevent duplicate event firing

    const draggedIndex = e.dataTransfer.getData("text/plain");
    const targetIndex = e.target.dataset.index;

    console.log(
      `Index: [${draggedIndex},${targetIndex}], ` +
        `Value: [${this.array[draggedIndex]},${this.array[targetIndex]}]`
    );

    // Swap the values in the array based on the indices
    const temp = this.array[draggedIndex];
    this.array[draggedIndex] = this.array[targetIndex];
    this.array[targetIndex] = temp;

    // Pre-calculate color mapping: mark drop target as green.
    // Also, clear the dragged index's color if desired.
    this.setBarColors((prev) => ({
      ...prev,
      [draggedIndex]: "red", // Clear dragged color
      [targetIndex]: "green",
    }));

    // Re-render the array using the provided function
    this.renderArray(this.array);
  }
}
