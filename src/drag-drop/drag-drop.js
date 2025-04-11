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
    const containers = this.arrayContainer.querySelectorAll(".bar-container");
    containers.forEach((container, index) => {
      container.removeEventListener("dragstart", this.dragStart);
      container.removeEventListener("dragover", this.dragOver);
      container.removeEventListener("drop", this.drop);

      container.setAttribute("draggable", "true");
      container.dataset.index = index;
      container.addEventListener("dragstart", this.dragStart);
      container.addEventListener("dragover", this.dragOver);
      container.addEventListener("drop", this.drop);
    });
  }

  dragStart(e) {
    // Use e.currentTarget (the bar-container) directly
    const container = e.currentTarget;
    const index = container.dataset.index;
    this.draggedIndex = index; // Store the index of the dragged item
    e.dataTransfer.setData("text/plain", index);
    // Reset previous colors and mark this container as red
    this.setBarColors({ [index]: "red" });
  }

  dragOver(e) {
    e.preventDefault(); // Allow drop
    const container = e.currentTarget; // Use currentTarget for consistency
    const targetIndex = parseInt(container.dataset.index, 10);
    const currentDraggedIndex = this.draggedIndex;
  
    if (targetIndex !== currentDraggedIndex) {
      
      // Create a shallow copy instead of modifying the original array directly
      const newArray = [...this.array];
      console.log("Before insert Array: " + newArray);

      const element = newArray.splice(currentDraggedIndex, 1)[0];
      
      const insertionIndex = targetIndex;
      newArray.splice(insertionIndex, 0, element);
      console.log("After  insert Array: " + newArray);
      
      this.draggedIndex = insertionIndex;
      this.setBarColors({[insertionIndex]: "green"});
      // Update the stored array and render the new array
      this.array = newArray;
      this.renderArray(newArray, insertionIndex);
    }
  }

  drop(e) {
    e.stopPropagation();
    this.setBarColors({});
  }
}
