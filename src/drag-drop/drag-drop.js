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
    e.dataTransfer.setData("text/plain", index);
    // Reset previous colors and mark this container as red
    this.setBarColors({ [index]: "red" });
  }

  dragOver(e) {
    e.preventDefault(); // Allow drop
  }

  drop(e) {
    e.stopPropagation();
    // Use e.currentTarget to get the container where the drop occurred.
    const container = e.currentTarget;
    const targetIndex = container.dataset.index;
    const draggedIndex = e.dataTransfer.getData("text/plain");

    console.log(
      `Index: [${draggedIndex},${targetIndex}], ` +
        `Value: [${this.array[draggedIndex]},${this.array[targetIndex]}]`
    );

    // Swap the values
    const temp = this.array[draggedIndex];
    this.array[draggedIndex] = this.array[targetIndex];
    this.array[targetIndex] = temp;

    this.setBarColors((prev) => ({
      ...prev,
      [draggedIndex]: "red",
      [targetIndex]: "green",
    }));

    this.renderArray(this.array);
  }
}
