// src/data-structures/Array.js
class ArrayStructure {
    constructor(size) {
      this.items = this.generateArray(size);
    }
  
    // Function to generate a random array
    generateArray(size) {
      const arr = [];
      for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 100) + 1); // Random numbers between 1 and 100
      }
      return arr;
    }

    // Helper function to delay execution.
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Async bubble sort to animate the sorting.
    async bubbleSortAnimated(arr, onSwap) {
      let n = arr.length, swapped;
      do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
          if (arr[i] > arr[i + 1]) {
            // Swap two elements
            let temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
            swapped = true;

            // Call the callback with the current state, if provided
            if (onSwap && typeof onSwap === 'function') {
              onSwap(arr, [i, i + 1]);
            }    

            await this.sleep(10); // pause for 400ms between swaps
          }
        }
        n--;
      } while (swapped);
      return arr;
    }
  
    // Get the array for visualization
    getArray() {
      return this.items;
    }

    insertAt(index, value) {
      this.items.splice(index, 0, value);
      return this.items;
    }
  
    // Optionally: You could add other methods like insert, delete, etc.
}
  
export default ArrayStructure;
  